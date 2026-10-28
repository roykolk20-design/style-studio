// Page backgrounds. Home Assistant reads a page's (view's) `background` as one
// CSS `background` value, so every kind here is built into such a string:
// a color, a gradient, or a photo, optionally with a dark or light layer on
// top to keep text readable. That also works on every kind of view.

export const GRADIENTS = [
  { key: "sunset", from: "#f6d365", to: "#fda085", angle: 135 },
  { key: "ocean", from: "#2193b0", to: "#6dd5ed", angle: 160 },
  { key: "night", from: "#232526", to: "#414345", angle: 180 },
  { key: "sand", from: "#f4efe6", to: "#e6d9c3", angle: 160 },
  { key: "rose", from: "#fbd3e9", to: "#f6a5c0", angle: 135 },
];

export const SWATCHES = ["#f4efe6", "#fbf1f4", "#e8f0fa", "#e9f3ec", "#2b2f36", "#111418"];

export const DEFAULT_BACKGROUND = {
  kind: "image",
  url: "",
  color: "#f4efe6",
  from: "#f6d365",
  to: "#fda085",
  angle: 135,
  fit: "cover",
  align: "center",
  fixed: true,
  // -60 (darker) to 60 (lighter); 0 leaves the photo as it is.
  dim: 0,
};

const HEX = /^#[0-9a-f]{6}$/i;
// Only addresses on this Home Assistant (/local/..., our uploads) or the web.
export const safeUrl = (url) => typeof url === "string" && /^(\/|https?:\/\/)[^"'()\\\s]+$/.test(url);

const SIZES = { cover: "cover", contain: "contain", tile: "auto" };
const ALIGNS = ["center", "top", "bottom", "left", "right"];

/**
 * The CSS for a page, or null when there is nothing to write.
 * In a preview, "fixed" is left out: it would pin the picture to the browser
 * window instead of the small preview.
 */
export function backgroundCss(b, { preview = false } = {}) {
  const fixed = b.fixed && !preview ? " fixed" : "";
  if (b.kind === "color") return HEX.test(b.color) ? b.color : null;
  if (b.kind === "gradient") {
    if (!HEX.test(b.from) || !HEX.test(b.to)) return null;
    return `linear-gradient(${Math.round(b.angle)}deg, ${b.from}, ${b.to})${fixed}`;
  }
  if (b.kind !== "image" || !safeUrl(b.url)) return null;

  const layers = [];
  const dim = Math.max(-60, Math.min(60, Math.round(b.dim || 0)));
  if (dim) {
    const tint = dim < 0 ? `rgba(0, 0, 0, ${-dim / 100})` : `rgba(255, 255, 255, ${dim / 100})`;
    layers.push(`linear-gradient(${tint}, ${tint})${fixed}`);
  }
  const align = ALIGNS.includes(b.align) ? b.align : "center";
  const size = SIZES[b.fit] ?? "cover";
  const repeat = b.fit === "tile" ? "repeat" : "no-repeat";
  // The theme's color shows where a photo that is shown whole doesn't reach.
  layers.push(`${align} / ${size} ${repeat} url("${b.url}")${fixed} var(--primary-background-color)`);
  return layers.join(", ");
}

/** What a page has now: { kind: "image" | "gradient" | "color" | "other", url? } or null. */
export function describeBackground(background) {
  if (!background) return null;
  const text = typeof background === "string" ? background : null;
  if (typeof background === "object") {
    return background.image ? { kind: "image", url: background.image } : { kind: "other" };
  }
  const url = text.match(/url\((['"]?)(.*?)\1\)/);
  if (url) return { kind: "image", url: url[2] };
  if (/gradient\(/i.test(text)) return { kind: "gradient" };
  if (/^\s*(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|[a-z]+)\s*$/i.test(text)) return { kind: "color" };
  return { kind: "other" };
}

// --- Uploading -----------------------------------------------------------------

const MAX_SIDE = 2560;

/**
 * Big camera photos make a dashboard slow, most of all on a phone, so a photo
 * larger than needed is shrunk first. GIF and AVIF are sent as they are.
 * Returns { blob, name, shrunk }.
 */
export async function shrinkPhoto(file) {
  const asIs = { blob: file, name: file.name, shrunk: false };
  if (/\.(gif|avif)$/i.test(file.name)) return asIs;
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch (err) {
    return asIs;
  }
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 3_000_000) return asIs;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  // JPEG has no transparency; a see-through PNG would turn black otherwise.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
  if (!blob || blob.size >= file.size) return asIs;
  return { blob, name: file.name.replace(/\.[^.]+$/, "") + ".jpg", shrunk: true };
}

/** Uploads a photo to Home Assistant; returns { name, url, shrunk }. */
export async function uploadPhoto(hass, file) {
  const prepared = await shrinkPhoto(file);
  const response = await hass.fetchWithAuth(
    `/api/style_studio/upload?name=${encodeURIComponent(prepared.name)}`,
    { method: "POST", body: prepared.blob }
  );
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message ?? `${response.status}`);
    error.code = body.code;
    throw error;
  }
  return { ...body, shrunk: prepared.shrunk };
}
