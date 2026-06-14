# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment (Render)

This API is configured for [Render](https://render.com) with **PostgreSQL** via a single `DATABASE_URL`.

### Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | Full Postgres connection string (Render sets this when you link a DB) |
| `DATABASE_SSL` | `true` on Render |
| `PUBLIC_URL` | e.g. `https://oriasc-api.onrender.com` or your custom domain |
| `CORS_ORIGIN` | `https://oriasc.org,https://www.oriasc.org` |
| `FRONTEND_URL` | `https://oriasc.org` |

See `.env.example` for the full list.

### Deploy with Blueprint

1. Push this repo to GitHub.
2. In Render → **New → Blueprint** → connect the repo.
3. Render reads `render.yaml` at the repo root (creates Postgres + web service).
4. Set `PUBLIC_URL` to your Render service URL (or custom domain `https://oriasc-api.oriasc.org`).
5. Add payment keys (`STRIPE_SECRET_KEY`, `CHAPA_SECRET_KEY`) in the Render dashboard.
6. After deploy, open `/admin` and create the Strapi admin user.

**Build:** `npm install && npm run build`  
**Start:** `npm start`

### Local development

```bash
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/mejlis_db
DATABASE_SSL=false
npm run develop
```

### Uploads on Render

Render’s filesystem is ephemeral. For production media, plan to use S3 (or similar) or a Render persistent disk.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
