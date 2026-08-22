import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { QueryForm } from './QueryForm';
import { Tag } from '../ui/Tag';

/**
 * InquiryModal Component
 *
 * Dedicated modal popup that opens immediately when clicking "Ask Us Anything"
 * from any page, presenting the N8N concierge inquiry form.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Modal close handler
 * @param {Object} [props.initialValues] - Pre-filled form values
 * @param {Function} [props.onSuccess] - Submission success handler
 */
export function InquiryModal({
  isOpen,
  onClose,
  initialValues,
  onSuccess,
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 dark:bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-paper border border-ink/20 shadow-2xl rounded-parcel p-6 sm:p-8 z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Signature Corner Punch Hole Accent */}
            <div
              aria-hidden="true"
              className="absolute top-4 left-4 w-3 h-3 rounded-full bg-cloud border border-ink/25 pointer-events-none"
            />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-ink/10 pl-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Tag color="moss" size="sm" variant="solid" shape="tag" hasHole={true}>
                    Studio Concierge
                  </Tag>
                  <span className="text-xs font-utility text-ink/50 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brass" /> Direct N8N Line
                  </span>
                </div>
                <h2
                  id="inquiry-modal-title"
                  className="font-display font-medium text-xl sm:text-2xl text-ink tracking-tight"
                >
                  Ask Us Anything
                </h2>
                <p className="text-xs sm:text-sm text-ink/75 font-body mt-1">
                  Inquire about bespoke gift curation, glaze batches, custom ceramics, or workshop visits.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close inquiry modal"
                className="p-1.5 rounded-tag bg-cloud hover:bg-paper text-ink/60 hover:text-ink border border-ink/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: QueryForm */}
            <div className="pt-6">
              <QueryForm
                initialValues={initialValues}
                onSuccess={() => {
                  onSuccess?.();
                  onClose();
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default InquiryModal;
