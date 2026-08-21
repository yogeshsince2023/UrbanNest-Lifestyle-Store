import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { Tag } from '../ui/Tag';
import { QueryForm } from '../forms/QueryForm';
import { cn } from '../../utils/cn';

/**
 * ContactSection Component ("Ask Us a Question")
 *
 * Implements Step 13 section container:
 * - Hosts the real N8N QueryForm
 * - Studio Concierge commitments & response metrics
 * - Pre-fill synchronization from CartDrawer
 * - Unified scroll-reveal entrance respecting prefers-reduced-motion
 *
 * @param {Object} props
 * @param {Object} [props.initialInquiryValues] - Pre-filled fields from CartDrawer
 * @param {Function} [props.onInquirySuccess] - Callback after successful dispatch
 * @param {string} [props.className] - Additional wrapper class names
 */
export function ContactSection({
  initialInquiryValues,
  onInquirySuccess,
  className,
}) {
  const isOrderInquiry = initialInquiryValues?.category === 'Order Inquiry';
  const shouldReduceMotion = useReducedMotion();

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
        duration: shouldReduceMotion ? 0.001 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="contact"
      aria-label="Ask Us a Question — Studio Concierge"
      className={cn('scroll-mt-24 space-y-8 pt-8 border-t border-ink/10', className)}
    >
      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Concierge Narrative & Studio Pledges */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Tag
              color={isOrderInquiry ? 'moss' : 'clay'}
              size="sm"
              variant="solid"
              shape="tag"
              hasHole={true}
              leftIcon={<MessageCircle className="w-3 h-3 text-cloud" />}
            >
              {isOrderInquiry ? 'Order Inquiry' : 'Concierge Service'}
            </Tag>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight">
            {isOrderInquiry ? 'Complete Your Order Inquiry' : 'Ask Us a Question'}
          </h2>

          <p className="text-sm text-ink/80 font-body leading-relaxed">
            {isOrderInquiry
              ? 'Review your parcel details below and send your inquiry directly to our Mill Valley studio concierge for fulfillment confirmation.'
              : 'Have a question about artisanal glaze variations, custom parcel curation, wholesale orders, or maker collaborations? Our concierge is here to assist you.'}
          </p>

          <div className="space-y-3 pt-3 text-xs font-utility text-ink/75">
            <div className="flex items-center gap-2.5 bg-paper/60 p-2.5 rounded-tag border border-ink/10">
              <Clock className="w-4 h-4 text-moss shrink-0" />
              <span>Response Time: Typically under 2 hours during studio hours</span>
            </div>

            <div className="flex items-center gap-2.5 bg-paper/60 p-2.5 rounded-tag border border-ink/10">
              <Sparkles className="w-4 h-4 text-brass-dark shrink-0" />
              <span>Complimentary personalized gift message with every parcel</span>
            </div>

            <div className="flex items-center gap-2.5 bg-paper/60 p-2.5 rounded-tag border border-ink/10">
              <ShieldCheck className="w-4 h-4 text-clay-dark shrink-0" />
              <span>Direct N8N webhook automation dispatched to studio artisans</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live N8N Query Form */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <QueryForm
            initialValues={initialInquiryValues}
            onSuccess={onInquirySuccess}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ContactSection;
