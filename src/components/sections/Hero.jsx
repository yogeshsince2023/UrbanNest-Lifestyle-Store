import { motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Star,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

/**
 * Trust strip statistics markers
 */
const TRUST_STATS = [
  {
    icon: Users,
    value: '500+',
    label: 'Happy Customers',
    subtext: 'Mindful homes furnished',
    color: 'moss',
  },
  {
    icon: Star,
    value: '4.9★',
    label: 'Average Rating',
    subtext: 'From verified patrons',
    color: 'brass',
  },
  {
    icon: Calendar,
    value: 'Est. 2019',
    label: 'Independent Studio',
    subtext: 'Slow-crafted with care',
    color: 'clay',
  },
];

/**
 * Curated shelf showcase items for the hero visual
 */
const SHELF_ITEMS = [
  {
    id: 'ceramic-pourer',
    category: 'Ceramics',
    title: 'Stoneware Pourer № 14',
    origin: 'Hand-thrown in Devon',
    tag: 'Small Batch',
    tagColor: 'clay',
    price: '$38.00',
    icon: '🏺',
    badge: 'Limited Run',
    offsetClass: 'top-2 -left-2 sm:-left-4',
    rotate: '-rotate-2',
  },
  {
    id: 'linen-throw',
    category: 'Textiles',
    title: 'Washed Meadow Linen',
    origin: '100% Organic Flax',
    tag: 'Pure Linen',
    tagColor: 'moss',
    price: '$64.00',
    icon: '🌿',
    badge: 'Artisan Loom',
    offsetClass: 'top-20 sm:top-24 -right-1 sm:-right-4 z-20',
    rotate: 'rotate-1',
  },
  {
    id: 'cedar-candle',
    category: 'Apothecary',
    title: 'Wild Moss & Cedar Candle',
    origin: 'Slow-poured Botanical Wax',
    tag: 'Signature Scent',
    tagColor: 'brass',
    price: '$26.00',
    icon: '🕯️',
    badge: '45h Burn',
    offsetClass: 'bottom-2 left-4 sm:left-8 z-10',
    rotate: '-rotate-1',
  },
];

/**
 * Hero Section Component
 *
 * Implements Step 4 requirements:
 * - Eyebrow tag: "Home & Lifestyle, Curated"
 * - Headline: "UrbanNest Lifestyle Store" in Fraunces display typography
 * - Tagline: "Little Things. Beautiful Living."
 * - Warm, personal 1-2 sentence description
 * - Two CTAs: Primary "Explore Products" (#shop) and Secondary "Ask Us a Question" (#contact)
 * - Curated tactile shelf visual with layered gift-tag motifs and soft shadows
 * - Trust strip with 3 fictional stats
 * - Accessible staggered animation respecting prefers-reduced-motion
 * - Fully responsive layout
 *
 * @param {Object} props
 * @param {Function} [props.onExploreClick] - Optional callback for Explore Products CTA
 * @param {Function} [props.onAskClick] - Optional callback for Ask Us CTA
 * @param {string} [props.className] - Additional wrapper class names
 */
export function Hero({ onExploreClick, onAskClick, className }) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.001 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const visualVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
      y: shouldReduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.001 : 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  const floatTransition = shouldReduceMotion
    ? {}
    : {
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      };

  return (
    <section
      id="home"
      aria-label="UrbanNest Store Introduction"
      className={cn('relative scroll-mt-24 pt-4 sm:pt-8 pb-12 sm:pb-16', className)}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12 sm:space-y-16"
      >
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Brand Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            
            {/* 1. Eyebrow Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <Tag
                color="brass"
                size="md"
                variant="solid"
                shape="tag"
                hasHole={true}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-cloud/90" aria-hidden="true" />}
                className="shadow-sm tracking-widest text-[11px] sm:text-xs"
              >
                Home &amp; Lifestyle, Curated
              </Tag>
            </motion.div>

            {/* 2. Headline & Tagline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-ink tracking-tight leading-[1.08] text-balance">
                UrbanNest Lifestyle Store
              </h1>
              
              <p className="text-2xl sm:text-3xl font-display italic font-normal text-moss tracking-tight">
                Little Things. Beautiful Living.
              </p>
            </motion.div>

            {/* 3. Warm Personal Brand Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-ink/85 font-body leading-relaxed max-w-2xl text-pretty"
            >
              Every object in our collection has a story — slow-crafted ceramics, pure washed linens,
              and tactile stationery chosen with quiet intention to bring calm, enduring beauty to
              your everyday rituals.
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2"
            >
              <Button
                variant="primary"
                color="moss"
                size="lg"
                href="#shop"
                onClick={onExploreClick}
                leftIcon={<ShoppingBag className="w-4 h-4" aria-hidden="true" />}
                rightIcon={<ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />}
                className="w-full sm:w-auto justify-center shadow-md hover:shadow-lg"
              >
                Explore Products
              </Button>

              <Button
                variant="secondary"
                color="ink"
                size="lg"
                href="#contact"
                onClick={onAskClick}
                leftIcon={<MessageCircle className="w-4 h-4" aria-hidden="true" />}
                className="w-full sm:w-auto justify-center bg-paper/60 backdrop-blur-xs hover:bg-ink hover:text-cloud"
              >
                Ask Us a Question
              </Button>
            </motion.div>

            {/* Micro-guarantee whisper */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 pt-1 text-xs font-utility text-ink/60"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-moss shrink-0" aria-hidden="true" />
              <span>Mindfully packaged with recycled kraft paper &amp; cotton twine</span>
            </motion.div>
          </div>

          {/* Right Column: Tactile Curated Shelf & Gift-Tag Arrangement Visual */}
          <motion.div
            variants={visualVariants}
            className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0"
          >
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-4/3 sm:aspect-5/4 p-4 sm:p-6 rounded-parcel bg-cloud/70 border border-ink/10 shadow-parcel overflow-hidden">
              
              {/* Subtle Textured Background Elements */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.035] pointer-events-none"
              />

              {/* Artisan Studio Stamp Motif (Top Right) */}
              <div
                aria-hidden="true"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-0 pointer-events-none opacity-40 select-none rotate-6"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-ink/30 flex flex-col items-center justify-center text-center p-1 font-utility">
                  <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-ink/60 leading-tight">Artisan</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-ink/80">CURATED</span>
                  <span className="text-[7px] sm:text-[8px] text-ink/60">№ 2019</span>
                </div>
              </div>

              {/* Wooden Shelf Baseline Indicator */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-6 right-6 h-1.5 bg-ink/15 rounded-full border-t border-ink/20 shadow-xs"
              />

              {/* Curated Floating Shelf Items with Layered Gift-Tags */}
              <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px]">
                {SHELF_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.id}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: index === 1 ? [-4, 4, -4] : index === 0 ? [3, -3, 3] : [-2, 3, -2],
                          }
                    }
                    transition={{
                      ...floatTransition,
                      delay: index * 0.8,
                    }}
                    className={cn(
                      'absolute w-[82%] sm:w-[78%] transition-transform duration-300 hover:scale-[1.02] hover:z-30',
                      item.offsetClass,
                      item.rotate
                    )}
                  >
                    {/* Item Card with Tactile Parcel Surface */}
                    <div className="bg-paper/95 backdrop-blur-xs rounded-parcel border border-ink/15 p-3.5 sm:p-4 shadow-parcel-hover hover:shadow-lg transition-shadow">
                      
                      {/* Top Header: Category & Signature Tag */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Tag
                          color={item.tagColor}
                          size="sm"
                          variant="solid"
                          shape="tag"
                          hasHole={true}
                          className="text-[10px] py-0.5"
                        >
                          {item.tag}
                        </Tag>

                        <span className="text-xs font-utility font-semibold text-ink/90 bg-cloud/90 px-2 py-0.5 rounded border border-ink/10">
                          {item.price}
                        </span>
                      </div>

                      {/* Content Row: Icon + Title + Origin */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-tag bg-cloud flex items-center justify-center text-xl shrink-0 border border-ink/10 shadow-xs">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-sm sm:text-base font-display font-medium text-ink truncate leading-tight">
                            {item.title}
                          </h2>
                          <p className="text-[11px] sm:text-xs font-utility text-ink/60 truncate mt-0.5">
                            {item.origin}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Subtle Punch Tag Accent */}
                      <div className="mt-2.5 pt-2 border-t border-ink/10 flex items-center justify-between text-[10px] font-utility text-ink/50">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-moss/70" />
                          {item.badge}
                        </span>
                        <span className="italic">UrbanNest Exclusive</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Decorative Ribbon & Needle Accent */}
              <div
                aria-hidden="true"
                className="absolute bottom-2 right-4 flex items-center gap-1 text-[10px] font-utility text-ink/40"
              >
                <Package className="w-3 h-3 text-clay/70" />
                <span>Crafted in small batches</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* Trust Strip: 3 Fictional Stats / Markers */}
        {/* ========================================================================= */}
        <motion.div
          variants={itemVariants}
          className="relative pt-2"
        >
          <div className="bg-cloud/90 backdrop-blur-xs border border-ink/15 rounded-parcel p-5 sm:p-6 shadow-parcel">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/15 gap-6 md:gap-0">
              {TRUST_STATS.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      'flex items-center gap-4',
                      idx === 0 && 'md:pr-6',
                      idx === 1 && 'pt-4 md:pt-0 md:px-6',
                      idx === 2 && 'pt-4 md:pt-0 md:pl-6'
                    )}
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-tag flex items-center justify-center shrink-0 border shadow-xs',
                        stat.color === 'moss' && 'bg-moss/10 text-moss-dark border-moss/20',
                        stat.color === 'brass' && 'bg-brass/15 text-brass-dark border-brass/25',
                        stat.color === 'clay' && 'bg-clay/10 text-clay-dark border-clay/20'
                      )}
                    >
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-utility font-bold text-ink tracking-tight">
                          {stat.value}
                        </span>
                        <span className="text-xs sm:text-sm font-display font-medium text-ink truncate">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-xs font-utility text-ink/60 truncate mt-0.5">
                        {stat.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
