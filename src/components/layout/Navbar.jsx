import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({ cartCount = 0, onCartClick, onAskClick, onThemeToggle }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

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

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    if (onThemeToggle) onThemeToggle(!isDark);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 bg-[var(--color-paper)]/95 backdrop-blur-md border-b border-[var(--color-ink)]/15',
          isScrolled
            ? 'py-4 shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
            : 'py-5 shadow-xs'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <div className="flex-shrink-0 z-50">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                aria-label="UrbanNest Home"
              >
                <span className="font-display font-medium text-3xl sm:text-4xl tracking-tighter text-ink transition-transform group-hover:scale-95 origin-left">
                  Urban<span className="text-[var(--color-gold)]">·</span>Nest
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={cn(
                      'text-base lg:text-lg uppercase tracking-[0.16em] font-utility transition-all duration-300 relative py-2',
                      isActive
                        ? 'opacity-100 text-ink font-bold'
                        : 'opacity-70 hover:opacity-100 text-ink font-medium'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-gold)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Utility Actions */}
            <div className="flex items-center gap-4 z-50">
              <button
                onClick={handleToggleTheme}
                className="w-12 h-12 flex items-center justify-center rounded-none text-ink hover:bg-[var(--color-ink)]/10 transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] cursor-pointer"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Sun className="w-6 h-6 text-[var(--color-gold)]" />
                    ) : (
                      <Moon className="w-6 h-6 text-ink" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>

              <button
                onClick={onCartClick}
                className="w-12 h-12 relative flex items-center justify-center rounded-none text-ink hover:bg-[var(--color-ink)]/10 transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-6 h-6 text-ink" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[var(--color-gold)] shadow-sm"
                    />
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden w-12 h-12 flex items-center justify-center text-ink cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#162518] dark:bg-[#0E1A0F] pt-28 px-8 md:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-[#F0EBE0] hover:text-[var(--color-gold)] transition-colors uppercase"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div>
              <Button
                variant="primary"
                color="ink"
                size="lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onAskClick) onAskClick();
                }}
                className="w-full text-base py-4 bg-[var(--color-gold)] text-[#1C2B1E] font-bold"
              >
                Inquire
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
