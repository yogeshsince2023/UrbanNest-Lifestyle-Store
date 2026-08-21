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
 *
 * Implements Step 8 requirements:
 * - Slim promotional banner styled as a large gift tag in the Clay accent
 * - One clear merchandising offer ("15% off Stationery this week")
 * - Direct CTA button scrolling to the relevant shop category
 * - Compact and authentic boutique studio feel
 *
 * @param {Object} props
 * @param {Function} [props.onClaimOffer] - Callback when user clicks CTA, receives category name
 * @param {string} [props.className] - Additional wrapper class names
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
          fontSize: '12px',
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
      className={cn('relative max-w-7xl mx-auto w-full my-2', className)}
    >
      {/* Large Gift-Tag Styled Banner Container in Clay Accent */}
      <div className="relative rounded-parcel bg-clay text-cloud p-5 sm:p-6 lg:p-7 border border-clay-dark shadow-parcel overflow-hidden">
        
        {/* Subtle Craft Paper Texture Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(var(--color-cloud)_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"
        />

        {/* Signature Left Punched Tag Eyelet with Twine Accent */}
        <div
          aria-hidden="true"
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-paper border-2 border-clay-dark items-center justify-center shadow-inner z-10"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-clay-dark" />
        </div>

        {/* Decorative Watermark Stamp (Right Side) */}
        <div
          aria-hidden="true"
          className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-2 border-dashed border-cloud/15 pointer-events-none select-none opacity-40 rotate-12 flex items-center justify-center font-utility text-[10px] uppercase tracking-widest text-cloud"
        >
          <span className="text-center">Seasonal • Special</span>
        </div>

        {/* Main Content Layout: Headline & Details (Left) + Actions (Right) */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          
          {/* Left / Center Info Block */}
          <div className="space-y-2.5 max-w-2xl sm:pl-2">
            <div className="flex flex-wrap items-center gap-2">
              <Tag
                color="paper"
                size="sm"
                variant="solid"
                shape="pill"
                hasHole={false}
                leftIcon={<Sparkles className="w-3 h-3 text-clay-dark" />}
                className="text-clay-dark font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 shadow-xs"
              >
                Limited Studio Spotlight
              </Tag>

              <span className="text-xs font-utility text-cloud/80 hidden sm:inline">
                Valid through this Sunday
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-medium text-cloud tracking-tight leading-snug">
              15% off Handcrafted Stationery <span className="italic font-serif opacity-90">this week.</span>
            </h3>

            <p className="text-xs sm:text-sm font-body text-cloud/90 leading-relaxed max-w-xl">
              Celebrate the tactile beauty of slow paper. Enjoy 15% off hand-bound cotton journals, deckle-edge letterpress cards, and turned dip pens.
            </p>
          </div>

          {/* Right Action Block: Promo Code Pill + CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 sm:pl-2 lg:pl-0">
            
            {/* Promo Code Copy Pill */}
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label={`Copy coupon code ${PROMO_CODE}`}
              className="inline-flex items-center justify-between sm:justify-center gap-2.5 px-3.5 py-2.5 rounded-tag bg-clay-dark/60 hover:bg-clay-dark/90 text-cloud border border-cloud/20 text-xs font-utility transition-all duration-200 cursor-pointer shadow-xs group"
            >
              <div className="flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-cloud/75" />
                <span className="font-bold tracking-widest text-cloud font-mono">
                  {PROMO_CODE}
                </span>
              </div>

              <span className="text-[10px] text-cloud/70 group-hover:text-cloud flex items-center gap-1 border-l border-cloud/20 pl-2">
                {hasCopied ? (
                  <>
                    <Check className="w-3 h-3 text-cloud" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-cloud/70 group-hover:text-cloud" />
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
              size="md"
              onClick={handleClaim}
              rightIcon={<ArrowRight className="w-3.5 h-3.5 text-ink" />}
              className="text-ink font-semibold shadow-md hover:shadow-lg justify-center hover:bg-cloud"
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
