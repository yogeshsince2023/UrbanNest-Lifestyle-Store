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
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-9 h-9 border-2 border-moss/30 border-t-moss rounded-full animate-spin" />
    </div>
  );
}

/**
 * Main Store Application Content — shared layout wrapping page routes
 */
function StoreApp() {
  const { totalCount, openDrawer, addItem } = useCart();
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
    addItem(product);
    const name = typeof product === 'string' ? product : product?.name || 'Handcrafted item';
    toast.success(`Added "${name}" to parcel!`, {
      icon: '📦',
      style: {
        background: '#5C6B4F',
        color: '#F7F5EF',
        border: '1px solid #45513A',
        fontFamily: 'Space Mono, monospace',
        fontSize: '13px',
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
        fontSize: '13px',
      },
    });
    setIsAskModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col antialiased">
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

      <main className="flex-1 w-full">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
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
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                  <ShopPage
                    onAddToCart={handleAddToCart}
                    activeCategory={activeCategory}
                  />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
                  <AboutPage
                    onExploreClick={() => navigate('/shop')}
                    onContactClick={() => setIsAskModalOpen(true)}
                  />
                </div>
              }
            />
            <Route
              path="/reviews"
              element={
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <ReviewsPage />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
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
                </div>
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
