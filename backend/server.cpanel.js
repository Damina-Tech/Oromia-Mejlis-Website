/**
 * cPanel Node.js entry point for Strapi.
 * Setup Node.js App → Application startup file: server.cpanel.js
 * Run `npm run build` before first start.
 */
const { spawn } = require('child_process');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const strapiBin = path.join(__dirname, 'node_modules', '@strapi', 'strapi', 'bin', 'strapi.js');
const child = spawn(process.execPath, [strapiBin, 'start'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 1));
