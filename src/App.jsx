import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Navbar, Footer } from './components/layout';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { useCart } from './hooks';

// Lazy-load page routes — each becomes its own JS chunk
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Lazy-load heavy overlay components (not needed at first paint)
const CartDrawer = lazy(() => import('./components/commerce/CartDrawer').then(m => ({ default: m.CartDrawer })));
const ChatbotWidget = lazy(() => import('./components/chat/ChatbotWidget').then(m => ({ default: m.ChatbotWidget })));
const WhatsAppButton = lazy(() => import('./components/common/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));
const InquiryModal = lazy(() => import('./components/forms/InquiryModal').then(m => ({ default: m.InquiryModal })));

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
 * Minimal loading fallback — just a subtle spinner
 */
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-2 border-moss/30 border-t-moss rounded-full animate-spin" />
    </div>
  );
}

/**
 * Main Store Application Content — shared layout wrapping page routes
 */
function StoreApp() {
  const { totalCount, openDrawer } = useCart();
  const navigate = useNavigate();
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
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
    setIsAskModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss/20 selection:text-ink flex flex-col antialiased">
      <Toaster position="top-right" containerStyle={{ zIndex: 99999 }} />

      <Navbar
        cartCount={totalCount}
        onCartClick={openDrawer}
        onAskClick={() => setIsAskModalOpen(true)}
      />

      {/* Heavy overlay components — lazy-loaded, render nothing until needed */}
      <Suspense fallback={null}>
        <CartDrawer onInquireOrder={handleOrderInquiry} />
      </Suspense>

      <Suspense fallback={null}>
        <InquiryModal
          isOpen={isAskModalOpen}
          onClose={() => setIsAskModalOpen(false)}
          initialValues={inquiryState}
          onSuccess={() => {
            setInquiryState({
              name: '',
              email: '',
              phone: '',
              category: 'General Question',
              message: '',
            });
          }}
        />
      </Suspense>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onExploreClick={() => navigate('/shop')}
                  onAskClick={() => setIsAskModalOpen(true)}
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
                  onContactClick={() => setIsAskModalOpen(true)}
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
        </Suspense>
      </main>

      <Footer />

      {/* Chatbot & WhatsApp — lazy, no fallback needed */}
      <Suspense fallback={null}>
        <ChatbotWidget />
        <WhatsAppButton />
      </Suspense>
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
