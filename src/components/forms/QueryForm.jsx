import { useState, useEffect } from 'react';
import {
  Send,
  Loader2,
  AlertCircle,
  MessageCircle,
  Phone as PhoneIcon,
  Mail as MailIcon,
  User as UserIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import {
  INQUIRY_CATEGORIES,
  DEFAULT_WEBHOOK_URL,
  EMAIL_REGEX,
} from './constants';
import { cn } from '../../utils/cn';

/**
 * QueryForm Component
 *
 * Features:
 * - Real N8N webhook integration via POST JSON
 * - Fields: Name (required), Email (required + format validated), Phone (optional),
 *   Category dropdown, Query/Message (required textarea)
 * - Accepts initialValues props for CartDrawer pre-fill
 * - Client-side validation with design system inline error styles
 * - Loading spinner & disabled state during dispatch
 * - 10-second timeout via AbortController
 * - Success (2xx): Form reset, success toast, console log of status for demo verification
 * - Failure: Form retention, retry-friendly error toast, console error logging
 * - Hidden honeypot spam protection
 *
 * @param {Object} props
 * @param {Object} [props.initialValues] - Optional initial field values
 * @param {Function} [props.onSuccess] - Optional callback after successful delivery
 * @param {string} [props.className] - Additional wrapper class names
 */
export function QueryForm({ initialValues, onSuccess, className }) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    category: initialValues?.category || 'General Question',
    message: initialValues?.message || '',
    honeypot: '', // Spam bot trap
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Synchronize incoming initialValues (e.g. from CartDrawer pre-fill)
  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        name: initialValues.name !== undefined ? initialValues.name : prev.name,
        email: initialValues.email !== undefined ? initialValues.email : prev.email,
        phone: initialValues.phone !== undefined ? initialValues.phone : prev.phone,
        category: initialValues.category || prev.category,
        message: initialValues.message !== undefined ? initialValues.message : prev.message,
      }));
    }
  }, [initialValues]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) return 'Name is required to address your response.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';

      case 'email':
        if (!value || !value.trim()) return 'Email address is required for concierge reply.';
        if (!EMAIL_REGEX.test(value.trim())) return 'Please provide a valid email (e.g. name@domain.com).';
        return '';

      case 'message':
        if (!value || !value.trim()) return 'Please enter your message or query details.';
        if (value.trim().length < 5) return 'Message must be at least 5 characters.';
        return '';

      case 'category':
        if (!value) return 'Please select an inquiry category.';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
      category: validateField('category', formData.category),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      category: true,
      message: true,
    });

    return !Object.values(newErrors).some((err) => Boolean(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot check: If filled, silently mock success and abort network call
    if (formData.honeypot) {
      console.warn('[QueryForm Honeypot Triggered]: Spam bot submission detected and silently dropped.');
      toast.success('Thank you for your message! Our concierge will reply shortly.', {
        icon: '🌿',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'General Question',
        message: '',
        honeypot: '',
      });
      setTouched({});
      setErrors({});
      return;
    }

    // 2. Client-side validation before network submission
    if (!validateAll()) {
      toast.error('Please fix the highlighted errors before submitting.', {
        icon: '⚠️',
      });
      return;
    }

    setIsSubmitting(true);

    const webhookUrl =
      import.meta.env.VITE_N8N_QUERY_FORM_URL || DEFAULT_WEBHOOK_URL;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      category: formData.category,
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
      source: 'UrbanNest Web Concierge',
    };

    // 3. Set up 10-second timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check HTTP 2xx success status
      if (response.ok) {
        // Log status to console for demo verification
        console.log('[N8N Query Webhook Success]:', {
          status: response.status,
          statusText: response.statusText,
          webhookUrl,
          payload,
        });

        toast.success(
          `Thank you, ${payload.name}! Your ${payload.category.toLowerCase()} was received by our concierge.`,
          {
            icon: '🌿',
            style: {
              background: '#5C6B4F',
              color: '#F7F5EF',
              border: '1px solid #45513A',
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
            },
          }
        );

        // Clear form state on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'General Question',
          message: '',
          honeypot: '',
        });
        setTouched({});
        setErrors({});

        onSuccess?.(payload);
      } else {
        const errorText = await response.text().catch(() => '');
        throw new Error(
          `Server returned status ${response.status} ${response.statusText}${
            errorText ? `: ${errorText}` : ''
          }`
        );
      }
    } catch (err) {
      clearTimeout(timeoutId);

      const isTimeout = err.name === 'AbortError';
      const errorMessage = isTimeout
        ? 'Request timed out after 10 seconds. Please check your connection and retry.'
        : err.message || 'Unable to connect to the studio concierge.';

      console.error('[N8N Query Webhook Failure]:', {
        error: err,
        isTimeout,
        errorMessage,
        webhookUrl,
        payload,
      });

      toast.error(
        `${
          isTimeout ? 'Request timed out.' : 'Webhook transmission notice:'
        } ${errorMessage} (Your details are preserved below).`,
        {
          icon: '⚠️',
          style: {
            background: '#B5652D',
            color: '#F7F5EF',
            border: '1px solid #964F20',
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px',
          },
        }
      );
      // NOTE: Form values are intentionally kept in state so user doesn't lose their data!
    } finally {

      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        'bg-cloud p-6 sm:p-8 rounded-parcel border border-ink/15 shadow-parcel space-y-5 transition-colors',
        className
      )}
      aria-label="Studio Concierge Query Form"
    >
      {/* Hidden Honeypot Field for Spam Bot Protection */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website_url">Do not fill this field</label>
        <input
          id="website_url"
          name="honeypot"
          type="text"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="query-name"
            className="flex items-center justify-between text-xs font-utility uppercase tracking-wider text-ink/80"
          >
            <span className="flex items-center gap-1.5">
              <UserIcon className="w-3 h-3 text-moss" />
              Your Name <span className="text-clay">*</span>
            </span>
          </label>
          <input
            id="query-name"
            name="name"
            type="text"
            required
            aria-required="true"
            disabled={isSubmitting}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Eleanor Vance"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'query-name-error' : undefined}
            className={cn(
              'w-full bg-paper border rounded-tag py-2.5 px-3 text-xs font-utility text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed',
              errors.name
                ? 'border-clay text-clay-dark focus:ring-clay/40 bg-clay/5'
                : 'border-ink/15 focus:ring-moss'
            )}
          />
          {errors.name && (
            <p
              id="query-name-error"
              role="alert"
              className="flex items-center gap-1 text-[11px] font-utility text-clay-dark animate-fadeIn"
            >
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="query-email"
            className="flex items-center justify-between text-xs font-utility uppercase tracking-wider text-ink/80"
          >
            <span className="flex items-center gap-1.5">
              <MailIcon className="w-3 h-3 text-moss" />
              Email Address <span className="text-clay">*</span>
            </span>
          </label>
          <input
            id="query-email"
            name="email"
            type="email"
            required
            aria-required="true"
            disabled={isSubmitting}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="eleanor@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'query-email-error' : undefined}
            className={cn(
              'w-full bg-paper border rounded-tag py-2.5 px-3 text-xs font-utility text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed',
              errors.email
                ? 'border-clay text-clay-dark focus:ring-clay/40 bg-clay/5'
                : 'border-ink/15 focus:ring-moss'
            )}
          />
          {errors.email && (
            <p
              id="query-email-error"
              role="alert"
              className="flex items-center gap-1 text-[11px] font-utility text-clay-dark animate-fadeIn"
            >
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone (Optional) & Category Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Field (Optional) */}
        <div className="space-y-1.5">
          <label
            htmlFor="query-phone"
            className="flex items-center justify-between text-xs font-utility uppercase tracking-wider text-ink/80"
          >
            <span className="flex items-center gap-1.5">
              <PhoneIcon className="w-3 h-3 text-ink/50" />
              Phone Number <span className="text-[10px] text-ink/40">(Optional)</span>
            </span>
          </label>
          <input
            id="query-phone"
            name="phone"
            type="tel"
            disabled={isSubmitting}
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (415) 000-0000"
            className="w-full bg-paper border border-ink/15 rounded-tag py-2.5 px-3 text-xs font-utility text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-moss disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Category Select Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="query-category"
            className="flex items-center justify-between text-xs font-utility uppercase tracking-wider text-ink/80"
          >
            <span className="flex items-center gap-1.5">
              <Tag color="moss" size="sm" variant="subtle" className="text-[10px] py-0 px-1">
                Topic
              </Tag>
              Inquiry Category <span className="text-clay">*</span>
            </span>
          </label>
          <select
            id="query-category"
            name="category"
            disabled={isSubmitting}
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-paper border border-ink/15 rounded-tag py-2.5 px-3 text-xs font-utility text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-moss disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {INQUIRY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-paper text-ink">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Message / Query Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="query-message"
            className="flex items-center gap-1.5 text-xs font-utility uppercase tracking-wider text-ink/80"
          >
            <MessageCircle className="w-3 h-3 text-moss" />
            Your Query / Message <span className="text-clay">*</span>
          </label>
          {formData.category === 'Order Inquiry' && (
            <span className="text-[11px] font-utility text-moss-dark font-semibold">
              ✓ Parcel details synchronized
            </span>
          )}
        </div>
        <textarea
          id="query-message"
          name="message"
          required
          aria-required="true"
          rows={5}
          disabled={isSubmitting}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us what you're looking for, ask about glaze batches, custom parcel curation..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'query-message-error' : undefined}
          className={cn(
            'w-full bg-paper border rounded-tag py-2.5 px-3 text-xs font-utility text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 resize-y font-mono leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed',
            errors.message
              ? 'border-clay text-clay-dark focus:ring-clay/40 bg-clay/5'
              : 'border-ink/15 focus:ring-moss'
          )}
        />
        {errors.message && (
          <p
            id="query-message-error"
            role="alert"
            className="flex items-center gap-1 text-[11px] font-utility text-clay-dark animate-fadeIn"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>


      {/* Row 4: Submit Button with Loading State & Real Webhook Badge */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-ink/10">
        <Button
          type="submit"
          variant="primary"
          color="moss"
          size="md"
          disabled={isSubmitting}
          rightIcon={
            isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )
          }
          className="justify-center shadow-md hover:shadow-lg cursor-pointer"
        >
          {isSubmitting ? 'Dispatching to Concierge...' : 'Send Inquiry'}
        </Button>

        <div className="flex items-center gap-2 text-[11px] font-utility text-ink/55 justify-center sm:justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
          <span>Live N8N Webhook Endpoint</span>
        </div>
      </div>
    </form>
  );
}

export default QueryForm;
