# Oromia Majlis Website

Official website for Oromia Regional Islamic Affairs Supreme Council (Oromia Majlis).

## Project Structure

This repository contains two main projects:

### 🎨 Frontend (`oromia-majlis/`)
- **Framework**: Next.js 16 with React
- **Styling**: Tailwind CSS v4
- **Features**: 
  - Responsive header and footer
  - Home page with dynamic Hero Section (powered by Strapi)
  - Services, Offices, News, Events, Gallery pages
  - Donate page with multi-currency support
  - About page with organization information

### 🔧 Backend (`backend/`)
- **Framework**: Strapi 5 (Headless CMS)
- **Database**: PostgreSQL (local installation)
- **Features**:
  - Hero Section API with slides and services
  - Content management for website content
  - Image upload and management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL (local installation)
- npm or yarn

### Frontend Setup

```bash
cd oromia-majlis
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Install and start PostgreSQL locally:**
   - Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
   - Ensure PostgreSQL is running on your system
   - Create a database named `mejlis_db` (or update `.env` with your preferred database name)

2. **Configure environment:**
```bash
cd backend
# The .env file should already exist with database configuration
# Update DATABASE_NAME, DATABASE_USERNAME, and DATABASE_PASSWORD if needed
```

3. **Start Strapi:**
```bash
npm install
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

## 📝 Environment Variables

### Frontend (`oromia-majlis/.env.local`)
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Backend (`backend/.env`)
See `backend/.env.example` for required variables.

## 🛠️ Development

- Frontend: `cd oromia-majlis && npm run dev`
- Backend: `cd backend && npm run develop`
- Database: Ensure PostgreSQL is running locally (default port: 5432)

## 📚 Documentation

- Frontend integration: See `oromia-majlis/STRAPI_INTEGRATION.md`
- Backend setup: See `backend/README.md`

## 🤝 Contributing

Contributions are welcome! Please ensure your code follows the project's coding standards.

## 📄 License

See individual project folders for license information.
