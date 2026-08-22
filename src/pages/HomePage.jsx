import { Hero, Offers } from '../components/sections';

/**
 * Home Page — Hero banner + promotional offers
 */
export default function HomePage({ onExploreClick, onAskClick, onClaimOffer }) {
  return (
    <>
      <Hero onExploreClick={onExploreClick} onAskClick={onAskClick} />
      <Offers onClaimOffer={onClaimOffer} />
    </>
  );
}
