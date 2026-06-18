# Oromia Majlis — Public Website Monorepo

Official website for **Oromia Regional Islamic Affairs Supreme Council** ([oriasc.org](https://oriasc.org)).

## Structure

```text
/
├── frontend/     # Next.js public website
├── backend/      # Strapi CMS
└── deploy/       # VPS: Docker, Nginx, PM2, scripts
```

## Local development

```bash
# Strapi
cd backend && npm install && npm run develop

# Next.js (separate terminal)
cd frontend && npm install && cp .env.example .env.local && npm run dev
```

## Production (VPS)

Deployed at `/var/www/website` on the same VPS as HRMS (`/var/www/hrms`).

| URL | Service |
|-----|---------|
| https://oriasc.org | Next.js |
| https://cms.oriasc.org | Strapi |
| https://system.oriasc.org | HRMS (existing — do not modify) |

**Full guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

**Agent brief:** [AGENT_DEPLOY_BRIEF.md](./AGENT_DEPLOY_BRIEF.md)

## Deploy on VPS

```bash
cd /var/www/website
bash deploy/scripts/deploy-frontend.sh main   # frontend only
bash deploy/scripts/deploy-backend.sh main    # Strapi only
bash deploy/scripts/deploy-all.sh main        # both
```
