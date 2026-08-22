# Deployment Guide

UrbanNest is built with Vite, React 18, and Tailwind CSS as a high-performance static Single-Page Application (SPA). It can be deployed instantly to **Render**, **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 1. Deploying to Render (Recommended Static Site)

### Option A: Using `render.yaml` (Blueprint / 1-Click)
1. In the [Render Dashboard](https://dashboard.render.com), click **New +** &rarr; **Blueprint**.
2. Connect your GitHub repository: `https://github.com/yogeshsince2023/UrbanNest-Lifestyle-Store.git`.
3. Render will automatically detect [`render.yaml`](file:///c:/Users/rahul%20kumar%20singh/Desktop/UrbanNest%20Lifestyle%20Store/render.yaml) at the repository root and configure the build settings, SPA rewrite rules, security headers, and environment variables.
4. Click **Apply**.

---

### Option B: Manual Setup via Render Dashboard
1. In Render Dashboard, click **New +** &rarr; **Static Site**.
2. Connect your GitHub repository (`UrbanNest-Lifestyle-Store`).
3. Fill in the deployment configuration:

| Field | Value |
|---|---|
| **Name** | `urbannest-lifestyle-store` |
| **Branch** | `main` |
| **Root Directory** | *(leave blank / default root)* |
| **Build Command** | `npm install && npm run build` *(or `npm run build`)* |
| **Publish Directory** | `dist` |
| **Auto-Deploy** | `Yes` (enabled by default on pushes to `main`) |

4. **SPA Rewrite Rule (Crucial for React Router)**:
   - Navigate to **Redirects/Rewrites** in the left sidebar of your Render Static Site.
   - Add a rewrite rule:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
   - *Why*: Without this rule, refreshing routes like `/shop` or `/contact` on a static host will return a 404.

---

## 2. Environment Variables to Set in Render Dashboard

Navigate to **Environment** tab in your Render service settings and add the following variables:

| Variable Name | Production Value | Description |
|---|---|---|
| `VITE_N8N_QUERY_FORM_URL` | `https://yogeshsince2023.app.n8n.cloud/webhook/website-query` | Live N8N endpoint receiving customer form inquiries |
| `VITE_N8N_CHATBOT_URL` | `https://soham6050.app.n8n.cloud/webhook/a35826c3-52aa-487c-a499-7da1565c630b/chat` | Live N8N Chat Trigger endpoint powering the AI concierge |
| `VITE_WHATSAPP_PHONE` | `919876543210` | Studio WhatsApp business contact number (with country code) |
| `VITE_STORE_BASE_URL` | `https://urbannest-lifestyle.store/` | Canonical production domain URL |

*(Note: If environment variables are omitted, the application code has built-in production fallbacks).*

---

## 3. Post-Deployment Smoke Test Protocol

Run these checks immediately on your live Render URL (`https://urbannest-lifestyle-store.onrender.com`):

### 1. N8N Concierge Query Form (CORS & Webhook Test)
- Click **Ask Us Anything** (or navigate to `/contact`).
- Fill in: Name (`Test Patron`), Email (`patron@example.com`), Category (`Product Details`), Message (`Testing live production webhook delivery`).
- Click **Send Inquiry to Studio**.
- **Expected Outcome**:
  - Button enters loading state ("Transmitting to Studio...").
  - Green toast notification appears: *"Thank you, Test Patron! Your product details inquiry was received by our concierge."*
  - Form resets.
  - Open Browser DevTools (F12) &rarr; Console: Look for `[N8N Query Webhook Success]: { status: 200, statusText: "OK" }`.
  - Check your N8N Cloud Execution log for the incoming payload.

### 2. N8N AI Chatbot Widget (Iframe & CORS Test)
- Click the bottom-right floating **Concierge AI** button.
- Type: *"What are your store hours in Mill Valley?"* and press Enter.
- **Expected Outcome**:
  - The AI Studio Concierge streams or responds with store hours (Tuesday–Saturday 10:00 AM–6:00 PM, Sunday 11:00 AM–4:00 PM).
  - Test domain guardrail: Ask *"What is the capital of France?"* &rarr; AI politely declines and redirects to store topics.
  - Test Dark Mode: Toggle the Sun/Moon theme in the Navbar; verify the chatbot input text and messages remain crisp and high-contrast.

### 3. SPA Route Refresh Test
- Navigate to `https://your-app.onrender.com/shop`.
- Press `Ctrl + R` (or `Cmd + R` on Mac) to hard refresh the page.
- **Expected Outcome**: The Shop page reloads cleanly without a 404 "Not Found" error (verifying Render rewrite rules).

### 4. Cart Drawer & Pre-fill Test
- Click **Add to Parcel** on any product card.
- Open the shopping bag in the Navbar.
- Click **Submit Order Inquiry** inside the cart drawer.
- **Expected Outcome**: Instant Inquiry Modal opens with all cart items pre-filled into the message field.

### 5. WhatsApp Quick-Contact Test
- Click the bottom-left floating green **WhatsApp** button.
- **Expected Outcome**: Opens a new tab to `api.whatsapp.com` with pre-filled greeting text.

---

## 4. Automatic Deployments

Auto-deploy is enabled by default:
- Any `git push origin main` triggers a fresh build and deploy on Render within ~45–60 seconds.
- You can monitor live build logs in the **Deploys** tab of the Render dashboard.

---

## 5. Other Platforms (Vercel & Netlify)

### Vercel
```bash
npx vercel --prod
```
- **Framework Preset**: `Vite` | **Build Command**: `npm run build` | **Output**: `dist`

### Netlify
```bash
npx netlify deploy --prod
```
- Uses [`public/_redirects`](file:///c:/Users/rahul%20kumar%20singh/Desktop/UrbanNest%20Lifestyle%20Store/public/_redirects) for SPA routing.
