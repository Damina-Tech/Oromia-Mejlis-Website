# Oromia Majlis Website — VPS Deployment

Deploy the public website on the **same VPS** as HRMS without modifying `/var/www/hrms`.

| Item | Value |
|------|--------|
| VPS IP | `91.98.149.16` |
| Website path | `/var/www/website` |
| HRMS path | `/var/www/hrms` (do not change) |
| Public site | https://oriasc.org |
| Strapi CMS | https://cms.oriasc.org |
| HRMS | https://system.oriasc.org |

---

## Architecture

```text
Nginx (:443)
├── system.oriasc.org  → HRMS :4000 (existing)
├── oriasc.org         → Next.js :3000 (PM2: oriasc-web)
└── cms.oriasc.org     → Strapi :1337 (PM2: oriasc-strapi)

Docker (website only):
└── strapi-postgres    → 127.0.0.1:5433 (HRMS Postgres uses :5432)
```

---

## DNS

Point these to **`91.98.149.16`**:

| Host | Type | Value |
|------|------|-------|
| `oriasc.org` | A | `91.98.149.16` |
| `www.oriasc.org` | A or CNAME | `91.98.149.16` |
| `cms.oriasc.org` | A | `91.98.149.16` |

Remove Render/CNAME records if migrating from Render.

---

## First-time setup

### 1. Clone on VPS

```bash
sudo mkdir -p /var/www/website
sudo chown $USER:$USER /var/www/website
git clone <YOUR_REPO_URL> /var/www/website
cd /var/www/website
```

### 2. Bootstrap

```bash
bash deploy/scripts/vps-bootstrap-website.sh
bash deploy/scripts/generate-secrets.sh
```

### 3. Configure secrets

```bash
cp deploy/env/postgres.env.example deploy/env/postgres.env
cp deploy/env/strapi.env.example backend/.env
cp deploy/env/frontend.env.example frontend/.env.production
```

Edit all three files:

- Set matching `POSTGRES_PASSWORD` / `DATABASE_PASSWORD`
- Paste generated `APP_KEYS`, salts, JWT secrets into `backend/.env`
- Set payment keys in `frontend/.env.production`
- HRMS URLs default to `http://127.0.0.1:4000/api/v1` (same VPS)

```bash
chmod 600 deploy/env/postgres.env backend/.env frontend/.env.production
```

### 4. Start Strapi database

```bash
docker compose --env-file deploy/env/postgres.env -f deploy/docker-compose.yml up -d
```

### 5. Nginx (HTTP first)

```bash
sudo cp deploy/nginx/oriasc.org-http.conf /etc/nginx/sites-available/oriasc.org
sudo cp deploy/nginx/cms.oriasc.org-http.conf /etc/nginx/sites-available/cms.oriasc.org
sudo ln -sf /etc/nginx/sites-available/oriasc.org /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/cms.oriasc.org /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**Do not** change Nginx configs for `system.oriasc.org`.

### 6. SSL

After DNS propagates:

```bash
sudo certbot --nginx -d oriasc.org -d www.oriasc.org -d cms.oriasc.org
```

Optional: replace HTTP configs with `deploy/nginx/oriasc.org.conf` and `deploy/nginx/cms.oriasc.org.conf` if Certbot did not auto-update.

### 7. PM2 log directory

```bash
sudo mkdir -p /var/log/website
sudo chown $USER:$USER /var/log/website
```

### 8. First deploy

```bash
cd /var/www/website
bash deploy/scripts/deploy-all.sh main
```

### 9. Strapi admin

1. Open https://cms.oriasc.org/admin
2. Create admin user
3. **Settings → Users & Permissions → Public** — enable `find` / `findOne` for public content types

---

## Ongoing deploys

```bash
cd /var/www/website

# After git push — frontend only
bash deploy/scripts/deploy-frontend.sh main

# Strapi / content model changes
bash deploy/scripts/deploy-backend.sh main

# Both
bash deploy/scripts/deploy-all.sh main
```

---

## PM2

| Name | Port | Path |
|------|------|------|
| `oriasc-web` | 3000 | `/var/www/website/frontend` |
| `oriasc-strapi` | 1337 | `/var/www/website/backend` |

```bash
pm2 status
pm2 logs oriasc-web
pm2 logs oriasc-strapi
```

Health checks:

```bash
curl -sI http://127.0.0.1:3000 | head -1
curl -sI http://127.0.0.1:1337/admin | head -1
```

---

## Resource tips (2 GB RAM VPS)

- HRMS + Strapi + Next.js is tight — add swap if builds OOM:
  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  ```
- Monitor: `free -h`, `pm2 monit`, `docker stats`
- Strapi `backend/public/uploads` persists on disk — back up regularly

---

## Security checklist

- [ ] `.env` files `chmod 600`, never in git
- [ ] Strapi DB on port **5433** only (localhost)
- [ ] Ports 3000, 1337, 5433 not exposed in UFW
- [ ] Unique Strapi secrets (not copied from HRMS)
- [ ] CORS: `https://oriasc.org`, `https://www.oriasc.org` only
- [ ] `NODE_ENV=production` for both apps
- [ ] Consider restricting `cms.oriasc.org` admin by IP or Cloudflare

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 502 Bad Gateway | `pm2 status` — restart `oriasc-web` or `oriasc-strapi` |
| Strapi DB error | `docker ps` — ensure `strapi-postgres` is up on :5433 |
| Wrong site / 403 | DNS still points to cPanel/Render — use A → `91.98.149.16` |
| Build OOM | Add swap or build locally and rsync `.next` + `backend/dist` |
| HRMS broken | You changed `/var/www/hrms` — restore from backup |

---

## Local development

See [README.md](./README.md). Use `backend/.env` and `frontend/.env.local` — not production files.
