# N8N Automation & Webhook Integration

UrbanNest features live two-way integration with **N8N.io** workflows for customer inquiries and AI concierge conversations.

---

## 1. Where Webhook URLs are Configured

Environment variables are defined in [`.env`](file:///c:/Users/rahul%20kumar%20singh/Desktop/UrbanNest%20Lifestyle%20Store/.env) at the project root:

```ini
# Production N8N Query Form Webhook Endpoint
VITE_N8N_QUERY_FORM_URL="https://yogeshsince2023.app.n8n.cloud/webhook/website-query"

# Production N8N AI Chatbot Webhook Endpoint
VITE_N8N_CHATBOT_URL="https://soham6050.app.n8n.cloud/webhook/a35826c3-52aa-487c-a499-7da1565c630b/chat"

# Support Concierge WhatsApp Number
VITE_WHATSAPP_PHONE="919876543210"
```

### Component Code Locations:
- **Query Form**: [`src/components/forms/QueryForm.jsx`](file:///c:/Users/rahul%20kumar%20singh/Desktop/UrbanNest%20Lifestyle%20Store/src/components/forms/QueryForm.jsx)
  - Reads `import.meta.env.VITE_N8N_QUERY_FORM_URL` with hardcoded fallback to the production webhook URL.
- **Chatbot Widget**: [`src/components/chat/ChatbotWidget.jsx`](file:///c:/Users/rahul%20kumar%20singh/Desktop/UrbanNest%20Lifestyle%20Store/src/components/chat/ChatbotWidget.jsx)
  - Reads `import.meta.env.VITE_N8N_CHATBOT_URL` and initializes `@n8n/chat` with custom Moss theme parameters.

---

## 2. How to Swap in Your Own N8N Webhooks

1. **Query Form**:
   - In N8N, create a workflow with a **Webhook node** (Method: `POST`, Path: `website-query`).
   - Copy the Production Webhook URL.
   - Update `VITE_N8N_QUERY_FORM_URL` in `.env`.
   - Incoming JSON Payload Schema:
     ```json
     {
       "name": "Eleanor Vance",
       "email": "eleanor@example.com",
       "phone": "+1-415-555-0198",
       "category": "Order Inquiry",
       "message": "Inquiry regarding custom stoneware glaze...",
       "submittedAt": "2026-08-21T16:45:00.000Z",
       "source": "UrbanNest Storefront Concierge"
     }
     ```

2. **AI Chatbot**:
   - In N8N, add an **N8N Chat Trigger** node connected to an AI Agent or LLM chain.
   - Copy the Chat Webhook URL.
   - Update `VITE_N8N_CHATBOT_URL` in `.env`.

---

## 3. Resilience & Error Handling

- **Honeypot Shielding**: Hidden `website_url` field catches automated bot spam.
- **Timeout Protection**: 10-second `AbortController` timeout prevents UI hangs on slow networks.
- **Field State Preservation**: On failure, input values are preserved so customers never lose their written inquiries.
- **Network Logging**: Console logs `response.status` (`200 OK`) to allow visible live verification during judging and demos.
