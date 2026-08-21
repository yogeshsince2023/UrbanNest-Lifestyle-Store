# Deployment Guide

UrbanNest is a standard static Single-Page Application (SPA) that can be built and deployed instantly to any modern hosting platform (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or AWS S3 + CloudFront).

---

## 1. Local Development & Production Build

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile optimized production bundle
npm run build

# 4. Preview the production build locally
npm run preview
```

The compiled output will be generated in the `dist/` directory.

---

## 2. Deploying to Vercel

```bash
# Using Vercel CLI
npx vercel --prod
```
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Set `VITE_N8N_QUERY_FORM_URL`, `VITE_N8N_CHATBOT_URL`, `VITE_WHATSAPP_PHONE` in the Vercel project dashboard.

---

## 3. Deploying to Netlify

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Rewrite Rule** (`public/_redirects`):
  ```
  /*    /index.html   200
  ```

---

## 4. Post-Deploy Verification

After deployment, verify the following live endpoints:
- Primary Storefront: `https://your-domain.com/`
- Sitemap Index: `https://your-domain.com/sitemap.xml`
- Robots Exclusion File: `https://your-domain.com/robots.txt`
- Query Form Webhook: Submit a test inquiry and confirm `200 OK` in your N8N execution history.
