# UrbanNest Lifestyle Store 🌿🏷️

> **Mindful Home Décor, Handcrafted Ceramics, Washed Linens & Bespoke Gift Parcels**  
> *Crafted with slow-living ethos, tactile editorial design, and automated N8N workflows.*

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![N8N Workflows](https://img.shields.io/badge/N8N-Automated_Webhooks-EA4B71?style=flat-square&logo=n8n&logoColor=white)](https://n8n.io/)
[![WCAG 2.1 AAA](https://img.shields.io/badge/A11y-WCAG_2.1_AAA-5C6B4F?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Tests](https://img.shields.io/badge/Test_Suites-19_Passing-success?style=flat-square)](./tests/)

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Key Features & Highlights](#-key-features--highlights)
- [Design System & Brand Identity](#-design-system--brand-identity)
- [N8N Automation & Webhooks](#-n8n-automation--webhooks)
- [AI Content-Based Recommendations](#-ai-content-based-recommendations)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running Automated Tests](#-running-automated-tests)
- [Documentation Suite](#-documentation-suite)
- [License](#-license)

---

## 🌿 Overview

**UrbanNest Lifestyle Store** is an artisanal e-commerce flagship designed to prove that modern digital commerce doesn't need to look like a generic corporate template. Built for small-batch potters, textile weavers, and gift parcel curators, UrbanNest marries **tactile paper-and-parcel aesthetics** with **rock-solid automation engineering**:

- **Real N8N Workflows**: Real-time webhook submission for custom queries and conversational AI chatbot support.
- **Content-Based AI Recommendations**: Jaccard similarity index calculates multi-tag affinities for intelligent parcel suggestions.
- **Cart-to-Concierge Synchronization**: One-click transition from shopping parcel to itemized order inquiry form.
- **True Dark/Light Mode**: Warm charcoal (`#181614`) and parchment ink (`#EDE8DF`) preserving cozy craft warmth.

---

## ✨ Key Features & Highlights

1. **Craft & Parcel Design System**: Reusable primitives (`Button`, `Tag`, `Card`) featuring punched gift-tag eyelets, chamfered edges, and paper-lift hover physics.
2. **Interactive Catalog Browsing**: Multi-factor AND-logic filtering across 16 small-batch goods by category, debounced search (~250ms), and price band.
3. **Shopping Cart & Slide-In Drawer**: Real-time subtotal calculations, accessible $\ge 44\text{px}$ touch steppers, and animated empty states.
4. **Studio Concierge Form**: Client-side validation, honeypot bot shielding, 10s network timeout protection, and live `200 OK` console logging.
5. **Conversational AI Chatbot (`@n8n/chat`)**: Proactive 4.5s greeting bubble, styled in custom Moss accents with `Escape` key dismissals.
6. **WhatsApp Quick-Contact**: Dedicated low-friction messaging channel with pre-filled inquiry text.
7. **Patron Testimonials Carousel**: 6 category-specific reviews with mobile touch snap scrolling (`snap-x snap-mandatory`).
8. **Interactive Studio Location**: Embedded Google Map iframe with operating hours and one-click directions.
9. **Full Production SEO**: Canonical URLs, Open Graph, Twitter Cards, and `LocalBusiness` JSON-LD schema markup.
10. **Dual-Layer Reduced Motion**: Instant zero-duration animation bypass for patrons with vestibular sensitivities.

---

## 🎨 Design System & Brand Identity

| Token Name | Light Mode Hex | Dark Mode Hex | Usage |
|---|---|---|---|
| **Paper** | `#F7F5EF` | `#181614` | Primary canvas and page background |
| **Ink** | `#26261F` | `#EDE8DF` | Primary typography and structural borders |
| **Moss** | `#5C6B4F` | `#7E936E` | Brand accent, primary CTAs, active pills |
| **Clay** | `#8B5E3C` | `#B8845E` | Promotional banners, prices, secondary badges |
| **Brass** | `#C89D3C` | `#E2B85E` | Star ratings, verified marks, decorative eyelets |
| **Cloud** | `#EFECE4` | `#24211E` | Card surfaces, input fields, control panels |

---

## ⚡ N8N Automation & Webhooks

UrbanNest communicates with live N8N cloud workflows:

- **Customer Inquiries**: `https://yogeshsince2023.app.n8n.cloud/webhook/website-query`
- **AI Concierge Chatbot**: `https://soham6050.app.n8n.cloud/webhook/a35826c3-52aa-487c-a499-7da1565c630b/chat`

To swap in your own endpoints, configure `.env`:
```ini
VITE_N8N_QUERY_FORM_URL="https://your-n8n.cloud/webhook/your-query-endpoint"
VITE_N8N_CHATBOT_URL="https://your-n8n.cloud/webhook/your-chat-endpoint"
VITE_WHATSAPP_PHONE="919876543210"
```

---

## 🧠 AI Content-Based Recommendations

Rather than rendering hardcoded related products, UrbanNest computes genuine **content-based similarity** using the **Jaccard Similarity Index** on product tag sets:

$$\text{Jaccard}(A, B) = \frac{|A \cap B|}{|A \cup B|}$$

- **Composite Score**: $(J \times 0.65) + (\text{Shared Category} \times 0.22) + (\text{Price Proximity} \times 0.18)$
- **Anti-Duplication**: Items already added to the cart are automatically filtered out.
- **Drawer Integration**: The cart drawer dynamically updates suggested add-ons under *"Complete Your Parcel"*.

---

## 📁 Project Structure

```
UrbanNest Lifestyle Store/
├── docs/                       # Project documentation suite
│   ├── problem-statement.md
│   ├── proposed-solution.md
│   ├── tech-stack.md
│   ├── n8n-integration.md
│   ├── deployment-guide.md
│   ├── future-improvements.md
│   └── differentiators.md
├── public/                     # Static assets, sitemaps, robots.txt
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── OG_IMAGE_GUIDE.md
├── src/
│   ├── components/
│   │   ├── chat/               # N8N ChatbotWidget
│   │   ├── commerce/           # ProductCard, CartDrawer, Categories, Recommendations
│   │   ├── common/             # WhatsAppButton
│   │   ├── forms/              # QueryForm with N8N webhook
│   │   ├── layout/             # Sticky Navbar, Footer
│   │   ├── sections/           # Hero, Offers, AboutShop, WhyChooseUs, Testimonials, StoreLocation, Contact
│   │   └── ui/                 # Button, Tag, Card design primitives
│   ├── context/                # CartContext, ThemeContext
│   ├── data/                   # products.json, testimonials.json
│   ├── styles/                 # variables.css, globals.css
│   ├── utils/                  # recommendations.js, motion.js, cn.js
│   ├── App.jsx                 # Full assembled application
│   └── main.jsx
├── tests/                      # 19 automated test suites & manual QA checklist
│   ├── manual-qa-checklist.md
│   ├── cart-system.test.js
│   ├── recommendations.test.js
│   ├── query-form.test.js
│   ├── responsive-qa.test.js
│   └── ...
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yogeshsince2023/UrbanNest-Lifestyle-Store.git
cd UrbanNest-Lifestyle-Store

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev

# 4. Compile production bundle
npm run build
```

---

## 🧪 Running Automated Tests

UrbanNest features **19 native automated test suites** verifying DOM integrity, mathematical similarity models, cart arithmetic, webhook contracts, and accessibility:

```bash
# Run all 19 test suites
node tests/docs-coverage.test.js; node tests/qa-checklist.test.js; node tests/responsive-qa.test.js; node tests/performance-accessibility.test.js; node tests/seo-metadata.test.js; node tests/motion-consistency.test.js; node tests/full-page-assembly.test.js; node tests/recommendations.test.js; node tests/whatsapp-button.test.js; node tests/chatbot-widget.test.js; node tests/query-form.test.js; node tests/theme-system.test.js; node tests/store-location.test.js; node tests/testimonials.test.js; node tests/why-choose-us.test.js; node tests/offers-banner.test.js; node tests/cart-system.test.js; node tests/shop-filtering.test.js; node tests/about-shop.test.js
```

---

## 📚 Documentation Suite

- [Problem Statement](docs/problem-statement.md)
- [Proposed Solution](docs/proposed-solution.md)
- [Tech Stack Rationale](docs/tech-stack.md)
- [N8N Webhook Integration Guide](docs/n8n-integration.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Future Roadmap](docs/future-improvements.md)
- [Key Differentiators](docs/differentiators.md)
- [Manual QA Checklist](tests/manual-qa-checklist.md)

---

## 📄 License

MIT License © 2026 UrbanNest Lifestyle Studio LLC.
