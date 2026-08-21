# Proposed Solution

## The UrbanNest Architecture

**UrbanNest Lifestyle Store** provides a holistic, cohesive storefront engineered specifically for small-batch artisanal commerce.

### 1. Tactile Editorial Design Language
Rather than a cookie-cutter digital template, UrbanNest uses a signature **Craft & Parcel design system**:
- Warm paper (`#F7F5EF`) and warm charcoal (`#181614`) backgrounds with natural soot ink (`#26261F`).
- Earthy botanical accents: Deep Pine Moss (`#5C6B4F`), Terracotta Clay (`#8B5E3C`), and Antique Brass (`#C89D3C`).
- Tactile physical motifs: Punched gift-tag eyelets, chamfered corner cuts, parcel borders, and paper lift hover effects.

### 2. Multi-Channel Automation Pipeline
UrbanNest connects directly to live N8N automation workflows to eliminate friction for both the customer and studio staff:
- **Concierge Query Form**: Directly POSTs inquiries to a live N8N webhook endpoint (`/webhook/website-query`), logging real network requests, triggering automated responses, and managing leads.
- **AI Concierge Chatbot**: Leverages `@n8n/chat` connected to an N8N Chat Trigger node (`/webhook/.../chat`), delivering conversational assistant support with an artisanal brand voice.
- **WhatsApp Quick-Contact**: Direct low-friction chat link (`https://wa.me/...`) for instant conversational commerce.

### 3. Integrated Storytelling & Commerce Flow
- **Multi-Factor Catalog Filtering**: Instant AND-logic search across 16 small-batch goods by category, title, description, tags, and price band.
- **Order Inquiry Synchronization**: The slide-in cart drawer calculates estimated subtotals and auto-populates the concierge query form with an itemized parcel summary.
- **Content-Based AI Recommendations**: Jaccard similarity index calculates tag overlap to suggest related goods both on the catalog page and inside the active cart.
