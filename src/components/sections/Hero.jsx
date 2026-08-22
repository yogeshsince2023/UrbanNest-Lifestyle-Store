import { useState } from 'react';
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
 * Curated signature showcase items for the interactive hero visual
 */
const HERO_SHOWCASE_ITEMS = [
  {
    id: 'prod-01',
    name: 'Hand-Pinched Stoneware Pitcher',
    category: 'Ceramics & Living',
    tag: 'Master Potter Batch',
    tagColor: 'clay',
    price: '₹1,850',
    origin: 'Wood-fired for 48h • Devon Clay',
    image: '/assets/images/products/stoneware-pitcher.jpg',
    badge: 'Limited Run № 01',
  },
  {
    id: 'prod-02',
    name: 'Washed Normandy Linen Throw',
    category: 'Slow Textiles',
    tag: 'Organic Flax',
    tagColor: 'moss',
    price: '₹2,400',
    origin: 'Hand-dyed with botanical indigo',
    image: '/assets/images/products/linen-throw.jpg',
    badge: 'Heirloom Curation',
  },
  {
    id: 'prod-05',
    name: 'Wild Moss & Cedar Botanical Candle',
    category: 'Artisan Apothecary',
    tag: 'Pure Beeswax',
    tagColor: 'brass',
    price: '₹850',
    origin: 'Infused with Big Sur cedarwood',
    image: '/assets/images/products/botanical-candle.jpg',
    badge: 'Seasonal Harvest',
  },
  {
    id: 'prod-04',
    name: 'Hand-Carved Olive Wood Bowl',
    category: 'Handcrafted Wood',
    tag: 'Ancient Olive',
    tagColor: 'clay',
    price: '₹1,250',
    origin: 'Conditioned with walnut oil',
    image: '/assets/images/products/olive-bowl.jpg',
    badge: 'Natural Grain',
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedShowcase = HERO_SHOWCASE_ITEMS[selectedIndex] || HERO_SHOWCASE_ITEMS[0];

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

          {/* Right Column: Tactile Curated Artisan Masterpiece Showcase */}
          <motion.div
            variants={visualVariants}
            className="lg:col-span-5 relative flex items-center justify-center pt-2 lg:pt-0"
          >
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-md lg:max-w-none rounded-parcel bg-cloud/90 border border-ink/15 shadow-parcel hover:shadow-parcel-hover transition-all duration-300 p-4 sm:p-5 overflow-hidden group">
              
              {/* Subtle Textured Background Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none"
              />

              {/* Main Featured Photo Area */}
              <div className="relative w-full aspect-4/3 sm:aspect-16/11 rounded-parcel overflow-hidden bg-paper/60 border border-ink/10 mb-4 shadow-inner">
                <picture>
                  <source
                    srcSet={selectedShowcase.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                    type="image/webp"
                  />
                  <img
                    src={selectedShowcase.image}
                    alt={selectedShowcase.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>

                {/* Top-Left Category & Signature Tag */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <Tag
                    color={selectedShowcase.tagColor}
                    size="sm"
                    variant="solid"
                    shape="tag"
                    hasHole={true}
                    className="text-[10px] py-0.5 tracking-wide shadow-sm"
                  >
                    {selectedShowcase.tag}
                  </Tag>
                </div>

                {/* Top-Right Price Label in Space Mono */}
                <div className="absolute top-3 right-3 z-10">
                  <Tag
                    color="paper"
                    size="sm"
                    variant="solid"
                    shape="pill"
                    hasHole={false}
                    className="font-utility font-bold text-ink text-xs border border-ink/20 shadow-sm px-2.5 py-0.5"
                  >
                    {selectedShowcase.price}
                  </Tag>
                </div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-3 left-3 right-3 z-10 bg-cloud/90 backdrop-blur-md px-3 py-2 rounded-tag border border-ink/15 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-display font-medium text-xs sm:text-sm text-ink truncate leading-tight">
                      {selectedShowcase.name}
                    </h3>
                    <p className="text-[10px] font-utility text-ink/65 truncate mt-0.5">
                      {selectedShowcase.origin}
                    </p>
                  </div>
                  <span className="text-[10px] font-utility text-brass-dark font-semibold shrink-0 bg-brass/15 px-1.5 py-0.5 rounded border border-brass/25">
                    {selectedShowcase.badge}
                  </span>
                </div>
              </div>

              {/* Interactive Thumbnail Selector Tray */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[11px] font-utility text-ink/60 mb-2 px-0.5">
                  <span className="uppercase tracking-wider">Curated Wares</span>
                  <span className="text-[10px] italic">Tap to preview</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {HERO_SHOWCASE_ITEMS.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedIndex(idx)}
                        className={cn(
                          'relative aspect-square rounded-tag overflow-hidden border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss',
                          isSelected
                            ? 'border-moss ring-2 ring-moss/30 scale-100 shadow-sm'
                            : 'border-ink/15 opacity-70 hover:opacity-100 hover:border-ink/40'
                        )}
                        aria-label={`Preview ${item.name}`}
                      >
                        <picture>
                          <source
                            srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                            type="image/webp"
                          />
                          <img
                            src={item.image}
                            alt=""
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </picture>
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-moss border border-cloud"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
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
