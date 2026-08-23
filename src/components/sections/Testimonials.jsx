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
 */
function StarRating({ rating = 5, maxStars = 5, className }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of ${maxStars} stars rating`}
      className={cn('flex items-center gap-1 text-[var(--color-brass)]', className)}
    >
      {[...Array(maxStars)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        return (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              isFilled ? 'fill-current text-[var(--color-brass)]' : 'text-[var(--color-brass)]/35 fill-transparent'
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
 */
export function Testimonials({ className }) {
  const scrollContainerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mobile scroll controls
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
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
      className={cn('relative scroll-mt-28 space-y-12 pt-10 border-t border-[var(--color-ink)]/10', className)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <Tag
              color="brass"
              size="md"
              variant="solid"
              shape="tag"
              hasHole={true}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-cloud" />}
              className="text-xs font-semibold px-3 py-1"
            >
              Patron Notes &amp; Unboxing Stories
            </Tag>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-ink tracking-tight">
            Stories from Our Nest
          </h2>

          <p className="text-base sm:text-lg font-body text-ink/75 max-w-xl leading-relaxed">
            Real feedback from verified collectors, architects, and gift givers on our slow-crafted goods.
          </p>
        </div>

        {/* Aggregate Trust Badge & Mobile Carousel Controls */}
        <div className="flex items-center gap-4 self-start md:self-end">
          {/* Average Rating Capsule */}
          <div className="flex items-center gap-3 bg-[var(--color-cloud)] px-4 py-2.5 rounded-tag border border-[var(--color-ink)]/15 shadow-xs">
            <StarRating rating={5} />
            <span className="text-sm font-utility font-bold text-ink">4.9 / 5</span>
            <span className="text-xs font-utility text-ink/60 border-l border-ink/15 pl-2.5 hidden sm:inline">
              180+ Verified Patrons
            </span>
          </div>

          {/* Carousel Arrows (Mobile/Tablet helper) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll to previous testimonial"
              className="p-2.5 rounded-tag bg-[var(--color-cloud)] hover:bg-[var(--color-paper)] text-ink border border-[var(--color-ink)]/15 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll to next testimonial"
              className="p-2.5 rounded-tag bg-[var(--color-cloud)] hover:bg-[var(--color-paper)] text-ink border border-[var(--color-ink)]/15 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
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
          className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-8 no-scrollbar pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
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
                className="w-[88vw] sm:w-[380px] lg:w-auto shrink-0 snap-start flex"
              >
                <Card
                  padding="none"
                  interactive={true}
                  className="flex flex-col justify-between w-full bg-[var(--color-cloud)] border border-[var(--color-ink)]/15 p-7 rounded-parcel shadow-parcel hover:shadow-parcel-hover hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Card Header: Star Rating & Verified Purchase Pill */}
                  <CardHeader className="p-0 border-0 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <StarRating rating={item.rating} />
                      <span className="text-xs font-utility font-bold text-ink/70">
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
                        leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-brass-dark" />}
                        className="text-xs py-0.5 px-2.5 font-semibold"
                      >
                        Verified
                      </Tag>
                    </div>
                  </CardHeader>

                  {/* Card Body: Believable Product-Specific Quote */}
                  <CardBody className="p-0 py-3 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="relative">
                      <Quote
                        aria-hidden="true"
                        className="w-7 h-7 text-[var(--color-brass)]/25 absolute -top-1 -left-1 pointer-events-none"
                      />
                      <blockquote className="font-display italic text-ink/90 text-base sm:text-lg leading-relaxed pl-5">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Product Context Tag */}
                    <div className="pt-2">
                      <Tag
                        color="paper"
                        size="md"
                        variant="solid"
                        shape="tag"
                        hasHole={true}
                        className="text-xs text-ink/80 font-utility py-1 px-3"
                      >
                        Piece: {item.productPurchased}
                      </Tag>
                    </div>
                  </CardBody>

                  {/* Card Footer: Patron Avatar, Name, Location, Role Tag */}
                  <CardFooter className="p-0 border-0 pt-5 mt-3 border-t border-[var(--color-ink)]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Circle with Initials */}
                      <div className="w-10 h-10 rounded-full bg-moss/20 text-moss-dark font-display font-bold text-sm flex items-center justify-center border border-moss/30 shadow-inner">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-bold font-utility text-ink truncate">
                          {item.name}
                        </div>
                        <div className="text-xs font-utility text-ink/65 truncate mt-0.5">
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
                      className="text-xs py-1 px-2.5 font-medium"
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
