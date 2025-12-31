# Fix: Hero Section Not Appearing in Permissions

## The Problem
Hero Section content type exists but doesn't appear in Settings → Users & Permissions → Roles → Public

## Root Cause
In Strapi, content types need to be properly registered and the API routes need to exist. Sometimes content types created via schema files don't automatically appear in permissions until they're accessed or re-registered.

## Complete Fix - Step by Step

### Step 1: Verify Content Type Structure

The content type files should be in:
```
backend/src/api/hero-section/
├── content-types/
│   └── hero-section/
│       ├── schema.json
│       └── routes.json (NEW - I just created this)
├── controllers/
│   └── hero-section.ts (NEW - I just created this)
├── routes/
│   └── hero-section.ts (NEW - I just created this)
└── services/
    └── hero-section.ts (NEW - I just created this)
```

### Step 2: Restart Strapi Completely

1. **Stop Strapi** completely (Ctrl+C)
2. **Clear cache**:
   ```powershell
   Remove-Item -Path ".tmp" -Recurse -Force -ErrorAction SilentlyContinue
   Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
   ```
3. **Restart Strapi**:
   ```bash
   npm run develop
   ```

### Step 3: Force Content Type Registration

After Strapi starts:

1. **Go to Content-Type Builder**
   - Navigate to: `http://localhost:1337/admin/plugins/content-type-builder`
   - You should see "Hero Section" in Single Types
   - Click on it
   - Click **"Save"** (even if nothing changed) - This forces re-registration

2. **Go to Content Manager**
   - Navigate to: `http://localhost:1337/admin/content-manager`
   - You should see "Hero Section" in the sidebar
   - Click on it
   - If no entry exists, create one

### Step 4: Check Permissions (After Restart)

1. **Go to Settings** → **Users & Permissions** → **Roles** → **Public**
2. **Refresh the page** (F5 or Ctrl+R)
3. **Scroll down** - Look for "Hero Section"
4. If still not there, try:
   - **Clear browser cache** (Ctrl+Shift+Delete)
   - **Hard refresh** (Ctrl+Shift+R)
   - **Try incognito/private window**

### Step 5: Manual Registration (If Still Not Working)

If it still doesn't appear, manually trigger registration:

1. **Open browser console** (F12) on the Permissions page
2. **Run this in console**:
   ```javascript
   // This forces Strapi to reload content types
   window.location.reload(true);
   ```

Or try accessing the API directly first:
```
http://localhost:1337/api/hero-section
```

Then go back to Permissions.

### Step 6: Alternative - Recreate Content Type

If nothing works, recreate it:

1. **Delete via Content-Type Builder**:
   - Go to Content-Type Builder
   - Find "Hero Section"
   - Click the trash icon to delete it
   - Confirm deletion

2. **Recreate it**:
   - Click "Create new single type"
   - Name: `hero-section`
   - Add component fields (slides, services)
   - Save

3. **Set Permissions**:
   - It should now appear in Permissions immediately

## CORS Configuration

I've updated the CORS configuration to allow your frontend. The new config allows:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

## What I Fixed

1. ✅ **Added CORS configuration** - Properly configured for frontend access
2. ✅ **Created routes file** - Ensures API endpoints are registered
3. ✅ **Created controller** - Handles API requests
4. ✅ **Created service** - Business logic layer
5. ✅ **Updated bootstrap** - Better error handling and multiple API methods
6. ✅ **Added security headers** - Content Security Policy

## Verification Checklist

After restarting Strapi:

- [ ] Strapi starts without errors
- [ ] Content-Type Builder shows "Hero Section"
- [ ] Content Manager shows "Hero Section"
- [ ] API endpoint works: `http://localhost:1337/api/hero-section`
- [ ] Permissions page shows "Hero Section" after refresh
- [ ] Can enable find/findOne permissions
- [ ] Frontend can fetch data (check browser console)

## Still Not Working?

If it still doesn't appear:

1. **Check Strapi logs** for errors
2. **Check browser console** for errors
3. **Verify content type name** matches exactly: `hero-section`
4. **Try creating a test collection type** to see if permissions work at all
5. **Check Strapi version**: `npm list @strapi/strapi`

The issue might be Strapi version-specific. Let me know what version you're using if it still doesn't work.

