import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Hammer,
  Package,
  Calendar,
  Layers,
  Users,
  Feather,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

/**
 * Gift-tag styled statistics counters configuration
 */
const BRAND_STATS = [
  {
    id: 'years',
    value: '5+',
    unit: 'Years',
    label: 'On Artisan Row',
    detail: 'Est. 2019 • Mill Valley Studio',
    color: 'moss',
    icon: Calendar,
    shape: 'tag',
  },
  {
    id: 'products',
    value: '180+',
    unit: 'Objects',
    label: 'Curated Goods',
    detail: 'Tested for heirloom longevity',
    color: 'clay',
    icon: Layers,
    shape: 'tag',
  },
  {
    id: 'makers',
    value: '34',
    unit: 'Artisans',
    label: 'Guild Partners',
    detail: 'Independent local studios',
    color: 'brass',
    icon: Users,
    shape: 'tag',
  },
  {
    id: 'sustainable',
    value: '100%',
    unit: 'Eco',
    label: 'Plastic-Free',
    detail: 'Recycled kraft & cotton twine',
    color: 'ink',
    icon: Package,
    shape: 'tag',
  },
];

/**
 * Artisan values comparison highlights
 */
const ARTISAN_VALUES = [
  {
    title: 'Personal Hands-On Curation',
    description: 'We meet every maker, inspect every kiln firing, and test every piece in our own home before it joins the collection.',
  },
  {
    title: 'Small Batch & Zero Mass-Churn',
    description: 'Never mass-manufactured in anonymous warehouses. Each piece reflects human touch, subtle grain, and natural character.',
  },
  {
    title: 'Conscious Heirloom Quality',
    description: 'Objects built to outlive fast-trend disposal — durable stoneware, pure washed linen, and lead-free non-toxic glazes.',
  },
];

/**
 * Brand story and studio philosophy:
 * - Narrative on slow living and small-batch craftsmanship
 * - Overview of home décor, ceramics, linens, and apothecary
 * - Tactile brand statistics and artisan maker highlights
 *
 * @param {Object} props
 * @param {Function} [props.onExploreClick] - Optional explore products handler
 * @param {Function} [props.onContactClick] - Optional contact/inquiry handler
 * @param {string} [props.className] - Additional class names
 */
export function AboutShop({ onExploreClick, onContactClick, className }) {
  const shouldReduceMotion = useReducedMotion();

  // Scroll reveal animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
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
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.001 : 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  return (
    <section
      id="about"
      aria-label="About UrbanNest and Brand Story"
      className={cn('relative scroll-mt-24 pt-6 sm:pt-10 pb-12 sm:pb-16 border-t border-ink/10', className)}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '-40px' }}
        className="space-y-12 sm:space-y-16"
      >
        {/* Main Two-Column Layout: Visual Showcase + Brand Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: TACTILE ARTISAN STUDIO VIGNETTE & FOUNDER ARTIFACTS */}
          {/* ========================================================================= */}
          <motion.div
            variants={visualVariants}
            className="lg:col-span-5 relative flex items-center justify-center order-2 lg:order-1"
          >
            {/* Visual Container Canvas */}
            <div className="relative w-full max-w-lg lg:max-w-none p-5 sm:p-7 rounded-parcel bg-cloud/80 border border-ink/15 shadow-parcel overflow-hidden">
              
              {/* Subtle Textured Background Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.04] pointer-events-none"
              />

              {/* Decorative Wax Seal / Guild Stamp Motif (Top-Right) */}
              <div
                aria-hidden="true"
                className="absolute top-4 right-4 z-10 pointer-events-none select-none rotate-3 opacity-80"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-brass/50 bg-brass/10 flex flex-col items-center justify-center text-center p-1.5 shadow-inner">
                  <Feather className="w-4 h-4 text-brass-dark mb-0.5" />
                  <span className="text-[7px] sm:text-[8px] uppercase tracking-widest font-utility text-brass-dark font-bold">
                    SLOW CRAFT
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-utility text-ink/60">EST. 2019</span>
                </div>
              </div>

              {/* Layered Composition of Artisan Vignette Cards */}
              <div className="relative space-y-4 pt-2">
                
                {/* Primary Card: Founder Philosophy Vignette */}
                <div className="relative bg-paper/95 rounded-parcel border border-ink/15 p-5 sm:p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-moss/15 text-moss-dark flex items-center justify-center font-display font-semibold text-sm border border-moss/20">
                      UN
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-ink text-base">
                        The UrbanNest Atelier
                      </h4>
                      <p className="text-xs font-utility text-ink/60">
                        Mill Valley, California • Artisan Row
                      </p>
                    </div>
                  </div>

                  <blockquote className="font-display italic text-ink/85 text-sm sm:text-base leading-relaxed border-l-2 border-moss pl-3.5 my-3">
                    &ldquo;We believe the simplest daily rituals — pouring morning coffee from a textured pitcher or lighting a pine needle candle at dusk — deserve objects made with reverence and soul.&rdquo;
                  </blockquote>

                  <div className="pt-3 mt-3 border-t border-ink/10 flex items-center justify-between text-xs font-utility text-ink/70">
                    <span className="flex items-center gap-1.5 text-moss-dark font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-moss/30 text-moss" />
                      Founder Curated
                    </span>
                    <span className="text-ink/50 text-[11px]">№ 01 • Manifesto</span>
                  </div>
                </div>

                {/* Secondary Offset Card: Workshop & Guild Guildmark */}
                <div className="relative bg-cloud rounded-tag border border-ink/15 p-4 shadow-sm flex items-start gap-3.5 transform -rotate-1 hover:rotate-0 transition-transform duration-200">
                  <div className="w-9 h-9 rounded-tag bg-clay/15 text-clay-dark flex items-center justify-center shrink-0 border border-clay/25">
                    <Hammer className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-utility font-bold text-ink uppercase tracking-wider">
                        Independent Guild Guildmark
                      </span>
                      <span className="text-[10px] font-utility bg-clay/15 text-clay-dark px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-ink/75 font-body mt-1 leading-snug">
                      Direct partnership with 34 master potters, weavers, candle pourers, and wood turners.
                    </p>
                  </div>
                </div>

                {/* Tertiary Card: 100% Eco Packaging Promise */}
                <div className="bg-moss/10 rounded-tag border border-moss/20 p-3.5 flex items-center justify-between text-xs font-utility text-moss-dark">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-moss" />
                    <span>Plastic-Free Parcels &amp; Pure Botanical Inks</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-moss/20 px-2 py-0.5 rounded">
                    Zero Waste
                  </span>
                </div>
              </div>

              {/* Decorative Studio Coordinate Footer */}
              <div className="mt-5 pt-3 border-t border-dashed border-ink/15 flex items-center justify-between text-[11px] font-utility text-ink/55">
                <span>Coordinates: 37.9060° N, 122.5450° W</span>
                <span>Open for visits</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: BRAND STORY NARRATIVE & GIFT-TAG STAT COUNTERS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7 order-1 lg:order-2">
            
            {/* 1. Eyebrow Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <Tag
                color="moss"
                size="md"
                variant="solid"
                shape="tag"
                hasHole={true}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-cloud/90" aria-hidden="true" />}
                className="shadow-sm tracking-widest text-[11px] sm:text-xs"
              >
                Our Story &amp; Philosophy
              </Tag>
            </motion.div>

            {/* 2. Editorial Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink tracking-tight leading-[1.12] text-balance">
                Objects with Intention, <br />
                <span className="italic font-serif text-moss">Crafted for Slow Living.</span>
              </h2>
            </motion.div>

            {/* 3. Founder-Style Narrative on Why UrbanNest Exists */}
            <motion.div variants={itemVariants} className="space-y-4 text-ink/85 font-body text-base sm:text-lg leading-relaxed">
              <p>
                UrbanNest was born out of a quiet frustration with fast-churn mass retail and a deep belief that the everyday objects we live with should bring calm, tactile joy to our homes. Founded in 2019 along Mill Valley&apos;s Artisan Row, our shop is a curated sanctuary for those who value quiet beauty, honest materials, and unhurried craftsmanship.
              </p>
              
              {/* Product Range Woven Naturally into the Narrative */}
              <p className="text-sm sm:text-base text-ink/80">
                Every piece in our catalog — from hand-thrown stoneware ceramics and pure washed linen textiles to botanical apothecary candles, tactile cotton-rag stationery, and mindful culinary accessories — is chosen because it turns simple daily routines into restorative rituals.
              </p>

              {/* What Separates UrbanNest from Big Retail Chains */}
              <div className="p-4 sm:p-5 bg-cloud/90 rounded-tag border border-ink/15 space-y-3">
                <div className="text-xs font-utility uppercase tracking-wider text-moss-dark font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-moss" />
                  Why Customers Choose Our Independent Atelier
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {ARTISAN_VALUES.map((val, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-display font-semibold text-xs sm:text-sm text-ink">
                        {val.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs font-body text-ink/70 leading-normal">
                        {val.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 4. Stat Counters Styled as Signature Gift-Tags */}
            <motion.div variants={itemVariants} className="w-full space-y-3 pt-2">
              <div className="text-xs font-utility uppercase tracking-wider text-ink/60">
                Studio Milestones &amp; Craft Metrics
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {BRAND_STATS.map((stat) => {
                  const IconComp = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className={cn(
                        'relative p-3.5 sm:p-4 rounded-tag border transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between',
                        stat.color === 'moss' && 'bg-moss/10 border-moss/30 text-moss-dark',
                        stat.color === 'clay' && 'bg-clay/10 border-clay/30 text-clay-dark',
                        stat.color === 'brass' && 'bg-brass/15 border-brass/35 text-brass-dark',
                        stat.color === 'ink' && 'bg-ink/5 border-ink/20 text-ink'
                      )}
                    >
                      {/* Signature Tag Eyelet Motif on Top-Left */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-paper border border-current shadow-inner" />
                        <IconComp className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                      </div>

                      {/* Stat Big Number & Unit */}
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-utility font-bold text-ink tracking-tight">
                            {stat.value}
                          </span>
                        </div>
                        
                        <div className="font-display font-medium text-xs sm:text-sm text-ink leading-tight mt-0.5">
                          {stat.label}
                        </div>

                        <div className="text-[10px] font-utility opacity-75 mt-1 leading-tight line-clamp-2">
                          {stat.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* 5. Action Buttons & Navigation Handlers */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2"
            >
              <Button
                variant="primary"
                color="moss"
                size="md"
                href="#shop"
                onClick={onExploreClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="justify-center shadow-sm"
              >
                Explore the Collection
              </Button>

              <Button
                variant="secondary"
                color="ink"
                size="md"
                href="#contact"
                onClick={onContactClick}
                className="justify-center"
              >
                Inquire with Concierge
              </Button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutShop;
