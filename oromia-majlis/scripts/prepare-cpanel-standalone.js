/**
 * After `CPANEL_DEPLOY=true npm run build`, copy assets required by standalone output.
 */
const { cpSync, existsSync } = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error("Missing .next/standalone — run build with CPANEL_DEPLOY=true first.");
  process.exit(1);
}

cpSync(path.join(root, "public"), path.join(standalone, "public"), { recursive: true });
cpSync(path.join(root, ".next", "static"), path.join(standalone, ".next", "static"), {
  recursive: true,
});

console.log("cPanel standalone bundle prepared.");
