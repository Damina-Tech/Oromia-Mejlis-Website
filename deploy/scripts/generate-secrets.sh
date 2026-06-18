#!/usr/bin/env bash
# Generate Strapi secrets for VPS deployment
set -euo pipefail

gen() { openssl rand -base64 32; }

echo "# Strapi secrets — paste into backend/.env"
echo "APP_KEYS=$(gen),$(gen),$(gen),$(gen)"
echo "API_TOKEN_SALT=$(gen)"
echo "ADMIN_JWT_SECRET=$(gen)"
echo "TRANSFER_TOKEN_SALT=$(gen)"
echo "ENCRYPTION_KEY=$(gen)"
echo "JWT_SECRET=$(gen)"
echo ""
echo "# Postgres password (also set in deploy/env/postgres.env)"
echo "POSTGRES_PASSWORD=$(gen)"
