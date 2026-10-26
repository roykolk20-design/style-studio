// Serves the repository on http://localhost:8123 for dev/harness.html, and
// Glass Sidebar's files from its own repository under /glass_sidebar/.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json" };
const port = Number(process.env.PORT || 8123);
const glass = process.env.GLASS_SIDEBAR_DIR ||
  join(root, "..", "Home assistant setting bar", "custom_components", "glass_sidebar", "www");

export const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  try {
    const file = path.startsWith(`${sep}glass_sidebar${sep}`)
      ? join(glass, path.slice("/glass_sidebar/".length))
      : join(root, path);
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(port, "127.0.0.1", () => console.log(`http://localhost:${port}/dev/harness.html`));
