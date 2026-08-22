import { useState, useCallback } from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
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
 *
 * Implements Step 7 product card:
 * - Image media with category motif
 * - Name in Fraunces display typography
 * - Short description
 * - Price in Space Mono styled as a Tag price label
 * - Category label with Tag primitive
 * - Add to Cart / Parcel button with instant visual feedback
 * - Hover: Lift + corner-peel motion system
 *
 * @param {Object} props
 * @param {Object} props.product - Product data object
 * @param {Function} [props.onAddToCart] - Callback when product is added to cart
 * @param {string} [props.className] - Additional wrapper class names
 */
export function ProductCard({ product, onAddToCart, className }) {
  const [isJustAdded, setIsJustAdded] = useState(false);

  const catStyle = CATEGORY_MAP[product.category] || {
    color: 'moss',
    icon: '📦',
    subtext: product.category,
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setIsJustAdded(true);
    onAddToCart?.(product);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1200);
  };

  const [imgFailed, setImgFailed] = useState(false);
  const handleImgError = useCallback(() => setImgFailed(true), []);

  return (
    <Card
      padding="none"
      interactive={true}
      className={cn(
        'group relative flex flex-col w-full h-full bg-cloud/90 border border-ink/15 overflow-hidden transition-all duration-300',
        'hover:-translate-y-1.5 hover:shadow-parcel-hover',
        className
      )}
    >
      {/* Signature Corner-Peel Accent Motif (Top Right Fold) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-20 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-8 h-8 bg-paper transform rotate-45 translate-x-4 -translate-y-4 border-l border-b border-ink/15 shadow-peel group-hover:w-10 group-hover:h-10 transition-all duration-300" />
      </div>

      {/* Media / Tactile Product Visual Area */}
      <CardMedia className="h-48 bg-paper/60 border-b border-ink/10 relative overflow-hidden select-none">
        {product.image && !imgFailed ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={handleImgError}
          />
        ) : (
          /* Emoji fallback for missing images */
          <div className="w-full h-full flex items-center justify-center p-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.035] pointer-events-none"
            />
            <div className="w-20 h-20 rounded-full bg-cloud/90 border border-ink/15 flex items-center justify-center text-3xl shadow-inner transform group-hover:scale-108 transition-transform duration-300">
              <span>{catStyle.icon}</span>
            </div>
          </div>
        )}

        {/* Top-Left Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <Tag
            color={catStyle.color}
            size="sm"
            variant="solid"
            shape="tag"
            hasHole={true}
            className="text-[10px] py-0.5 tracking-wide shadow-xs"
          >
            {product.category}
          </Tag>
        </div>

        {/* Top-Right Price Label in Space Mono */}
        <div className="absolute top-3 right-5 z-10">
          <Tag
            color="paper"
            size="sm"
            variant="solid"
            shape="pill"
            hasHole={false}
            className="font-utility font-bold text-ink text-xs border border-ink/20 shadow-xs px-2 py-0.5"
          >
            {formatRupees(product.price)}
          </Tag>
        </div>

        {/* Featured Limited-Run Badge */}
        {product.featured && (
          <div className="absolute bottom-2 left-3 z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-utility font-semibold text-brass-dark bg-brass/20 px-2 py-0.5 rounded-full border border-brass/30">
              <Sparkles className="w-2.5 h-2.5" />
              Featured Pick
            </span>
          </div>
        )}
      </CardMedia>

      {/* Card Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <div className="text-[11px] font-utility text-ink/55 uppercase tracking-wider mb-1">
            {catStyle.subtext}
          </div>
          <CardTitle className="text-lg leading-snug group-hover:text-moss-dark transition-colors break-words">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-1.5 text-xs sm:text-sm text-ink/75 leading-relaxed">
            {product.shortDescription}
          </CardDescription>

          {/* Keyword Recommendation Tags */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-utility text-ink/60 bg-paper/80 px-1.5 py-0.5 rounded border border-ink/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Add to Parcel / Cart Button */}
        <CardFooter className="p-0 border-0 pt-3">
          <Button
            type="button"
            variant="primary"
            color={isJustAdded ? 'moss' : 'moss'}
            size="sm"
            className={cn(
              'w-full justify-center transition-all duration-200 shadow-xs hover:shadow',
              isJustAdded && 'bg-moss-dark text-cloud'
            )}
            leftIcon={
              isJustAdded ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              )
            }
            onClick={handleAdd}
          >
            {isJustAdded ? 'Added to Parcel!' : 'Add to Parcel'}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductCard;
