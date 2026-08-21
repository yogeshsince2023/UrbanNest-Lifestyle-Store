import { motion, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Phone,
  Mail,
  Car,
  Compass,
} from 'lucide-react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';


const STORE_ADDRESS = {
  street: '482 Redwood Sunburst Way, Suite 104',
  district: 'Artisan Row & Mill Creek Walk',
  cityStateZip: 'Mill Valley, CA 94941',
  coordinates: '37.9060° N, 122.5450° W',
  mapSearchUrl: 'https://maps.google.com/?q=Mill+Valley+Artisan+Row+CA',
  embedMapUrl: 'https://maps.google.com/maps?q=Mill+Valley+Artisan+Row+CA&t=&z=14&ie=UTF8&iwloc=&output=embed',
};

const STORE_HOURS = [
  { days: 'Tuesday – Friday', hours: '10:00 AM – 6:30 PM', status: 'Studio Open' },
  { days: 'Saturday – Sunday', hours: '11:00 AM – 5:00 PM', status: 'Weekend Hours' },
  { days: 'Monday', hours: 'Closed for Studio Workshop & Glaze Firings', status: 'Curation Day' },
];

/**
 * StoreLocation Component
 *
 * Implements Step 11 physical location requirements:
 * - Embedded Google Map iframe (no API key required)
 * - Fictional but plausible Marin County studio address
 * - Structured store operating hours
 * - "Get Directions" link opening Google Maps in a new tab
 * - System-styled parcel card frames with coordinate labels
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional wrapper class names
 */
export function StoreLocation({ className }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="location"
      aria-label="Store Location and Hours"
      className={cn('relative scroll-mt-24 space-y-10 pt-8 border-t border-ink/10', className)}
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <Tag
            color="moss"
            size="sm"
            variant="solid"
            shape="tag"
            hasHole={true}
            leftIcon={<Compass className="w-3 h-3 text-cloud" />}
          >
            Physical Nest &amp; Studio Workshop
          </Tag>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight">
          Visit Our Mill Valley Studio
        </h2>

        <p className="text-sm font-utility text-ink/65 leading-relaxed">
          Step into our sunlit shop to touch the washed linens, test turned dip pens, and browse raw glaze pottery in person.
        </p>
      </div>

      {/* Main Two-Column Layout: Store Details (Left) + Styled Map Frame (Right) */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: shouldReduceMotion ? 0.001 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left Column: Coordinates, Hours, Contact, Directions CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Address & Identity Card */}
          <Card padding="md" className="space-y-4 bg-cloud/90 border border-ink/15 shadow-parcel">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-tag bg-moss/15 text-moss-dark border border-moss/25 flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-medium text-lg text-ink">
                  Studio Coordinates
                </h3>
                <address className="not-italic text-xs sm:text-sm font-utility text-ink/80 leading-relaxed">
                  <div>{STORE_ADDRESS.street}</div>
                  <div className="text-ink/60">{STORE_ADDRESS.district}</div>
                  <div className="font-semibold text-ink">{STORE_ADDRESS.cityStateZip}</div>
                </address>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <Tag color="paper" size="sm" hasHole={false} className="text-[11px] font-utility">
                {STORE_ADDRESS.coordinates}
              </Tag>
              <Tag color="moss" size="sm" variant="subtle" className="text-[11px] font-utility">
                Redwood Foothills
              </Tag>
            </div>
          </Card>

          {/* Store Hours Card */}
          <Card padding="md" className="space-y-4 bg-cloud/90 border border-ink/15 shadow-parcel">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-tag bg-clay/15 text-clay-dark border border-clay/25 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-display font-medium text-base text-ink">
                Studio Hours
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-utility">
              {STORE_HOURS.map((schedule, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-ink/10 last:border-0 last:pb-0 gap-1"
                >
                  <div className="font-medium text-ink/90 flex items-center gap-2">
                    <span>{schedule.days}</span>
                    <span className="text-[10px] text-ink/40 sm:hidden">• {schedule.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(schedule.days === 'Monday' ? 'text-ink/50 italic' : 'text-ink/80 font-mono font-medium')}>
                      {schedule.hours}
                    </span>
                    <Tag
                      color={schedule.days === 'Monday' ? 'paper' : 'moss'}
                      size="sm"
                      variant="subtle"
                      hasHole={false}
                      className="text-[9px] py-0 px-1.5 hidden sm:inline-flex"
                    >
                      {schedule.status}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Transit Note & Direct Get Directions Action */}
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-2.5 text-xs font-utility text-ink/70 bg-paper/60 p-3.5 rounded-tag border border-ink/10">
              <Car className="w-4 h-4 text-brass-dark shrink-0 mt-0.5" />
              <span>
                Complimentary bicycle racks, 2 EV charging stations, and dedicated 2-hour visitor parking along Sunburst Way.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={STORE_ADDRESS.mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  type="button"
                  variant="primary"
                  color="moss"
                  size="md"
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="w-full justify-center shadow-md hover:shadow-lg cursor-pointer"
                >
                  Get Directions
                </Button>
              </a>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-utility text-ink/75 px-3 py-2 bg-cloud rounded-tag border border-ink/10">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-moss" />
                  <a href="tel:+14158906378" className="hover:text-moss-dark hover:underline font-mono">
                    (415) 890-NEST
                  </a>
                </div>
                <div className="flex items-center gap-1.5 border-l border-ink/10 pl-2">
                  <Mail className="w-3.5 h-3.5 text-clay" />
                  <a href="mailto:concierge@urbannest.lifestyle" className="hover:text-clay-dark hover:underline">
                    concierge@urbannest.lifestyle
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Styled Map Container with Coordinate Header */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative rounded-parcel bg-cloud border border-ink/15 shadow-parcel overflow-hidden flex-1 flex flex-col min-h-[380px] lg:min-h-[460px]">
            
            {/* Top Map Ribbon / Tag Header */}
            <div className="bg-paper border-b border-ink/10 px-4 py-3 flex items-center justify-between gap-3 text-xs font-utility text-ink/75">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
                <span className="font-semibold text-ink">UrbanNest Lifestyle Studio</span>
                <span className="text-ink/40 hidden sm:inline">• Marin County, California</span>
              </div>

              <Tag color="brass" size="sm" variant="subtle" hasHole={true} className="text-[10px]">
                Interactive Map
              </Tag>
            </div>

            {/* Embedded Google Map Iframe (Basic Embed, No API Key Required) */}
            <div className="relative flex-1 w-full h-full min-h-[320px]">
              <iframe
                title="UrbanNest Store Location Map"
                src={STORE_ADDRESS.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[25%] contrast-[105%] hover:grayscale-0 transition-all duration-500"
              />

              {/* Bottom Subtle Overlay Ribbon with Direct Clickout */}
              <div className="absolute bottom-3 right-3 z-10">
                <a
                  href={STORE_ADDRESS.mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-paper/95 hover:bg-paper text-ink px-3 py-1.5 rounded-tag text-xs font-utility font-medium shadow-md border border-ink/15 transition-transform hover:scale-103"
                >
                  <Navigation className="w-3.5 h-3.5 text-moss" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-ink/50" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default StoreLocation;
