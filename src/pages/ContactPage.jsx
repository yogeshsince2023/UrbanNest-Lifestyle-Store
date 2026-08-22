import { StoreLocation, ContactSection } from '../components/sections';

/**
 * Contact Page — Store location map + inquiry form
 */
export default function ContactPage({ initialInquiryValues, onInquirySuccess }) {
  return (
    <>
      <ContactSection
        initialInquiryValues={initialInquiryValues}
        onInquirySuccess={onInquirySuccess}
      />
      <StoreLocation />
    </>
  );
}
