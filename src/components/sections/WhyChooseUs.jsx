import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Tag as TagIcon,
  Gift,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Tag } from '../ui/Tag';
import { Card, CardBody } from '../ui/Card';
import { cn } from '../../utils/cn';

/**
 * 4 Pillars of Why Choose Us configuration
 */
const WHY_CHOOSE_PILLARS = [

  {
    id: 'quality',
    title: 'Quality Products',
    description: 'Small-batch stoneware, pure European linens, and heirloom materials built to endure.',
    icon: ShieldCheck,
    color: 'moss',
    tag: 'Heirloom Grade',
  },
  {
    id: 'pricing',
    title: 'Affordable Prices',
    description: 'Direct artisan studio partnerships eliminate middleman markups for fair, honest pricing.',
    icon: TagIcon,
    color: 'clay',
    tag: 'Direct from Guild',
  },
  {
    id: 'service',
    title: 'Personalized Service',
    description: 'Complimentary handwritten gift notes and bespoke parcel wrapping with every order.',
    icon: Gift,
    color: 'brass',
    tag: 'Custom Touch',
  },
  {
    id: 'support',
    title: 'Fast Customer Support',
    description: 'Attentive studio concierge with helpful responses typically under 2 hours.',
    icon: Clock,
    color: 'ink',
    tag: '2-Hour Reply',
  },
];

/**
 * WhyChooseUs Component
 *
 * Implements Step 9 value propositions:
 * - 4 distinct value cards (Quality Products, Affordable Prices, Personalized Service, Fast Customer Support)
 * - Lucide-react icons, short headings, one-line descriptions
 * - Responsive 1 → 2 → 4 column grid
 * - Staggered scroll-reveal animation respecting reduced motion
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional wrapper class names
 */
export function WhyChooseUs({ className }) {
  const shouldReduceMotion = useReducedMotion();

  // Staggered scroll reveal container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.001 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="why-choose-us"
      aria-label="Why Choose UrbanNest"
      className={cn('relative scroll-mt-24 space-y-10 pt-8 border-t border-ink/10', className)}
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <Tag
            color="brass"
            size="sm"
            variant="solid"
            shape="tag"
            hasHole={true}
            leftIcon={<Sparkles className="w-3 h-3 text-cloud" />}
          >
            The UrbanNest Promise
          </Tag>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight">
          Why Choose Our Independent Studio
        </h2>

        <p className="text-sm font-utility text-ink/65 leading-relaxed">
          Thoughtfully curated objects and personal care that separate us from big retail chains.
        </p>
      </div>

      {/* Responsive 1 → 2 → 4 Columns Grid with Staggered Scroll-Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '-30px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {WHY_CHOOSE_PILLARS.map((pillar) => {
          const IconComp = pillar.icon;

          return (
            <motion.div
              key={pillar.id}
              variants={cardVariants}
              className="flex"
            >
              <Card
                padding="none"
                interactive={true}
                className={cn(
                  'group relative flex flex-col justify-between w-full h-full bg-cloud/90 border border-ink/15 p-6 rounded-parcel shadow-parcel hover:shadow-parcel-hover hover:-translate-y-1.5 transition-all duration-300'
                )}
              >
                {/* Top Row: Icon Badge + Subtle Punch Tag */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-tag flex items-center justify-center border shadow-xs transition-transform group-hover:scale-108 duration-300',
                      pillar.color === 'moss' && 'bg-moss/15 text-moss-dark border-moss/25',
                      pillar.color === 'clay' && 'bg-clay/15 text-clay-dark border-clay/25',
                      pillar.color === 'brass' && 'bg-brass/20 text-brass-dark border-brass/35',
                      pillar.color === 'ink' && 'bg-ink/10 text-ink border-ink/20'
                    )}
                  >
                    <IconComp className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <Tag
                    color={pillar.color}
                    size="sm"
                    variant="subtle"
                    shape="tag"
                    hasHole={true}
                    className="text-[10px] py-0.5 tracking-wider uppercase font-semibold"
                  >
                    {pillar.tag}
                  </Tag>
                </div>

                {/* Card Content: Heading + One-Line Description */}
                <CardBody className="p-0 space-y-2">
                  <h3 className="text-lg font-display font-medium text-ink group-hover:text-moss-dark transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-body text-ink/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </CardBody>

                {/* Bottom Decorative Motif Accent */}
                <div
                  aria-hidden="true"
                  className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between text-[10px] font-utility text-ink/40"
                >
                  <span className="italic">UrbanNest Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default WhyChooseUs;
