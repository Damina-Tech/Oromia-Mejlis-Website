#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/website"
BRANCH="${1:-main}"

cd "$APP_DIR"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

cd frontend
test -f .env.production || { echo "Missing frontend/.env.production — copy deploy/env/frontend.env.example"; exit 1; }
chmod 600 .env.production
npm ci
npm run build

cd "$APP_DIR"
pm2 startOrReload deploy/pm2/ecosystem.config.cjs --only oriasc-web
pm2 save

nginx -t && systemctl reload nginx

echo "Frontend deployed. Site: https://oriasc.org"
