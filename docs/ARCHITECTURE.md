# UrbanNest Lifestyle Store — Documentation

## Project Architecture & Solo Developer Maintenance Guide

### Overview
UrbanNest is a modern e-commerce & storefront web application engineered for the "Take a Local Shop Online" hackathon.

### Directory Structure & Responsibilities
- **`public/`**: Static assets, SEO configs (`robots.txt`, `sitemap.xml`, `favicon.svg`, `OG_IMAGE_GUIDE.md`), and raw image directories (`products/`, `hero/`, `icons/`).
- **`src/components/layout/`**: Header, Navbar, Footer, Mobile Navigation, Announcement Bar.
- **`src/components/sections/`**: Hero, Featured Collections, Product Grid, Slow Living Story, Customer Reviews, Gift Tag Promo, FAQ.
- **`src/components/forms/`**: Inquiries, Custom Gift Parcel Builder, Newsletter Signup.
- **`src/components/chatbot/`**: AI Lifestyle Concierge floating assistant widget.
- **`src/components/commerce/`**: Cart drawer, product quick-view modal, checkout simulation.
- **`src/components/contact/`**: Store location, opening hours, interactive map preview.
- **`src/components/theme/`**: Theme provider and accessibility settings toggles.
- **`src/components/ui/`**: Reusable primitive components (GiftTagButton, TagBadge, ParcelCard, InputField, Toast).
- **`src/context/`**: React Context providers (CartContext, ThemeContext, StoreContext).
- **`src/data/`**: Static catalogs, product inventories, artisan profiles, mock review data.
- **`src/hooks/`**: Custom hooks (`useCart`, `useScrollReveal`, `useReducedMotion`, `useMediaQuery`).
- **`src/utils/`**: Helper functions (currency formatters, n8n webhook dispatchers, class mergers).
- **`src/styles/`**: CSS custom property tokens (`variables.css`) and Tailwind layer integration (`globals.css`).
