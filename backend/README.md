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

## ⚙️ Deployment (Render + Supabase)

Render does **not** read `backend/.env`. Set every variable in **Render → your service → Environment**.

### Required environment variables

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | Full **Session pooler** URI from Supabase (see below) |
| `DATABASE_SSL` | `true` |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | `false` |
| `DATABASE_POOL_MIN` | `0` |
| `DATABASE_POOL_MAX` | `4` |
| `PUBLIC_URL` | `https://your-service.onrender.com` (or custom domain) |
| `CORS_ORIGIN` | `https://oriasc.org,https://www.oriasc.org` |
| `FRONTEND_URL` | `https://oriasc.org` |
| `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`, `APP_KEYS`, `JWT_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"` |

### Supabase `DATABASE_URL` (important)

In Supabase: **Project Settings → Connect → Session pooler → URI**

It must look like:

```txt
postgresql://postgres.fdyljrnokqsbuccjotrg:YOUR_DB_PASSWORD@aws-0-eu-west-3.pooler.supabase.com:5432/postgres
```

**Do not** paste the `.env.example` placeholders (`aws-0-REGION`, `PROJECT_REF`, `YOUR-PASSWORD`). Render will fail with `ENOTFOUND aws-0-REGION.pooler.supabase.com`.

### Render service settings

- **Root directory:** `backend`
- **Build command:** `npm install && npm run build`
- **Start command:** `npm start`

After deploy, open `/admin` and create the Strapi admin user.

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
