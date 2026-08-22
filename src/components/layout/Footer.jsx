import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop Collections', path: '/shop' },
  { label: 'Our Story (About)', path: '/about' },
  { label: 'Customer Reviews', path: '/reviews' },
  { label: 'Contact & Concierge', path: '/contact' },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com',
    ariaLabel: 'Follow UrbanNest on Instagram (opens in new tab)',
  },
  {
    name: 'Pinterest / Facebook',
    icon: Facebook,
    href: 'https://facebook.com',
    ariaLabel: 'Follow UrbanNest on Facebook (opens in new tab)',
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    href: 'https://twitter.com',
    ariaLabel: 'Follow UrbanNest on Twitter / X (opens in new tab)',
  },
  {
    name: 'Email Newsletter',
    icon: Mail,
    href: '#newsletter',
    ariaLabel: 'Subscribe to UrbanNest Journal',
  },
];

/**
 * Responsive Footer Component
 */
export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  // Navigation handler for quick links
  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  /**
   * NOTE: UI only demonstration — no backend service connected for hackathon build.
   * In production, this dispatches to an email marketing service or n8n webhook workflow.
   */
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.', {
        icon: '✉️',
        style: {
          background: '#F7F5EF',
          color: '#26261F',
          border: '1px solid rgba(181, 101, 45, 0.3)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px',
        },
      });
      return;
    }

    setIsSubscribed(true);
    toast.success('Welcome to the UrbanNest Journal! (UI Demo)', {
      icon: '🌿',
      style: {
        background: '#5C6B4F',
        color: '#F7F5EF',
        border: '1px solid #45513A',
        fontFamily: 'Space Mono, monospace',
        fontSize: '12px',
      },
    });
    setEmail('');
  };

  return (
    <footer
      role="contentinfo"
      className="relative bg-cloud border-t border-ink/10 text-ink overflow-hidden pt-16 pb-12"
    >
      {/* Subtle background motif accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-moss/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-80 h-80 bg-clay/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-ink/10">
          
          {/* Column 1: Brand & Tagline (5 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-tag bg-moss flex items-center justify-center text-cloud shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-medium text-2xl text-ink tracking-tight">
                UrbanNest
              </span>
            </div>

            <p className="font-display italic text-lg text-ink/90">
              &ldquo;Little Things. Beautiful Living.&rdquo;
            </p>

            <p className="text-sm text-ink/75 font-body leading-relaxed max-w-sm">
              Thoughtfully curated artisanal ceramics, slow-living textiles, handcrafted stationery,
              and bespoke gift parcels designed to bring quiet warmth and tactile luxury into everyday spaces.
            </p>

            {/* Social Icons Hub */}
            <div className="pt-2">
              <span className="text-xs font-utility uppercase tracking-wider text-ink/60 block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.ariaLabel}
                      className="w-9 h-9 rounded-tag bg-paper border border-ink/10 flex items-center justify-center text-ink/70 hover:text-moss hover:border-moss hover:bg-cloud transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-utility font-bold uppercase tracking-widest text-ink/80">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink/75 hover:text-moss font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss rounded-tag"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/25 group-hover:bg-moss transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Store Coordinates & Hours (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-utility font-bold uppercase tracking-widest text-ink/80">
              Visit The Shop
            </h3>

            <div className="space-y-3 text-sm text-ink/80 font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-clay shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  142 Artisan Row, Mill Valley,
                  <br />
                  CA 94941, United States
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-moss shrink-0" aria-hidden="true" />
                <a
                  href="tel:+14158906378"
                  className="hover:text-moss transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss rounded-tag"
                >
                  (415) 890-NEST (6378)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brass shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@urbanneststore.com"
                  className="hover:text-moss transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss rounded-tag"
                >
                  hello@urbanneststore.com
                </a>
              </div>

              <div className="pt-2 border-t border-ink/10">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-ink/50 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-xs font-utility text-ink/75 leading-relaxed">
                    <p>Mon – Fri: 10:00 AM – 6:00 PM</p>
                    <p>Saturday: 10:00 AM – 5:00 PM</p>
                    <p>Sunday: 11:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Signup (3 cols on lg) */}
          <div id="newsletter" className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <Tag color="clay" size="sm" variant="subtle">
                Journal
              </Tag>
              <h3 className="text-xs font-utility font-bold uppercase tracking-widest text-ink/80">
                Slow Living Stories
              </h3>
            </div>

            <p className="text-xs text-ink/70 font-body leading-relaxed">
              Subscribe for seasonal craft drops, mindful interior styling notes, and private workshop invitations.
            </p>

            {/* Newsletter form — UI only (No backend connected for hackathon build) */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  aria-label="Email address for slow living newsletter"
                  className="w-full bg-paper border border-ink/15 rounded-tag py-2.5 pl-3.5 pr-24 text-xs font-utility text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss focus:border-moss transition-all"
                />
                <div className="absolute right-1">
                  <Button
                    type="submit"
                    variant="primary"
                    color="moss"
                    size="sm"
                    className="!py-1.5 !px-3 text-[11px]"
                    rightIcon={<ArrowRight className="w-3 h-3" />}
                  >
                    Join
                  </Button>
                </div>
              </div>

              {isSubscribed && (
                <p className="text-[11px] font-utility text-moss flex items-center gap-1 mt-1.5">
                  <span>✓ You&apos;re on the list! Welcome home.</span>
                </p>
              )}
            </form>

            <p className="text-[11px] text-ink/50 font-utility">
              * UI demonstration: No marketing emails will be sent.
            </p>
          </div>
        </div>

        {/* Bottom Bar & Hackathon Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-utility text-ink/65 text-center md:text-left">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} UrbanNest Lifestyle Store. Crafted for the{' '}
              <strong className="text-ink font-semibold">&ldquo;Take a Local Shop Online&rdquo;</strong> Hackathon Challenge.
            </p>
            <p className="text-[11px] text-ink/50">
              Designed with Fraunces &amp; Work Sans typography, tactile parcel surfaces &amp; accessible web standards.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                toast('Privacy Policy: Demo only', { icon: '🔒' });
              }}
              className="hover:text-moss transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-ink/20">•</span>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                toast('Terms of Service: Demo only', { icon: '📄' });
              }}
              className="hover:text-moss transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-ink/20">•</span>
            <a
              href="#accessibility"
              onClick={(e) => {
                e.preventDefault();
                toast('Accessibility: WCAG 2.1 AA Compliant', { icon: '♿' });
              }}
              className="hover:text-moss transition-colors"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
