import { Hero, Offers } from '../components/sections';

/**
 * Home Page — Immersive Split Hero & Curated Promotional Spotlight
 */
export default function HomePage({ onExploreClick, onAskClick, onClaimOffer }) {
  return (
    <div className="space-y-16 pb-16">
      {/* Split Immersive Hero */}
      <Hero onExploreClick={onExploreClick} onAskClick={onAskClick} />

      {/* Featured Promotional Offer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Offers onClaimOffer={onClaimOffer} />
      </div>
    </div>
  );
}
