import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Navbar, Footer } from './components/layout';
import { CartDrawer } from './components/commerce';
import { ChatbotWidget } from './components/chat';
import { WhatsAppButton } from './components/common';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { useCart } from './hooks';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';

/**
 * Scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Main Store Application Content — shared layout wrapping page routes
 */
function StoreApp() {
  const { totalCount, openDrawer } = useCart();
  const navigate = useNavigate();
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
    toast.success('Parcel items copied to inquiry form!', {
      icon: '📋',
      style: {
        background: '#5C6B4F',
        color: '#F7F5EF',
        border: '1px solid #45513A',
        fontFamily: 'Space Mono, monospace',
        fontSize: '12px',
      },
    });
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss/20 selection:text-ink flex flex-col antialiased">
      <Toaster position="top-right" containerStyle={{ zIndex: 99999 }} />

      <Navbar
        cartCount={totalCount}
        onCartClick={openDrawer}
      />

      <CartDrawer onInquireOrder={handleOrderInquiry} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onExploreClick={() => navigate('/shop')}
                onAskClick={() => navigate('/contact')}
                onClaimOffer={(cat) => {
                  setActiveCategory(cat);
                  navigate('/shop');
                }}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCart={handleAddToCart}
                activeCategory={activeCategory}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onExploreClick={() => navigate('/shop')}
                onContactClick={() => navigate('/contact')}
              />
            }
          />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route
            path="/contact"
            element={
              <ContactPage
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
            }
          />
        </Routes>
      </main>

      <Footer />

      <ChatbotWidget />
      <WhatsAppButton />
    </div>
  );
}

/**
 * Root Application Entry with Theme, Cart & Router Providers
 */
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <ScrollToTop />
          <StoreApp />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
