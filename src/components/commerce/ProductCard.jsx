import { useState, useCallback } from 'react';
import { ShoppingBag, Check, Sparkles, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardMedia,
} from '../ui/Card';
import { cn } from '../../utils/cn';
import { getTiltVariants, getSlideUpVariants } from '../../utils/motion';

/**
 * Visual styling configuration for product categories
 */
const CATEGORY_MAP = {
  'Home Décor': { color: 'clay', icon: '🏺', subtext: 'Ceramics & Living' },
  'Gifts': { color: 'moss', icon: '🎁', subtext: 'Curated Keepsakes' },
  'Stationery': { color: 'brass', icon: '✉️', subtext: 'Paper & Desk' },
  'Lifestyle Accessories': { color: 'clay', icon: '🌿', subtext: 'Everyday Wares' },
};

/**
 * Format currency in Indian Rupees (₹)
 * @param {number} amount
 * @returns {string}
 */
function formatRupees(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * ProductCard Component
 */
export function ProductCard({ product, onAddToCart, className }) {
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const tiltVariants = getTiltVariants(shouldReduceMotion);
  const slideUpVariants = getSlideUpVariants(shouldReduceMotion);

  const catStyle = CATEGORY_MAP[product.category] || {
    color: 'moss',
    icon: '📦',
    subtext: product.category,
  };

  const handleAdd = (e) => {
    e?.stopPropagation();
    setIsJustAdded(true);
    onAddToCart?.(product);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1200);
  };

  const handleImgError = useCallback(() => setImgFailed(true), []);

  return (
    <motion.div
      variants={tiltVariants}
      initial="rest"
      whileHover="hover"
      style={{
        perspective: 'var(--perspective, 1000px)',
        transformStyle: 'preserve-3d',
      }}
      className="w-full h-full"
    >
      <Card
        padding="none"
        interactive={true}
        className={cn(
          'group relative flex flex-col w-full h-full bg-[var(--color-cloud)] border border-[var(--color-ink)]/15 overflow-hidden transition-all duration-300 shadow-sm',
          className
        )}
      >
        {/* Media / Tactile Product Visual Area */}
        <CardMedia className="aspect-[3/4] bg-[var(--color-paper)] border-b border-[var(--color-ink)]/10 relative overflow-hidden select-none">
          {/* Category Tag */}
          <span className="absolute top-3 left-3 z-10 font-utility text-[11px] uppercase tracking-[0.14em] bg-[#162518]/90 text-[#F0EBE0] backdrop-blur-sm px-2.5 py-1 font-medium shadow-xs">
            {product.category}
          </span>

          {/* Featured Limited-Run Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-utility uppercase tracking-widest text-[#1C2B1E] bg-[var(--color-gold)] backdrop-blur-sm px-2.5 py-1 font-bold shadow-xs">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            </div>
          )}

          {product.image && !imgFailed ? (
            <picture>
              <source
                srcSet={product.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                type="image/webp"
              />
              <img
                src={product.image}
                alt={product.name}
                width={600}
                height={800}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={handleImgError}
              />
            </picture>
          ) : (
            /* Emoji fallback for missing images */
            <div className="w-full h-full flex items-center justify-center p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.035] pointer-events-none"
              />
              <div className="w-20 h-20 rounded-full bg-[var(--color-cloud)] border border-[var(--color-ink)]/15 flex items-center justify-center text-3xl shadow-inner transform group-hover:scale-108 transition-transform duration-300">
                <span>{catStyle.icon}</span>
              </div>
            </div>
          )}

          {/* Quick Add Bottom Overlay Bar */}
          <div
            onClick={handleAdd}
            className="absolute bottom-0 left-0 right-0 bg-[#162518]/95 dark:bg-[#0A140B]/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out py-3.5 text-center cursor-pointer z-20"
          >
            <span className="font-utility text-xs font-semibold tracking-[0.16em] uppercase text-[#F0EBE0] flex items-center justify-center gap-2">
              {isJustAdded ? (
                <>
                  <Check className="w-4 h-4 text-[var(--color-gold)]" />
                  Added to Parcel!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[var(--color-gold)]" />
                  Add to Parcel
                </>
              )}
            </span>
          </div>
        </CardMedia>

        {/* Card Content Details */}
        <div className="p-6 flex flex-col flex-1 justify-between gap-4">
          <div>
            {/* Material / Origin Line */}
            <p className="font-utility text-xs uppercase tracking-[0.14em] text-[var(--color-rose)] mb-2 font-medium">
              {catStyle.subtext}
            </p>

            <CardTitle className="font-display font-medium text-lg sm:text-xl leading-snug tracking-tight text-ink group-hover:text-[var(--color-gold)] transition-colors">
              {product.name}
            </CardTitle>

            <CardDescription className="text-sm font-body text-ink/75 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </CardDescription>
          </div>

          <div>
            <div className="pt-3 border-t border-[var(--color-ink)]/10 flex items-center justify-between">
              <Tag
                color="cloud"
                size="md"
                shape="pill"
                hasHole={false}
                className="font-utility font-bold text-sm sm:text-base px-3 py-1 tracking-wider border border-[var(--color-ink)]/15 text-ink bg-[var(--color-paper)]"
              >
                {formatRupees(product.price)}
              </Tag>

              {/* Wishlist Heart Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWished((w) => !w);
                }}
                className={cn(
                  'w-9 h-9 flex items-center justify-center border border-[var(--color-ink)]/15 transition-all duration-200 cursor-pointer',
                  isWished
                    ? 'bg-[var(--color-rose)] border-[var(--color-rose)] text-white'
                    : 'text-ink/60 hover:text-[var(--color-rose)] hover:border-[var(--color-rose)]/40'
                )}
                aria-label="Add to wishlist"
              >
                <Heart
                  className="w-4 h-4"
                  fill={isWished ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {/* Card Footer: Add to Parcel Button on Mobile */}
            <CardFooter className="p-0 mt-4 border-0 md:hidden">
              <Button
                type="button"
                variant="primary"
                color="gold"
                size="md"
                onClick={handleAdd}
                aria-label={`Add ${product.name} to cart`}
                className="w-full shadow-xs text-sm py-3 font-bold"
                hasHole={false}
                leftIcon={
                  isJustAdded ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  )
                }
              >
                {isJustAdded ? 'Added to Parcel!' : 'Add to Parcel'}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
