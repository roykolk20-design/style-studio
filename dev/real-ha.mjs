// Starts a real Home Assistant in Docker with Style Studio and Glass Sidebar,
// onboards it and adds both integrations, so the panel can be tested in the
// real frontend instead of the harness.
//   node dev/real-ha.mjs          start (or reuse) and print a token
//   node dev/real-ha.mjs stop     remove the container
// The config lives in dev/real-ha/ (ignored by git).
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const IMAGE = "ghcr.io/home-assistant/home-assistant:2026.10.4";
const NAME = "style-studio-ha";
const PORT = Number(process.env.HA_PORT || 8124);
export const BASE = `http://127.0.0.1:${PORT}`;
const root = fileURLToPath(new URL("..", import.meta.url));
const config = fileURLToPath(new URL("./real-ha/config/", import.meta.url));
const glass = process.env.GLASS_SIDEBAR_REPO || `${root}../Home assistant setting bar`;
const CLIENT = `${BASE}/`;
export const USER = { name: "Roy", username: "roy", password: "style-studio-test" };

const sh = (cmd) => execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function copyIntegrations() {
  mkdirSync(`${config}custom_components`, { recursive: true });
  for (const [from, name] of [
    [`${root}custom_components/style_studio`, "style_studio"],
    [`${glass}/custom_components/glass_sidebar`, "glass_sidebar"],
  ]) {
    rmSync(`${config}custom_components/${name}`, { recursive: true, force: true });
    if (existsSync(from)) cpSync(from, `${config}custom_components/${name}`, { recursive: true });
  }
}

// THEMES_LAYOUT=named uses !include_dir_named: one theme per file, named
// after the file. The default is !include_dir_merge_named.
const NAMED = process.env.THEMES_LAYOUT === "named";

function writeConfig() {
  mkdirSync(`${config}themes`, { recursive: true });
  const include = NAMED ? "!include_dir_named" : "!include_dir_merge_named";
  writeFileSync(
    `${config}configuration.yaml`,
    ["default_config:", "", "frontend:", `  themes: ${include} themes`, ""].join("\n")
  );
  const vars = [
    'primary-color: "#f59e0b"',
    'primary-background-color: "#f4efe6"',
    'card-background-color: "#fffaf2"',
    'primary-text-color: "#3b3127"',
    'sidebar-background-color: "#fbf6ec"',
  ];
  writeFileSync(
    `${config}themes/licht_warm.yaml`,
    `${(NAMED ? vars : ["Licht Warm:", ...vars.map((line) => `  ${line}`)]).join("\n")}\n`
  );
}

async function api(path, { method = "GET", body, token, form } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : body ? { "Content-Type": "application/json" } : {}),
    },
    body: form ? new URLSearchParams(form) : body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

async function waitForHa() {
  for (let i = 0; i < 180; i += 1) {
    try {
      // Answers once the HTTP server and auth are up, onboarded or not.
      const res = await fetch(`${BASE}/auth/providers`);
      if (res.ok) return;
    } catch (err) {
      // Not up yet.
    }
    await sleep(1000);
  }
  throw new Error("Home Assistant did not start");
}

// Integrations are set up at the end of startup; wait for that.
async function waitForRunning(token) {
  for (let i = 0; i < 300; i += 1) {
    const config = await api("/api/config", { token }).catch(() => null);
    if (config?.state === "RUNNING") return;
    await sleep(1000);
  }
  throw new Error("Home Assistant did not finish starting");
}

async function waitForPanel(token) {
  for (let i = 0; i < 60; i += 1) {
    const entries = await api("/api/config/config_entries/entry", { token });
    const studio = entries.find((entry) => entry.domain === "style_studio");
    if (studio?.state === "loaded") return;
    if (studio?.state === "setup_error") throw new Error(`Style Studio: ${studio.reason}`);
    await sleep(1000);
  }
  throw new Error("Style Studio did not load");
}

async function tokens(code) {
  return api("/auth/token", { method: "POST", form: { grant_type: "authorization_code", code, client_id: CLIENT } });
}

/** Onboards on first start; afterwards logs in with the same user. */
async function login() {
  // After onboarding this address is gone (404).
  const steps = await fetch(`${BASE}/api/onboarding`).then((res) => (res.ok ? res.json() : []));
  if (steps.some((step) => step.step === "user" && !step.done)) {
    const { auth_code: code } = await api("/api/onboarding/users", {
      method: "POST",
      body: { client_id: CLIENT, name: USER.name, username: USER.username, password: USER.password, language: "nl" },
    });
    const auth = await tokens(code);
    const token = auth.access_token;
    await api("/api/onboarding/core_config", { method: "POST", token, body: {} });
    await api("/api/onboarding/analytics", { method: "POST", token, body: {} });
    await api("/api/onboarding/integration", { method: "POST", token, body: { client_id: CLIENT, redirect_uri: CLIENT } });
    return auth;
  }
  const flow = await api("/auth/login_flow", {
    method: "POST",
    body: { client_id: CLIENT, handler: ["homeassistant", null], redirect_uri: CLIENT },
  });
  const done = await api(`/auth/login_flow/${flow.flow_id}`, {
    method: "POST",
    body: { client_id: CLIENT, username: USER.username, password: USER.password },
  });
  return tokens(done.result);
}

async function addIntegration(token, domain) {
  const entries = await api("/api/config/config_entries/entry", { token });
  if (entries.some((entry) => entry.domain === domain)) return;
  const flow = await api("/api/config/config_entries/flow", { method: "POST", token, body: { handler: domain } });
  if (flow.type === "form") {
    await api(`/api/config/config_entries/flow/${flow.flow_id}`, { method: "POST", token, body: {} });
  }
}

export async function start() {
  writeConfig();
  copyIntegrations();
  const running = sh(`docker ps -q -f name=^${NAME}$`);
  if (running) {
    // Pick up new code: restart with the fresh copy.
    sh(`docker restart ${NAME}`);
  } else {
    sh(`docker rm -f ${NAME} 2>&1 || true`);
    sh(
      `docker run -d --name ${NAME} -p ${PORT}:8123 -e TZ=Europe/Amsterdam ` +
        `-v "${config.replace(/\\/g, "/")}:/config" ${IMAGE}`
    );
  }
  await waitForHa();
  const auth = await login();
  await waitForRunning(auth.access_token);
  await addIntegration(auth.access_token, "style_studio");
  if (existsSync(`${config}custom_components/glass_sidebar`)) await addIntegration(auth.access_token, "glass_sidebar");
  await waitForPanel(auth.access_token);
  return { ...auth, base: BASE, client: CLIENT };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === "stop") {
    sh(`docker rm -f ${NAME} 2>&1 || true`);
    console.log("stopped");
  } else {
    const auth = await start();
    console.log(`${BASE} (${USER.username} / ${USER.password})`);
    console.log(`token: ${auth.access_token.slice(0, 12)}…`);
  }
}
