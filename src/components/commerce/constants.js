/**
 * Standard categories configuration with icons and tag accent colors
 */
export const CATEGORY_CONFIG = [
  { id: 'All', label: 'All Goods', color: 'ink', icon: '✨' },
  { id: 'Home Décor', label: 'Home Décor', color: 'clay', icon: '🏺' },
  { id: 'Gifts', label: 'Gifts', color: 'moss', icon: '🎁' },
  { id: 'Stationery', label: 'Stationery', color: 'brass', icon: '✉️' },
  { id: 'Lifestyle Accessories', label: 'Lifestyle Accessories', color: 'clay', icon: '🌿' },
];

/**
 * Available price range options
 */
export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 500 },
  { id: '500-1500', label: '₹500 – ₹1,500', min: 500, max: 1500 },
  { id: 'above-1500', label: 'Above ₹1,500', min: 1500, max: Infinity },
];
