import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Navbar, Footer } from './components/layout';
import {
  Hero,
  Offers,
  AboutShop,
  ShopSection,
  WhyChooseUs,
  Testimonials,
  StoreLocation,
  ContactSection,
} from './components/sections';
import { CartDrawer } from './components/commerce';
import { ChatbotWidget } from './components/chat';
import { WhatsAppButton } from './components/common';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { useCart } from './hooks';

/**
 * Main Store Application Content
 *
 * Implements Step 17 Full Page Assembly in exact requested order:
 * Navbar → Hero → Offers → AboutShop → Categories+Shop (Products+Search+Filter)
 * → Recommendations → WhyChooseUs → Testimonials → StoreLocation
 * → QueryForm ("Ask Us a Question") → Footer.
 *
 * Global Persistent Overlays:
 * - CartDrawer (slide-in parcel management)
 * - ChatbotWidget (fixed bottom-right live N8N AI concierge)
 * - WhatsAppButton (fixed bottom-left quick-contact)
 */
function StoreApp() {
  const { totalCount, openDrawer } = useCart();
  const [activeCategory, setActiveCategory] = useState(null);
  const [inquiryState, setInquiryState] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Question',
    message: '',
  });

  const handleAddToCart = (product) => {
    const name = typeof product === 'string' ? product : product?.name || 'Handcrafted item';
    toast.success(`Added "${name}" to parcel!`, {
      icon: '📦',
      style: {
        background: '#5C6B4F',
        color: '#F7F5EF',
        border: '1px solid #45513A',
        fontFamily: 'Space Mono, monospace',
        fontSize: '12px',
      },
    });
  };

  /**
   * Pre-fill inquiry form from CartDrawer order inquiry action
   */
  const handleOrderInquiry = ({ category, message }) => {
    setInquiryState((prev) => ({
      ...prev,
      category: category || 'Order Inquiry',
      message: message || '',
    }));
    toast.success('Parcel items copied to inquiry form below!', {
      icon: '📋',
      style: {
        background: '#5C6B4F',
        color: '#F7F5EF',
        border: '1px solid #45513A',
        fontFamily: 'Space Mono, monospace',
        fontSize: '12px',
      },
    });
  };

  /**
   * Smooth scroll helper to element by ID
   */
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss/20 selection:text-ink flex flex-col antialiased">
      <Toaster position="top-right" containerStyle={{ zIndex: 99999 }} />

      {/* Step 3 & 7: Sticky Responsive Navbar wired to Cart & Theme Contexts */}
      <Navbar
        cartCount={totalCount}
        onCartClick={openDrawer}
      />

      {/* Step 7: Slide-in Cart Drawer with AI Recommendations */}
      <CartDrawer onInquireOrder={handleOrderInquiry} />

      {/* Main Content Area with Landmark Section IDs for Smooth Scroll Navigation */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (#home) */}
        {/* ========================================================================= */}
        <Hero
          onExploreClick={() => scrollToSection('shop')}
          onAskClick={() => scrollToSection('contact')}
        />

        {/* ========================================================================= */}
        {/* 2. OFFERS / PROMOTIONAL GIFT-TAG BANNER */}
        {/* ========================================================================= */}
        <Offers
          onClaimOffer={(cat) => {
            setActiveCategory(cat);
            scrollToSection('shop');
          }}
        />

        {/* ========================================================================= */}
        {/* 3. ABOUT / BRAND STORY SECTION (#about) */}
        {/* ========================================================================= */}
        <AboutShop
          onExploreClick={() => scrollToSection('shop')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* ========================================================================= */}
        {/* 4 & 5. CATEGORIES + SHOP (Products + Search + Filters + AI Recommendations) (#shop) */}
        {/* ========================================================================= */}
        <ShopSection
          onAddToCart={handleAddToCart}
          activeCategory={activeCategory}
        />

        {/* ========================================================================= */}
        {/* 6. WHY CHOOSE US / VALUE PROPOSITIONS */}
        {/* ========================================================================= */}
        <WhyChooseUs />

        {/* ========================================================================= */}
        {/* 7. TESTIMONIALS / PATRON REVIEWS SECTION (#reviews) */}
        {/* ========================================================================= */}
        <Testimonials />

        {/* ========================================================================= */}
        {/* 8. STORE LOCATION & WORKSHOP MAP SECTION (#location) */}
        {/* ========================================================================= */}
        <StoreLocation />

        {/* ========================================================================= */}
        {/* 9. N8N QUERY FORM ("Ask Us a Question" / Concierge Inquiry) (#contact) */}
        {/* ========================================================================= */}
        <ContactSection
          initialInquiryValues={inquiryState}
          onInquirySuccess={() => {
            setInquiryState({
              name: '',
              email: '',
              phone: '',
              category: 'General Question',
              message: '',
            });
          }}
        />
      </main>

      {/* Step 3: Responsive Footer with Tagline, Store Coordinates, Newsletter & Hackathon Info */}
      <Footer />

      {/* Step 14: N8N Chatbot Widget with Gift-Tag Launcher & Proactive Greeting (Bottom-Right) */}
      <ChatbotWidget />

      {/* Step 15: WhatsApp Quick-Contact Floating Button (Bottom-Left) */}
      <WhatsAppButton />
    </div>
  );
}

/**
 * Root Application Entry with Theme & Cart Providers
 */
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </ThemeProvider>
  );
}
