#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/website"
BRANCH="${1:-main}"

cd "$APP_DIR"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

docker compose --env-file deploy/env/postgres.env -f deploy/docker-compose.yml up -d

cd backend
test -f .env || { echo "Missing backend/.env — copy deploy/env/strapi.env.example"; exit 1; }
chmod 600 .env
npm ci
npm run build

cd "$APP_DIR"
pm2 startOrReload deploy/pm2/ecosystem.config.cjs --only oriasc-strapi
pm2 save

echo "Strapi deployed. Check: curl -sI http://127.0.0.1:1337/admin | head -1"
