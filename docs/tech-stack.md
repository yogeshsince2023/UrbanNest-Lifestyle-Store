# Tech Stack

UrbanNest is built with a minimal, high-performance modern web stack prioritizing zero bloat, clean semantics, accessibility, and fluid animations.

---

## Core Technologies & Rationale

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| **Core Framework** | **React** | `19.x` | Functional components, hooks (`useReducer`, `useContext`, `useCallback`, `useMemo`), concurrent rendering, and zero legacy class boilerplate. |
| **Build Tool & Bundler** | **Vite** | `6.x` | Instant HMR, lightning-fast ESM production builds (~12s), tree-shaking, and Rollup chunk optimization. |
| **Styling Engine** | **Tailwind CSS + Vanilla CSS Variables** | `4.x` | Utility classes paired with centralized CSS design tokens in `src/styles/variables.css` for instant, seamless dark/light theme transitions. |
| **Animations & Motion** | **Framer Motion** | `12.x` | Hardware-accelerated spring physics for the cart drawer, unified easing curves (`CRAFT_EASING`), and built-in `useReducedMotion()` support. |
| **Typography** | **Google Fonts (Fraunces, Work Sans, Space Mono)** | Web Fonts | Editorial Fraunces display serif for warmth; clean Work Sans for readability; monospace Space Mono for prices and utility codes. |
| **Iconography** | **Lucide React** | `1.x` | Crisp, scalable SVG icons styled seamlessly with Tailwind color and stroke tokens. |
| **Notifications** | **React Hot Toast** | `2.x` | Lightweight, non-blocking toast notifications customized with monospace parcel aesthetic. |
| **AI & Webhooks** | **@n8n/chat & N8N.io Webhooks** | Official Package | Live webhook transmission for query forms and embedded conversational AI chatbot widget. |
| **Testing** | **Node.js Native Test Assertions** | Node 20+ | Zero heavy testing framework dependencies; 18 fast, deterministic native test suites validating DOM structure, math, and accessibility. |
