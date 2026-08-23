import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Copy, Check, Tag as TagIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { cn } from '../../utils/cn';

const PROMO_CODE = 'SLOWSTUDIO15';

/**
 * Offers Component — Slim Promotional Gift-Tag Banner
 */
export function Offers({ onClaimOffer, className }) {
  const [hasCopied, setHasCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyCode = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(PROMO_CODE);
      setHasCopied(true);
      toast.success(`Promo code "${PROMO_CODE}" copied to clipboard!`, {
        icon: '🏷️',
        style: {
          background: '#B5652D',
          color: '#F7F5EF',
          border: '1px solid #964F20',
          fontFamily: 'Space Mono, monospace',
          fontSize: '13px',
        },
      });
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      toast.success(`Use code ${PROMO_CODE} at inquiry!`);
    }
  };

  const handleClaim = () => {
    onClaimOffer?.('Stationery');

    const shopElement = document.getElementById('shop');
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.aside
      aria-label="Current Promotional Offer"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: shouldReduceMotion ? 0.001 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative max-w-7xl mx-auto w-full my-6', className)}
    >
      {/* Large Gift-Tag Styled Banner Container in Clay Accent */}
      <div className="relative rounded-parcel bg-[#B5652D] dark:bg-[#783618] text-[#F0EBE0] p-7 sm:p-8 lg:p-10 border border-[#964F20] dark:border-[#964F20] shadow-parcel overflow-hidden">
        
        {/* Subtle Craft Paper Texture Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#F0EBE0_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"
        />

        {/* Signature Left Punched Tag Eyelet with Twine Accent */}
        <div
          aria-hidden="true"
          className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-paper)] border-2 border-[#964F20] items-center justify-center shadow-inner z-10"
        >
          <div className="w-3 h-3 rounded-full bg-[#964F20]" />
        </div>

        {/* Main Content Layout: Headline & Details (Left) + Actions (Right) */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          
          {/* Left / Center Info Block */}
          <div className="space-y-3.5 max-w-2xl sm:pl-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#783618] font-bold text-xs tracking-wider uppercase px-3 py-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Studio Spotlight
              </span>

              <span className="text-sm font-utility text-[#F0EBE0]/90 hidden sm:inline font-medium">
                Valid through this Sunday
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#F0EBE0] tracking-tight leading-tight">
              15% off Handcrafted Stationery <span className="italic font-serif opacity-95">this week.</span>
            </h3>

            <p className="text-sm sm:text-base font-body text-[#F0EBE0]/90 leading-relaxed max-w-xl">
              Celebrate the tactile beauty of slow paper. Enjoy 15% off hand-bound cotton journals, deckle-edge letterpress cards, and turned dip pens.
            </p>
          </div>

          {/* Right Action Block: Promo Code Pill + CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 sm:pl-3 lg:pl-0">
            {/* Promo Code Copy Pill */}
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label={`Copy coupon code ${PROMO_CODE}`}
              className="inline-flex items-center justify-between sm:justify-center gap-3 px-4 py-3 rounded-tag bg-black/25 hover:bg-black/35 text-[#F0EBE0] border border-[#F0EBE0]/30 text-sm font-utility transition-all duration-200 cursor-pointer shadow-xs group"
            >
              <div className="flex items-center gap-2">
                <TagIcon className="w-4 h-4 text-[#F0EBE0] opacity-90" />
                <span className="font-bold tracking-widest text-[#F0EBE0] font-mono">
                  {PROMO_CODE}
                </span>
              </div>

              <span className="text-xs text-[#F0EBE0]/90 group-hover:text-[#F0EBE0] flex items-center gap-1.5 border-l border-[#F0EBE0]/30 pl-2.5 font-medium">
                {hasCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#F0EBE0]/90" />
                    Copy
                  </>
                )}
              </span>
            </button>

            {/* Primary Action Button */}
            <Button
              type="button"
              variant="primary"
              color="paper"
              size="lg"
              onClick={handleClaim}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#1C2B1E]" />}
              className="bg-[#F0EBE0] text-[#1C2B1E] font-bold shadow-md hover:shadow-lg justify-center hover:bg-white text-base px-7 py-3.5"
            >
              Shop Stationery
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default Offers;
