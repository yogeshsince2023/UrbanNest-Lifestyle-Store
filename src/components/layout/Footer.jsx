import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Heart } from 'lucide-react';
import { getFadeUpVariants, DEFAULT_VIEWPORT } from '../../utils/motion';

const SHOP_LINKS = [
  { label: 'Ceramics', href: '/shop' },
  { label: 'Linens', href: '/shop' },
  { label: 'Candles', href: '/shop' },
  { label: 'Stationery', href: '/shop' },
  { label: 'Gift Parcels', href: '/shop' },
  { label: 'New Arrivals', href: '/shop' },
];

const STUDIO_LINKS = [
  { label: 'Our Story', href: '/about' },
  { label: 'Our Makers', href: '/about' },
  { label: 'Sustainability', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-[#162518] dark:bg-[#0A140B] text-[#F0EBE0] mt-24 border-t border-[#F0EBE0]/15">
      {/* Top Section - 4 Columns */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        variants={getFadeUpVariants(false)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14"
      >
        {/* Column 1: Brand */}
        <div className="space-y-5">
          <span className="font-display text-4xl font-light text-[#F0EBE0]">
            Urban<span className="text-[var(--color-gold)]">·</span>Nest
          </span>
          <p className="font-body text-base sm:text-lg text-[#F0EBE0]/85 leading-relaxed">
            Handcrafted with intention. Slow living goods designed to bring quiet warmth into everyday spaces.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 border border-[#F0EBE0]/30 flex items-center justify-center text-[#F0EBE0] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all duration-200 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-11 h-11 border border-[#F0EBE0]/30 flex items-center justify-center text-[#F0EBE0] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all duration-200 cursor-pointer"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h4 className="font-utility text-sm uppercase tracking-[0.2em] text-[var(--color-gold)] mb-6 font-bold">
            Shop Collections
          </h4>
          <ul className="space-y-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-body text-base sm:text-lg text-[#F0EBE0]/85 hover:text-[#F0EBE0] hover:text-[var(--color-gold)] hover:translate-x-1.5 transition-all duration-200 inline-block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Studio Links */}
        <div>
          <h4 className="font-utility text-sm uppercase tracking-[0.2em] text-[var(--color-gold)] mb-6 font-bold">
            Studio Journal
          </h4>
          <ul className="space-y-3">
            {STUDIO_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-body text-base sm:text-lg text-[#F0EBE0]/85 hover:text-[#F0EBE0] hover:text-[var(--color-gold)] hover:translate-x-1.5 transition-all duration-200 inline-block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="font-display text-3xl font-light italic text-[#F0EBE0]">
            Stay close.
          </h4>
          <p className="font-body text-base text-[#F0EBE0]/85 leading-relaxed">
            New arrivals, maker stories, and quiet invitations sent to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="space-y-3 pt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-[#F0EBE0]/10 border border-[#F0EBE0]/30 text-[#F0EBE0] placeholder:text-[#F0EBE0]/50 font-body text-base px-4 py-3.5 outline-none focus:border-[var(--color-gold)] transition-colors duration-200"
            />
            <button
              type="submit"
              className="w-full bg-[var(--color-gold)] text-[#1C2B1E] font-utility text-sm uppercase tracking-[0.16em] py-4 hover:bg-[var(--color-gold-light)] transition-colors duration-200 cursor-pointer font-bold shadow-sm"
            >
              {submitted ? 'Thank you ✓' : 'Subscribe to Journal'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F0EBE0]/15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-5">
        <p className="font-utility text-sm text-[#F0EBE0]/75 tracking-wider">
          © 2026 UrbanNest Lifestyle Studio LLC. All rights reserved.
        </p>
        <p className="font-utility text-sm text-[#F0EBE0]/75 tracking-wider flex items-center gap-1.5">
          Made with{' '}
          <Heart
            className="w-4 h-4 text-[var(--color-rose)]"
            fill="currentColor"
          />{' '}
          for slow living
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Shipping & Returns'].map((item) => (
            <a
              key={item}
              href="#"
              className="font-utility text-sm text-[#F0EBE0]/75 hover:text-[#F0EBE0] tracking-wider transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
