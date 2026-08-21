# UrbanNest Lifestyle Store — Pre-Deploy Manual QA Checklist

This document serves as the standard operational verification manual for **UrbanNest Lifestyle Store**. Run through this checklist before every production build or deployment to ensure visual integrity, webhook connectivity, accessibility, and cross-browser reliability.

---

## 🚀 Pre-Flight Automated Health Check

Run the full automated test suite and production build from the workspace root:

```bash
# 1. Execute all 17 automated test suites
node tests/responsive-qa.test.js; node tests/performance-accessibility.test.js; node tests/seo-metadata.test.js; node tests/motion-consistency.test.js; node tests/full-page-assembly.test.js; node tests/recommendations.test.js; node tests/whatsapp-button.test.js; node tests/chatbot-widget.test.js; node tests/query-form.test.js; node tests/theme-system.test.js; node tests/store-location.test.js; node tests/testimonials.test.js; node tests/why-choose-us.test.js; node tests/offers-banner.test.js; node tests/cart-system.test.js; node tests/shop-filtering.test.js; node tests/about-shop.test.js

# 2. Run ESLint code quality scan
npm run lint

# 3. Verify production Vite build compilation
npm run build
```

---

## 📋 Comprehensive QA Test Protocol

### 1. Section Load & Visual Integrity
- [ ] **Initial Page Load**: Page loads without layout shift (CLS), console errors, or missing fonts (Fraunces, Work Sans, Space Mono).
- [ ] **Hierarchy Verification**: Verify sections appear in the exact brand sequence:
  1. `Navbar` (Sticky header)
  2. `Hero` (`#home`)
  3. `Offers` (Promotional Clay gift-tag banner)
  4. `AboutShop` (`#about` brand story narrative & stats)
  5. `ShopSection` (`#shop` catalog, categories, search, price filter)
  6. `Recommendations` (*"You Might Also Like"* AI tag synergy)
  7. `WhyChooseUs` (`#why-choose-us` 4-pillar value cards)
  8. `Testimonials` (`#reviews` patron unboxing reviews)
  9. `StoreLocation` (`#location` Mill Valley coordinates & map)
  10. `ContactSection` (`#contact` live N8N concierge form)
  11. `Footer` (Studio links, coordinates, newsletter & hackathon details)
  12. Floating overlays: `ChatbotWidget` (bottom-right), `WhatsAppButton` (bottom-left), `CartDrawer` (right slide-out)

---

### 2. Navbar Navigation & Scroll-Spy
- [ ] **Brand Logo Click**: Clicking the UrbanNest logo scrolls smoothly to `#home` (top of page).
- [ ] **Nav Links Smooth Scroll**: Clicking `Shop`, `About`, `Reviews`, and `Contact` scrolls accurately to the corresponding section with sticky header offset (~76px).
- [ ] **Active Indicator (Scroll-Spy)**: As you scroll down the page, the active nav link dynamically updates with a solid Moss background and gift-tag eyelet dot.
- [ ] **Sticky Elevation**: Background transitions from transparent to blurred backdrop (`bg-paper/90 backdrop-blur-md`) with subtle bottom border when scrolling past 40px.

---

### 3. Mobile Navigation Drawer (< 768px)
- [ ] **Hamburger Toggle**: Tap hamburger icon to open full-screen slide-out mobile drawer.
- [ ] **Body Scroll Lock**: Background page scrolling is locked when mobile menu is active.
- [ ] **Link Navigation**: Tapping any navigation link scrolls to the section and automatically closes the mobile drawer.
- [ ] **Escape Key & Backdrop**: Pressing `Escape` or tapping the close button closes the mobile drawer immediately.

---

### 4. Category + Search + Price Filter Combination (AND-Logic)
- [ ] **Category Filtering**: Clicking category pills (`Home Décor`, `Gifts`, `Stationery`, `Lifestyle Accessories`, `All`) filters the grid accurately.
- [ ] **Debounced Search**: Typing keywords (e.g., *"stoneware"*, *"linen"*, *"beeswax"*) filters products by name, description, and tags with ~250ms debounce.
- [ ] **Price Range Pills**: Selecting price bands (*"Under ₹500"*, *"₹500 – ₹1,500"*, *"Above ₹1,500"*) intersects with active category and search criteria.
- [ ] **Empty State**: Entering a non-matching query (e.g. *"xyz123"*) displays the tactile empty state card (*"No Handcrafted Goods Found"*).
- [ ] **Reset Filters**: Clicking *"Reset All Filters"* restores the full 16-product catalog and clears search and price selections.

---

### 5. Shopping Cart, Drawer & Order Inquiry Pre-Fill
- [ ] **Add to Parcel**: Clicking *"Add to Parcel"* on any product card:
  - Triggers a green feedback state (*"Added to Parcel!"*) with checkmark.
  - Displays a custom Space Mono toast notification in top-right corner.
  - Increments the Navbar parcel badge counter.
- [ ] **Cart Drawer Open/Close**:
  - Clicking the Navbar shopping bag opens the slide-in drawer from the right.
  - Clicking the backdrop, close button `(X)`, or pressing `Escape` closes the drawer.
- [ ] **Quantity Steppers & Removal**:
  - `+` increases quantity and recalculates the estimated subtotal.
  - `-` decreases quantity (floors at 1).
  - Trash icon removes the item entirely.
  - Empty drawer displays the curated empty parcel state with *"Explore Curated Goods"* CTA.
- [ ] **Order Inquiry Synchronization (Step 7 & 13 Integration)**:
  - Adding items to cart and clicking *"Submit Order Inquiry"* in the drawer:
    - Automatically closes the drawer.
    - Smoothly scrolls down to the `#contact` inquiry form.
    - Sets Inquiry Category to `"Order Inquiry"`.
    - Pre-fills the Message textarea with an itemized parcel summary and subtotal.
    - Displays a confirmation toast (*"Parcel items copied to inquiry form below!"*).

---

### 6. AI Content-Based Recommendations Relevance
- [ ] **Shop Section Recommendations**: Below the main catalog, the *"You Might Also Like"* section displays 4 items ranked by Jaccard tag similarity with match percentage badges (e.g., `85% Synergy`).
- [ ] **Cart Drawer Recommendations**: Adding items to the cart dynamically updates the *"Complete Your Parcel"* suggestions inside the drawer based on collective cart tags.
- [ ] **Anti-Duplication**: Verify products already present in the cart are strictly excluded from recommendation cards.
- [ ] **Quick Add Action**: Clicking `+ Add` on a recommended drawer item instantly adds it to the parcel and recalculates the subtotal.

---

### 7. Real Dark / Light Theme System
- [ ] **Theme Switcher Toggle**: Clicking the Sun/Moon toggle in the Navbar smoothly transitions the entire interface between light and dark modes within ~250ms.
- [ ] **Light Mode Tokens**: Warm cream paper background (`#F7F5EF`), deep soot ink (`#26261F`), natural Moss (`#5C6B4F`), Clay (`#8B5E3C`), and Brass (`#C89D3C`).
- [ ] **Dark Mode Tokens**: Warm charcoal paper (`#181614`), soft parchment ink (`#EDE8DF`), luminous Moss (`#7E936E`), Clay (`#B8845E`), and Brass (`#E2B85E`).
- [ ] **Contrast Audit**: All text elements maintain $\ge 4.5:1$ (AA) and $\ge 7:1$ (AAA) contrast ratios across both modes.
- [ ] **LocalStorage Persistence**: Reloading the page preserves the selected theme mode.

---

### 8. Testimonials Section & Carousel
- [ ] **Desktop View ($\ge 1024\text{px}$)**: Displays 3-up column grid of authentic patron unboxing reviews with star ratings and product tags.
- [ ] **Mobile View (< 768px)**: Smooth horizontal swipe/scroll carousel with CSS snap points (`snap-x snap-mandatory`).
- [ ] **Star Ratings**: Star ratings render filled brass stars with accessible `aria-label` ratings.

---

### 9. Store Location & Interactive Map
- [ ] **Studio Coordinates Card**: Displays Mill Valley address, operating hours, phone, and email.
- [ ] **Google Map Frame**: Embedded iframe loads lazily (`loading="lazy"`) with custom rounded-parcel border.
- [ ] **Get Directions Link**: Clicking *"Get Directions"* or *"Open in Google Maps"* opens Google Maps in a new browser tab (`target="_blank" rel="noopener noreferrer"`).

---

### 10. Live N8N Query Form (Real Webhook)
- [ ] **Client-Side Validation**:
  - Submitting an empty form highlights required fields in Clay accent with inline error messages (`role="alert"`).
  - Invalid email formats (e.g. `user@`) trigger regex validation errors.
- [ ] **Live Webhook Submission**:
  - Submitting valid details triggers a rotating loading spinner on the submit button.
  - Sends a `POST` request to `https://yogeshsince2023.app.n8n.cloud/webhook/website-query`.
  - Console logs the HTTP response status (`200 OK`) for live demo verification.
  - Displays a green success toast and clears form inputs.
- [ ] **Error Handling & Field Preservation**:
  - If network or server error occurs, an error notification is displayed, and previously entered input values are preserved in state.
- [ ] **Honeypot Spam Protection**:
  - Hidden `website_url` honeypot field rejects automated spam submissions without displaying errors to genuine patrons.

---

### 11. Live N8N Chatbot Widget (@n8n/chat)
- [ ] **Launcher & Positioning**: Floating gift-tag launcher anchored at `fixed bottom-6 right-6` with punch-hole motif.
- [ ] **Proactive Greeting**: After ~4.5 seconds on page, a subtle greeting bubble slides in (*"Have a question about our handcrafted wares?"*).
- [ ] **Open / Close Interaction**: Clicking the launcher or greeting bubble opens the `@n8n/chat` modal window.
- [ ] **Escape Dismissal**: Pressing `Escape` dismisses the greeting bubble and closes the chat window.
- [ ] **Theme Styling**: Chat header and action accents match the Moss palette (`#5C6B4F` light, `#7E936E` dark) in Work Sans typography.

---

### 12. Floating WhatsApp Quick-Contact Button
- [ ] **Brand Green Exception**: Uses official WhatsApp brand green (`#25D366` / `#128C7E`) with pulsing online status indicator.
- [ ] **Positioning & Clearance**: Anchored at `fixed bottom-6 left-4 sm:left-6`, maintaining $> 250\text{px}$ clearance from the Chatbot launcher on mobile.
- [ ] **Direct Chat Link**: Clicking the button opens `https://wa.me/919876543210?text=...` in a new tab with pre-filled inquiry greeting.

---

### 13. Cross-Browser & Breakpoint Compatibility
- [ ] **Chrome / Edge (Blink)**: Verify full visual rendering, Framer Motion animations, scroll-spy, and webhooks.
- [ ] **Firefox (Gecko)**: Verify custom scrollbars, SVG clipping paths, and theme transitions.
- [ ] **Safari / iOS Safari (WebKit)**: Verify backdrop blur filters (`backdrop-blur-md`), momentum touch scrolling, and font rendering.
- [ ] **Viewport Breakpoints**:
  - **375px (Mobile Phone)**: No horizontal overflow, single-column product grid, wrapped filters, touch targets $\ge 44\text{px}$.
  - **768px (Tablet)**: 2-column product grid, responsive 2x2 value pillars, balanced layouts.
  - **1280px+ (Desktop)**: 4-column product grid, 3-up review cards, split map & concierge columns.

---

### 14. Motion & Accessibility (`prefers-reduced-motion`)
- [ ] **Reduced-Motion Verification**:
  - Enable *Reduce Motion* in OS settings (Windows: Settings > Accessibility > Visual Effects > Animation effects OFF; macOS: Settings > Accessibility > Display > Reduce motion).
  - Verify all Framer Motion scroll reveals and spring physics are skipped immediately (`duration: 0.001s`, `y: 0`), rendering instant layouts without animation drift.
- [ ] **Keyboard Tab Navigation**: Every interactive button, link, stepper, input, and dropdown receives a visible focus ring (`:focus-visible`) in logical tab order.

---

## 🎯 Verification Sign-Off Table

| Test Suite | Tester Name | Date Verified | Build Version | Pass / Fail |
|---|---|---|---|---|
| Automated Tests (17 Suites) | Automated CI / Local | 2026-08-21 | v0.1.0 | ✅ PASS |
| Navigation & Scroll-Spy | Manual QA | 2026-08-21 | v0.1.0 | ✅ PASS |
| Cart & Inquiry Pre-Fill | Manual QA | 2026-08-21 | v0.1.0 | ✅ PASS |
| N8N Query Form Webhook | Manual QA | 2026-08-21 | v0.1.0 | ✅ PASS |
| N8N Chatbot Widget | Manual QA | 2026-08-21 | v0.1.0 | ✅ PASS |
| Dark / Light Theme System | Manual QA | 2026-08-21 | v0.1.0 | ✅ PASS |
| Responsive Breakpoints | Manual QA | 2026-08-21 | v0.1.0 | ✅ PASS |
