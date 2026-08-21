import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  PackageOpen,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../../hooks';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { Recommendations } from './Recommendations';
import { cn } from '../../utils/cn';


/**
 * Format currency in Indian Rupees (₹)
 * @param {number} amount
 * @returns {string}
 */
function formatRupees(amount) {
  return `₹${(amount || 0).toLocaleString('en-IN')}`;
}

/**
 * CartDrawer Component
 *
 * Implements Step 7 slide-in cart drawer:
 * - Slide-in panel from the right with backdrop overlay
 * - Real-time item listing with quantity steppers and subtotal
 * - Tactile design language with gift-tag motifs
 * - "Submit Order Inquiry" action which pre-fills the inquiry form with itemized cart summary
 *
 * @param {Object} props
 * @param {Function} [props.onInquireOrder] - Callback invoked with pre-filled message and topic
 * @param {string} [props.className] - Additional wrapper class names
 */
export function CartDrawer({ onInquireOrder, className }) {
  const {
    items,
    totalCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  /**
   * Handle Order Inquiry Checkout Flow
   *
   * ponytail: Deliberate choice to pre-fill inquiry form with cart summary rather than faking a non-functional checkout/payment screen. Provides a UI-complete, working end-to-end workflow without dead-end mock payment gateways.
   */
  const handleSubmitOrderInquiry = () => {
    // Generate structured order message
    const itemizedList = items
      .map(
        (item) =>
          `• ${item.name} (${item.category}) — Qty: ${item.quantity} × ${formatRupees(item.price)} = ${formatRupees(
            item.price * item.quantity
          )}`
      )
      .join('\n');

    const orderSummaryMessage = `Hello UrbanNest Concierge,\n\nI would like to inquire about ordering the following pieces from my parcel:\n\n${itemizedList}\n\nEstimated Parcel Subtotal: ${formatRupees(
      subtotal
    )} (Includes complimentary gift packaging)\n\nPlease let me know piece availability, estimated dispatch timing, and custom handwritten note options.\n\nThank you!`;

    // Trigger parent callback if provided
    onInquireOrder?.({
      category: 'Order Inquiry',
      message: orderSummaryMessage,
    });

    // Close the drawer
    closeDrawer();

    // Smooth scroll to the contact inquiry form
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Attempt focus on name or email field
        const nameInput = document.getElementById('inquiry-name');
        if (nameInput) {
          nameInput.focus();
        }
      }
    }, 150);
  };

  const handleExplore = () => {
    closeDrawer();
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping parcel drawer"
          className={cn('fixed inset-0 z-50 flex justify-end', className)}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.001 : 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-In Drawer Panel */}
          <motion.div
            initial={{ x: shouldReduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%' }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 280,
              duration: shouldReduceMotion ? 0.001 : undefined,
            }}
            className="relative w-full max-w-md bg-paper border-l border-ink/15 shadow-2xl flex flex-col h-full z-10 overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-ink/10 bg-cloud flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-tag bg-moss text-cloud flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-medium text-ink">
                    Your Handcrafted Parcel
                  </h3>
                  <p className="text-xs font-utility text-ink/65">
                    {totalCount} {totalCount === 1 ? 'object' : 'objects'} selected
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close parcel drawer"
                className="p-2 rounded-tag text-ink/60 hover:text-ink hover:bg-paper border border-transparent hover:border-ink/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: Item List or Empty State */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {items.length > 0 ? (
                <div className="space-y-3.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-cloud rounded-tag border border-ink/15 shadow-xs flex items-start gap-3.5 group hover:border-ink/25 transition-all"
                    >
                      {/* Product Category Icon Thumbnail */}
                      <div className="w-12 h-12 rounded-tag bg-paper border border-ink/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
                        <span>
                          {item.category === 'Home Décor'
                            ? '🏺'
                            : item.category === 'Gifts'
                            ? '🎁'
                            : item.category === 'Stationery'
                            ? '✉️'
                            : '🌿'}
                        </span>
                      </div>

                      {/* Item Details & Stepper */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-display font-medium text-ink leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-xs font-utility font-bold text-ink shrink-0">
                            {formatRupees(item.price * item.quantity)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Tag color="ink" size="sm" variant="subtle" className="text-[10px] py-0">
                            {item.category}
                          </Tag>
                          <span className="text-[11px] font-utility text-ink/50">
                            {formatRupees(item.price)} each
                          </span>
                        </div>

                        {/* Quantity Stepper & Remove Action */}
                        <div className="pt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-tag border border-ink/20 bg-paper overflow-hidden shadow-xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="px-2 py-1 text-ink/70 hover:text-ink hover:bg-cloud transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-utility font-bold text-ink select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="px-2 py-1 text-ink/70 hover:text-ink hover:bg-cloud transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from parcel`}
                            className="p-1.5 text-ink/40 hover:text-clay transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Step 16: AI Content-Based Recommendations in Drawer */}
                  <Recommendations variant="drawer" />
                </div>
              ) : (

                /* Empty Cart State */
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cloud border border-ink/15 flex items-center justify-center mx-auto text-clay shadow-inner">
                    <PackageOpen className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-medium text-lg text-ink">
                      Your parcel is empty
                    </h4>
                    <p className="text-xs font-utility text-ink/60 max-w-xs mx-auto">
                      Explore our small-batch ceramics, pure linens, and botanical candles to start your parcel.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      color="moss"
                      size="sm"
                      onClick={handleExplore}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Explore Curated Goods
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Summary & Order Inquiry CTA */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-ink/10 bg-cloud space-y-4">
                {/* Subtotal Breakdown */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-utility text-ink/70">
                    <span>Estimated Subtotal</span>
                    <span className="text-sm font-utility font-bold text-ink">
                      {formatRupees(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-utility text-moss-dark">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-moss" />
                      Plastic-Free Packaging
                    </span>
                    <span>Complimentary</span>
                  </div>
                </div>

                {/* Primary CTA: Submit Order Inquiry */}
                <Button
                  variant="primary"
                  color="moss"
                  size="md"
                  className="w-full justify-center shadow-md hover:shadow-lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleSubmitOrderInquiry}
                >
                  Submit Order Inquiry
                </Button>

                {/* Clear Parcel Secondary Action */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] font-utility text-ink/50 hover:text-clay underline decoration-ink/20 hover:decoration-clay cursor-pointer transition-colors"
                  >
                    Clear parcel items
                  </button>

                  <span className="text-[10px] font-utility text-ink/50 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-brass" />
                    Direct artisan dispatch
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
