import { motion } from 'framer-motion';
import {
  DEFAULT_WHATSAPP_PHONE,
  DEFAULT_WHATSAPP_MESSAGE,
} from './constants';
import { cn } from '../../utils/cn';

// =============================================================================
// WHATSAPP QUICK-CONTACT CONFIGURATION:
// Default Indian studio contact number for rapid customer inquiries.
// Note: #25D366 (WhatsApp Green) is an intentional exception to our earth-tone
// palette to maximize brand recognition and trust for low-friction chat.
// =============================================================================


/**
 * WhatsApp Icon SVG Component
 */
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
/**
 * WhatsAppButton Component
 * Features:
 * - Floating WhatsApp quick messaging button
 * - Pre-filled chat link opening directly in WhatsApp (wa.me)
 * - Accessible label and online indicator badge
 *
 * @param {Object} props
 * @param {string} [props.phoneNumber=DEFAULT_WHATSAPP_PHONE] - WhatsApp phone number with country code
 * @param {string} [props.defaultMessage=DEFAULT_WHATSAPP_MESSAGE] - Pre-filled inquiry message
 * @param {string} [props.className] - Additional wrapper class names
 */
export function WhatsAppButton({
  phoneNumber = DEFAULT_WHATSAPP_PHONE,
  defaultMessage = DEFAULT_WHATSAPP_MESSAGE,
  className,
}) {
  // Sanitize phone number (strip spaces, dashes, parentheses, plus sign for wa.me URL)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      aria-label="WhatsApp Quick Contact"
      className={cn(
        'fixed bottom-6 left-6 z-40 flex items-center select-none',
        className
      )}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with UrbanNest on WhatsApp (opens in a new tab)"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-3.5 sm:px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Animated Green Online Indicator Ping */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#128C7E] border-2 border-paper" />
        </span>

        <WhatsAppIcon className="w-5 h-5 shrink-0 fill-current text-white" />

        <span className="text-xs font-utility font-bold tracking-wide hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </motion.aside>
  );
}

export default WhatsAppButton;
