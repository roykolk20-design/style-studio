// The version lives in three places; the ?v= in the JS URLs depends on it.
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const versions = {
  "manifest.json": JSON.parse(read("custom_components/style_studio/manifest.json")).version,
  "const.py": read("custom_components/style_studio/const.py").match(/^VERSION = "(.+)"/m)?.[1],
  "frontend/src/version.js": read("frontend/src/version.js").match(/VERSION = "(.+)"/)?.[1],
};

const unique = new Set(Object.values(versions));
if (unique.size !== 1 || unique.has(undefined)) {
  console.error("Version mismatch:", versions);
  process.exit(1);
}
console.log(`version ${[...unique][0]}`);
