import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Sun,
  Moon,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { useTheme } from '../../hooks';
import { cn } from '../../utils/cn';

/**
 * Navigation items configuration
 */
const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Shop', href: '#shop', id: 'shop' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/**
 * Responsive Navbar Component
 *
 * @param {Object} props
 * @param {number} [props.cartCount=3] - Initial static cart count badge
 * @param {Function} [props.onCartClick] - Optional cart icon click handler
 * @param {Function} [props.onThemeToggle] - Optional theme toggle callback
 */
export function Navbar({ cartCount = 3, onCartClick, onThemeToggle }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, isDark, toggleTheme } = useTheme();


  // Track scroll position for sticky background & accurate Scroll-Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Robust Scroll-Spy: determine active section by viewport offset
      const navOffset = 140;
      let currentSection = 'home';

      const sections = NAV_LINKS.map((link) => ({
        id: link.id,
        el: document.getElementById(link.id),
      })).filter((s) => s.el !== null);

      for (const section of sections) {
        const top = section.el.offsetTop - navOffset;
        const height = section.el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(targetId);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navHeight = 76;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    } else if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Toggle dark/light mode via ThemeContext
  const handleToggleTheme = () => {
    toggleTheme();
    if (onThemeToggle) onThemeToggle(!isDark);
  };


  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-paper/90 backdrop-blur-md shadow-parcel border-b border-ink/10 py-3'
            : 'bg-paper/60 backdrop-blur-sm border-b border-transparent py-4 md:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Logotype & Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 rounded-tag transition-transform active:scale-[0.98]"
              aria-label="UrbanNest Lifestyle Store — Return to top"
            >
              <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-tag bg-moss flex items-center justify-center text-cloud shadow-sm group-hover:bg-moss-dark transition-colors">
                {/* Signature chamfered tag hole inside logo icon */}
                <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-paper border border-cloud/40 pointer-events-none" />
                <Sparkles className="w-4 h-4 md:w-4.5 md:h-4.5 text-cloud ml-1 mt-1" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-medium text-xl md:text-2xl text-ink tracking-tight leading-none group-hover:text-moss transition-colors">
                  UrbanNest
                </span>
                <span className="text-[10px] font-utility tracking-widest text-ink/60 uppercase mt-0.5 hidden sm:inline-block">
                  Lifestyle Store
                </span>
              </div>
            </a>

            {/* 2. Desktop Navigation Links (Scroll-Spy Enabled) */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center gap-1 lg:gap-2 bg-cloud/70 backdrop-blur-sm px-3 py-1.5 rounded-pill border border-ink/8 shadow-sm"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative px-3.5 py-1.5 text-xs font-utility uppercase tracking-wider rounded-tag transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss',
                      isActive
                        ? 'text-cloud font-medium bg-moss shadow-sm'
                        : 'text-ink/75 hover:text-ink hover:bg-paper/80'
                    )}
                  >
                    {link.label}
                    {/* Active gift-tag eyelet dot */}
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-paper ml-1.5 align-middle opacity-90" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* 3. Action Hub: CTA Button, Cart Badge & Theme Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Primary CTA: Ask Us Anything (Scrolls to Contact / Inquiry form) */}
              <div className="hidden lg:inline-flex">
                <Button
                  variant="primary"
                  color="moss"
                  size="sm"
                  leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
                  onClick={(e) => handleNavClick(e, 'contact')}
                  aria-label="Ask Us Anything — Jump to inquiry form"
                >
                  Ask Us Anything
                </Button>
              </div>

              {/* Shopping Bag Cart Icon with Count Badge */}
              <button
                type="button"
                onClick={onCartClick}
                aria-label={`Shopping parcel containing ${cartCount} items`}
                className="relative p-2.5 rounded-tag text-ink/80 hover:text-ink hover:bg-cloud transition-colors border border-transparent hover:border-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 rounded-pill bg-clay text-cloud text-[11px] font-utility font-bold flex items-center justify-center shadow-sm border border-paper scale-100 transition-transform animate-pulse"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dark / Light Mode Switcher Toggle with Smooth Animated Icons */}
              <button
                type="button"
                onClick={handleToggleTheme}
                aria-label={isDark ? 'Switch to light natural theme' : 'Switch to dark evening theme'}
                className="relative p-2.5 rounded-tag text-ink/80 hover:text-ink hover:bg-cloud transition-colors border border-transparent hover:border-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss overflow-hidden cursor-pointer"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-brass" aria-hidden="true" />
                    ) : (
                      <Moon className="w-5 h-5 text-ink/80" aria-hidden="true" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>


              {/* Mobile Hamburger Toggle Button (< 768px) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile navigation menu'}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-tag bg-cloud text-ink border border-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss transition-colors"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  {/* Top Bar */}
                  <span
                    className={cn(
                      'w-full h-0.5 bg-ink rounded-full transition-all duration-300 origin-left',
                      isMobileMenuOpen && 'rotate-45 translate-x-0.5 -translate-y-0.5'
                    )}
                  />
                  {/* Middle Bar */}
                  <span
                    className={cn(
                      'w-full h-0.5 bg-ink rounded-full transition-opacity duration-200',
                      isMobileMenuOpen && 'opacity-0'
                    )}
                  />
                  {/* Bottom Bar */}
                  <span
                    className={cn(
                      'w-full h-0.5 bg-ink rounded-full transition-all duration-300 origin-left',
                      isMobileMenuOpen && '-rotate-45 translate-x-0.5 translate-y-0.5'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Slide-in Mobile Menu Drawer (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Slide-in Navigation Drawer */}
            <motion.aside
              id="mobile-navigation-drawer"
              aria-label="Mobile Navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-paper border-l border-ink/15 shadow-2xl p-6 flex flex-col justify-between md:hidden overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-tag bg-moss flex items-center justify-center text-cloud">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-display font-medium text-lg text-ink">UrbanNest</span>
                  </div>
                  <Tag color="moss" size="sm" variant="subtle">
                    Artisan Goods
                  </Tag>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-tag text-sm font-utility uppercase tracking-wider transition-colors',
                          isActive
                            ? 'bg-moss text-cloud font-semibold shadow-sm'
                            : 'text-ink/80 hover:bg-cloud hover:text-ink'
                        )}
                      >
                        <span>{link.label}</span>
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-paper" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 opacity-40" />
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-ink/10 space-y-4">
                <Button
                  variant="primary"
                  color="moss"
                  size="md"
                  className="w-full justify-center"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Ask Us Anything
                </Button>

                <div className="flex items-center justify-between px-2 pt-2 text-xs font-utility text-ink/75">
                  <span>Cart Items: <strong className="text-ink">{cartCount}</strong></span>
                  <button
                    type="button"
                    onClick={handleToggleTheme}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-tag bg-paper hover:bg-cloud border border-ink/15 text-ink text-xs transition-colors cursor-pointer"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-brass" />
                        <span>Evening Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-ink/70" />
                        <span>Daylight Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
