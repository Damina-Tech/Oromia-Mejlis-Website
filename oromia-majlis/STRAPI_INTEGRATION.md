# Strapi Integration for Hero Section

This document explains the Strapi integration for the Hero Section component.

## Overview

The Hero Section component has been updated to fetch content dynamically from Strapi CMS instead of using hardcoded data. This allows content editors to manage the hero slides and services through the Strapi admin panel.

## Setup Instructions

### 1. Start Strapi Backend

```bash
cd backend
npm run develop
```

The Strapi server will start on `http://localhost:1337`

### 2. Configure Environment Variables

Create a `.env.local` file in the `oromia-majlis` directory:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### 3. Access Strapi Admin Panel

1. Navigate to `http://localhost:1337/admin`
2. Create an admin account (first time only)
3. The Hero Section content type will be automatically created from the schema files

### 4. Configure API Permissions

1. Go to **Settings** > **Users & Permissions** > **Roles** > **Public**
2. Find "Hero Section" in the list
3. Enable **find** and **findOne** permissions
4. Save

### 5. Seed Data

The bootstrap function in `backend/src/index.ts` automatically seeds sample data when Strapi starts. If you need to re-seed:

1. Delete the existing Hero Section entry in the admin panel
2. Restart Strapi

### 6. Upload Images

1. Go to **Media Library** in Strapi admin
2. Upload images for each slide
3. Edit the Hero Section entry
4. Assign images to each slide

## Content Structure

### Hero Section (Single Type)

- **Slides** (Component, Repeatable)
  - Title (Text)
  - Subtitle (Long text)
  - CTA Text (Text)
  - CTA Link (Text)
  - Image (Media - Single image)

- **Services** (Component, Repeatable)
  - Icon (Text - emoji or icon identifier)
  - Title (Text)
  - Description (Long text)
  - Href (Text - link URL)

## Sample Content

The seeded data includes:

### Slides:
1. **Fastest Growing City in Ethiopia** - About the electronic city
2. **Oromia Regional Islamic Affairs Supreme Council** - About the organization
3. **Serving the Muslim Community** - About community service

### Services:
1. Your Government
2. Jobs and Unemployment
3. Business and Corridor Development
4. Roads and Transport
5. Culture and Recreation
6. Justice, Safety and the law

## API Endpoint

The Hero Section is accessible via:

```
GET http://localhost:1337/api/hero-section?populate[slides][populate]=image&populate[services]=*
```

## Frontend Implementation

### Files Modified

1. **`components/home/HeroSection.tsx`**
   - Updated to fetch data from Strapi
   - Added loading and error states
   - Falls back to default content if Strapi is unavailable

2. **`lib/strapi.ts`** (New)
   - Strapi API utility functions
   - TypeScript interfaces for type safety
   - Data transformation logic

### Features

- **Loading State**: Shows a spinner while fetching data
- **Error Handling**: Gracefully falls back to default content if Strapi is unavailable
- **Type Safety**: Full TypeScript support
- **Caching**: Uses Next.js revalidation (60 seconds)
- **Responsive**: Maintains all existing styling and responsive behavior

## Troubleshooting

### Issue: Content not loading

1. Check that Strapi is running on `http://localhost:1337`
2. Verify `NEXT_PUBLIC_STRAPI_URL` is set correctly
3. Check API permissions in Strapi admin
4. Check browser console for errors

### Issue: Images not displaying

1. Ensure images are uploaded in Strapi Media Library
2. Verify images are assigned to slides
3. Check that the image URL is accessible

### Issue: Bootstrap data not seeding

1. Check Strapi console logs for errors
2. Verify the content type exists in Strapi
3. Manually create the Hero Section entry if needed

## Next Steps

To extend this integration:

1. Add more content types (News, Events, etc.)
2. Implement server-side rendering for better SEO
3. Add image optimization
4. Implement content versioning
5. Add preview mode for draft content

