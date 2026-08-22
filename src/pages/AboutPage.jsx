import { AboutShop, WhyChooseUs } from '../components/sections';

/**
 * About Page — Brand story + value propositions
 */
export default function AboutPage({ onExploreClick, onContactClick }) {
  return (
    <>
      <AboutShop onExploreClick={onExploreClick} onContactClick={onContactClick} />
      <WhyChooseUs />
    </>
  );
}
