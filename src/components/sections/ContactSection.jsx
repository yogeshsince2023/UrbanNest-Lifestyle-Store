import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { Tag } from '../ui/Tag';
import { QueryForm } from '../forms/QueryForm';
import { cn } from '../../utils/cn';

/**
 * ContactSection Component ("Ask Us a Question")
 * Performance-optimized: renders immediately without hiding initial DOM to ensure fast FCP/LCP.
 */
export function ContactSection({
  initialInquiryValues,
  onInquirySuccess,
  className,
}) {
  const isOrderInquiry = initialInquiryValues?.category === 'Order Inquiry';
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      aria-label="Ask Us a Question — Studio Concierge"
      className={cn('scroll-mt-24 space-y-8 pt-4', className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Concierge Narrative & Studio Pledges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Tag
              color={isOrderInquiry ? 'moss' : 'clay'}
              size="sm"
              variant="solid"
              shape="tag"
              hasHole={true}
              leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
            >
              {isOrderInquiry ? 'Order Inquiry' : 'Concierge Service'}
            </Tag>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight">
            {isOrderInquiry ? 'Complete Your Order Inquiry' : 'Ask Us a Question'}
          </h2>

          <p className="text-base text-ink/80 font-body leading-relaxed">
            {isOrderInquiry
              ? 'Review your parcel details below and send your inquiry directly to our Mill Valley studio concierge for fulfillment confirmation.'
              : 'Have a question about artisanal glaze variations, custom parcel curation, wholesale orders, or maker collaborations? Our concierge is here to assist you.'}
          </p>

          <div className="space-y-3 pt-3 text-xs sm:text-sm font-utility text-ink/75">
            <div className="flex items-center gap-2.5 bg-[var(--color-cloud)] p-3 rounded-tag border border-ink/10 shadow-xs">
              <Clock className="w-4 h-4 text-moss shrink-0" />
              <span>Response Time: Typically under 2 hours during studio hours</span>
            </div>

            <div className="flex items-center gap-2.5 bg-[var(--color-cloud)] p-3 rounded-tag border border-ink/10 shadow-xs">
              <Sparkles className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
              <span>Complimentary personalized gift message with every parcel</span>
            </div>

            <div className="flex items-center gap-2.5 bg-[var(--color-cloud)] p-3 rounded-tag border border-ink/10 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-clay shrink-0" />
              <span>Direct N8N webhook automation dispatched to studio artisans</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live N8N Query Form */}
        <div className="lg:col-span-7">
          <QueryForm
            initialValues={initialInquiryValues}
            onSuccess={onInquirySuccess}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
