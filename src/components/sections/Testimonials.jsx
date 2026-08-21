import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Star,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import { Tag } from '../ui/Tag';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '../ui/Card';
import { cn } from '../../utils/cn';

/**
 * StarRating Component
 * Renders filled and outline star icons in brass accent
 *
 * @param {Object} props
 * @param {number} [props.rating=5] - Number of filled stars (1-5)
 * @param {number} [props.maxStars=5] - Total stars to display
 * @param {string} [props.className] - Additional class names
 */
function StarRating({ rating = 5, maxStars = 5, className }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of ${maxStars} stars rating`}
      className={cn('flex items-center gap-1 text-brass', className)}
    >
      {[...Array(maxStars)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        return (
          <Star
            key={i}
            className={cn(
              'w-3.5 h-3.5',
              isFilled ? 'fill-current text-brass' : 'text-brass/35 fill-transparent'
            )}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

/**
 * Testimonials Component — Patron Reviews & Unboxing Stories
 *
 * Implements Step 10 requirements:
 * - 6 authentic, product-specific testimonials from testimonials.json
 * - 3-up grid on desktop, horizontally scrollable/swipeable on mobile
 * - Star ratings via filled/outline icon set
 * - Built using Card.jsx primitives
 * - Scroll-reveal entrance respecting reduced motion
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional wrapper class names
 */
export function Testimonials({ className }) {
  const scrollContainerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mobile scroll controls
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
      id="reviews"
      aria-label="Customer Reviews and Testimonials"
      className={cn('relative scroll-mt-24 space-y-10 pt-8 border-t border-ink/10', className)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <Tag
              color="brass"
              size="sm"
              variant="solid"
              shape="tag"
              hasHole={true}
              leftIcon={<Sparkles className="w-3 h-3 text-cloud" />}
            >
              Patron Notes &amp; Unboxing Stories
            </Tag>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight">
            Stories from Our Nest
          </h2>

          <p className="text-sm font-utility text-ink/65 max-w-xl">
            Real feedback from verified collectors, architects, and gift givers on our slow-crafted goods.
          </p>
        </div>

        {/* Aggregate Trust Badge & Mobile Carousel Controls */}
        <div className="flex items-center gap-4 self-start md:self-end">
          {/* Average Rating Capsule */}
          <div className="flex items-center gap-2.5 bg-cloud px-3.5 py-2 rounded-tag border border-ink/10 shadow-xs">
            <StarRating rating={5} />
            <span className="text-xs font-utility font-bold text-ink">4.9 / 5</span>
            <span className="text-[11px] font-utility text-ink/50 border-l border-ink/15 pl-2 hidden sm:inline">
              180+ Verified Patrons
            </span>
          </div>

          {/* Carousel Arrows (Mobile/Tablet helper) */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll to previous testimonial"
              className="p-2 rounded-tag bg-cloud hover:bg-paper text-ink border border-ink/15 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll to next testimonial"
              className="p-2 rounded-tag bg-cloud hover:bg-paper text-ink border border-ink/15 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Display: 3-up Grid on Desktop, Swipeable Carousel on Mobile */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '-20px' }}
      >
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 no-scrollbar pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {testimonialsData.map((item) => {
            const initials = item.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="w-[85vw] sm:w-[360px] lg:w-auto shrink-0 snap-start flex"
              >
                <Card
                  padding="md"
                  interactive={true}
                  className="flex flex-col justify-between w-full bg-cloud/90 border border-ink/15 shadow-parcel hover:shadow-parcel-hover hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Card Header: Star Rating & Verified Purchase Pill */}
                  <CardHeader className="p-0 border-0 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={item.rating} />
                      <span className="text-[11px] font-utility text-ink/50">
                        {item.rating}.0
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Tag
                        color="brass"
                        size="sm"
                        variant="subtle"
                        shape="tag"
                        hasHole={false}
                        leftIcon={<ShieldCheck className="w-3 h-3 text-brass-dark" />}
                        className="text-[10px] py-0 px-2 font-semibold"
                      >
                        Verified
                      </Tag>
                    </div>
                  </CardHeader>

                  {/* Card Body: Believable Product-Specific Quote */}
                  <CardBody className="p-0 py-2 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="relative">
                      <Quote
                        aria-hidden="true"
                        className="w-6 h-6 text-brass/25 absolute -top-1 -left-1 pointer-events-none"
                      />
                      <blockquote className="font-display italic text-ink/90 text-sm sm:text-base leading-relaxed pl-4">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Product Context Tag */}
                    <div className="pt-2">
                      <Tag
                        color="paper"
                        size="sm"
                        variant="solid"
                        shape="tag"
                        hasHole={true}
                        className="text-[10px] text-ink/75 font-utility py-0.5"
                      >
                        Piece: {item.productPurchased}
                      </Tag>
                    </div>
                  </CardBody>

                  {/* Card Footer: Patron Avatar, Name, Location, Role Tag */}
                  <CardFooter className="p-0 border-0 pt-4 mt-2 border-t border-ink/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle with Initials */}
                      <div className="w-9 h-9 rounded-full bg-moss/20 text-moss-dark font-display font-bold text-xs flex items-center justify-center border border-moss/30 shadow-inner">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs font-bold font-utility text-ink truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] font-utility text-ink/60 truncate">
                          {item.location}
                        </div>
                      </div>
                    </div>

                    {/* Patron Role/Context Tag */}
                    <Tag
                      color="clay"
                      size="sm"
                      variant="subtle"
                      shape="pill"
                      hasHole={false}
                      className="text-[10px] py-0.5 px-2 font-medium"
                    >
                      {item.roleTag}
                    </Tag>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default Testimonials;
