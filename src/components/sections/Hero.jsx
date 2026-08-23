import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import {
  CRAFT_EASING,
  getFadeUpVariants,
  getWordStaggerVariants,
  WORD_VARIANT,
  getFloatVariants,
} from '../../utils/motion';

/**
 * Curated signature showcase items for the interactive hero visual
 */
const HERO_SHOWCASE_ITEMS = [
  {
    id: 'prod-01',
    name: 'Hand-Pinched Stoneware Pitcher',
    category: 'Ceramics',
    price: '₹1,850',
    image: '/assets/images/products/stoneware-pitcher.jpg',
  },
  {
    id: 'prod-02',
    name: 'Washed Normandy Linen Throw',
    category: 'Textiles',
    price: '₹2,400',
    image: '/assets/images/products/linen-throw.jpg',
  },
  {
    id: 'prod-05',
    name: 'Wild Moss & Cedar Botanical Candle',
    category: 'Apothecary',
    price: '₹850',
    image: '/assets/images/products/botanical-candle.jpg',
  },
];

const HEADLINE_WORDS = ['Where', 'every', 'object', 'tells', 'a', 'story.'];

/**
 * Hero Section Component - Split Immersive Hero
 */
export function Hero({ onExploreClick, onAskClick, className }) {
  const shouldReduceMotion = useReducedMotion();

  const mosaicItems = [
    HERO_SHOWCASE_ITEMS[0],
    HERO_SHOWCASE_ITEMS[1],
    HERO_SHOWCASE_ITEMS[2],
    HERO_SHOWCASE_ITEMS[0],
  ];

  return (
    <section
      id="home"
      aria-label="UrbanNest Editorial Hero"
      className={cn(
        'w-full grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-76px)] border-b border-[var(--color-ink)]/15 overflow-hidden',
        className
      )}
    >
      {/* LEFT PANEL (Text Side) - Always dark forest background with crisp light parchment text */}
      <div className="bg-[#162518] dark:bg-[#0A140B] text-[#F0EBE0] p-8 sm:p-12 md:p-14 lg:p-16 xl:p-20 flex flex-col justify-between min-h-[540px] lg:min-h-full">
        {/* Top Eyebrow Label */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.0001 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: CRAFT_EASING,
            }}
            className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] px-4 py-2 font-utility font-semibold"
          >
            <span>New Arrivals · Winter 2026</span>
          </motion.div>
        </div>

        {/* Center Content: Headline, Subcopy, CTAs */}
        <div className="my-auto py-8 lg:py-10 space-y-7">
          {/* Headline with word-by-word stagger */}
          <motion.h1
            variants={getWordStaggerVariants(shouldReduceMotion)}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-light leading-[1.02] text-[#F0EBE0] flex flex-wrap gap-x-4 gap-y-2"
          >
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={WORD_VARIANT(shouldReduceMotion)}
                className={cn(
                  'inline-block',
                  word.toLowerCase().includes('story') && 'font-[350] italic text-[var(--color-gold)]'
                )}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={getFadeUpVariants(shouldReduceMotion)}
            initial="hidden"
            animate="visible"
            transition={{
              duration: shouldReduceMotion ? 0.0001 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.6,
              ease: CRAFT_EASING,
            }}
            className="font-body text-base sm:text-lg text-[#F0EBE0]/85 leading-relaxed max-w-lg"
          >
            Small-batch ceramics, French linens, botanical candles — made slowly, for homes that breathe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={getFadeUpVariants(shouldReduceMotion)}
            initial="hidden"
            animate="visible"
            transition={{
              duration: shouldReduceMotion ? 0.0001 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.7,
              ease: CRAFT_EASING,
            }}
            className="flex flex-wrap gap-5 items-center pt-3"
          >
            <Button
              variant="primary"
              color="ink"
              size="lg"
              onClick={onExploreClick}
              className="bg-[var(--color-gold)] text-[#1C2B1E] hover:bg-[var(--color-gold-light)] border-0 transition-all duration-200 text-base font-bold px-8 py-4 shadow-sm"
            >
              Explore Collection
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={onAskClick}
              className="border border-[#F0EBE0]/40 text-[#F0EBE0] hover:border-[#F0EBE0] hover:bg-white/5 bg-transparent text-base px-8 py-4 font-medium"
            >
              Our Story →
            </Button>
          </motion.div>
        </div>

        {/* Bottom Stat Bar */}
        <div className="grid grid-cols-3 border-t border-[#F0EBE0]/20 pt-6 mt-8">
          <div className="pr-4 border-r border-[#F0EBE0]/20">
            <div className="font-display text-3xl sm:text-4xl font-light text-[var(--color-gold)]">
              240+
            </div>
            <div className="font-utility text-xs uppercase tracking-[0.16em] text-[#F0EBE0]/75 mt-1.5 font-medium">
              Products
            </div>
          </div>
          <div className="px-4 border-r border-[#F0EBE0]/20">
            <div className="font-display text-3xl sm:text-4xl font-light text-[var(--color-gold)]">
              18
            </div>
            <div className="font-utility text-xs uppercase tracking-[0.16em] text-[#F0EBE0]/75 mt-1.5 font-medium">
              Artisan Makers
            </div>
          </div>
          <div className="pl-4">
            <div className="font-display text-3xl sm:text-4xl font-light text-[var(--color-gold)]">
              Zero
            </div>
            <div className="font-utility text-xs uppercase tracking-[0.16em] text-[#F0EBE0]/75 mt-1.5 font-medium">
              Synthetics
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (Mosaic Side) */}
      <div className="bg-[var(--color-cloud)] flex items-center justify-center overflow-hidden min-h-[440px] lg:min-h-full">
        <motion.div
          variants={getFloatVariants(shouldReduceMotion)}
          animate="animate"
          className="w-full h-full grid grid-cols-2 grid-rows-2 gap-px bg-[var(--color-ink)]/15"
        >
          {mosaicItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="group relative overflow-hidden aspect-[4/5] lg:aspect-auto h-full bg-[var(--color-paper)]"
            >
              <picture>
                <source
                  srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                  type="image/webp"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  loading="eager"
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                />
              </picture>

              {/* Bottom slide-up gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#162518]/90 via-[#162518]/50 to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-end pointer-events-none">
                <span className="font-display text-base italic text-[#F0EBE0] truncate">
                  {item.name}
                </span>
                <span className="font-utility text-xs font-semibold text-[var(--color-gold)] mt-1">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
