/**
 * cPanel Node.js entry point for Next.js (standalone build).
 * 1. Set CPANEL_DEPLOY=true and run: npm run build
 * 2. cPanel → Setup Node.js App → Application startup file: server.js
 */
const { existsSync } = require("fs");
const path = require("path");

const standaloneDir = path.join(__dirname, ".next", "standalone");
const standaloneServer = path.join(standaloneDir, "server.js");

if (!existsSync(standaloneServer)) {
  console.error(
    "Standalone server not found. Run: CPANEL_DEPLOY=true npm run build"
  );
  process.exit(1);
}

process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";
process.chdir(standaloneDir);
require(standaloneServer);
