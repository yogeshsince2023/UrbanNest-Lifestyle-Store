import { ShopSection } from '../components/sections';

/**
 * Shop Page — Product catalog with search, filters, and AI recommendations
 */
export default function ShopPage({ onAddToCart, activeCategory }) {
  return (
    <ShopSection onAddToCart={onAddToCart} activeCategory={activeCategory} />
  );
}
