import { cpSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = path.join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  console.warn("cpanel-postbuild: no standalone output — skip asset copy");
  process.exit(0);
}

cpSync(path.join(root, "public"), path.join(standaloneDir, "public"), {
  recursive: true,
});
cpSync(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"), {
  recursive: true,
});

console.log("cpanel-postbuild: copied public/ and .next/static into standalone bundle");
