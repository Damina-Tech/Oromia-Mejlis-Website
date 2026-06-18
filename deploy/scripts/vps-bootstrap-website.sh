#!/usr/bin/env bash
# One-time VPS setup for website stack (does NOT touch /var/www/hrms)
set -euo pipefail

APP_DIR="/var/www/website"

echo "==> Creating log directory"
mkdir -p /var/log/website

echo "==> Ensuring deploy env files exist (edit before first deploy)"
cd "$APP_DIR"
if [[ ! -f deploy/env/postgres.env ]]; then
  cp deploy/env/postgres.env.example deploy/env/postgres.env
  echo "Created deploy/env/postgres.env — set POSTGRES_PASSWORD"
fi

if [[ ! -f backend/.env ]]; then
  cp deploy/env/strapi.env.example backend/.env
  echo "Created backend/.env — run deploy/scripts/generate-secrets.sh and edit"
fi

if [[ ! -f frontend/.env.production ]]; then
  cp deploy/env/frontend.env.example frontend/.env.production
  echo "Created frontend/.env.production — edit payment keys"
fi

chmod 600 deploy/env/postgres.env backend/.env frontend/.env.production 2>/dev/null || true

echo "==> Starting Strapi Postgres (port 5433)"
docker compose --env-file deploy/env/postgres.env -f deploy/docker-compose.yml up -d

echo "==> Nginx site configs (HTTP-first for Certbot)"
echo "Run as root:"
echo "  cp $APP_DIR/deploy/nginx/oriasc.org-http.conf /etc/nginx/sites-available/oriasc.org"
echo "  cp $APP_DIR/deploy/nginx/cms.oriasc.org-http.conf /etc/nginx/sites-available/cms.oriasc.org"
echo "  ln -sf /etc/nginx/sites-available/oriasc.org /etc/nginx/sites-enabled/"
echo "  ln -sf /etc/nginx/sites-available/cms.oriasc.org /etc/nginx/sites-enabled/"
echo "  nginx -t && systemctl reload nginx"
echo ""
echo "After DNS points to this VPS:"
echo "  certbot --nginx -d oriasc.org -d www.oriasc.org -d cms.oriasc.org"
echo ""
echo "Then deploy:"
echo "  bash deploy/scripts/deploy-all.sh main"
