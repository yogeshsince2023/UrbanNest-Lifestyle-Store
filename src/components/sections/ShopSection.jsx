import { useState, useMemo, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  PackageOpen,
  RotateCcw,
} from 'lucide-react';
import productsData from '../../data/products.json';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Categories } from '../commerce/Categories';
import { ProductSearch } from '../commerce/ProductSearch';
import { ProductFilters } from '../commerce/ProductFilters';
import { ProductCard } from '../commerce/ProductCard';
import { Recommendations } from '../commerce/Recommendations';
import { PRICE_RANGES } from '../commerce/constants';
import { useCart } from '../../hooks';

import { cn } from '../../utils/cn';



/**
 * ShopSection Component
 *
 * Implements Step 6 & 7 cohesive product browsing layer:
 * - Product data loading from products.json
 * - Horizontal Category pills (Categories.jsx)
 * - Debounced ProductSearch (ProductSearch.jsx)
 * - Price Range pills (ProductFilters.jsx)
 * - AND combination filtering
 * - Responsive product grid with ProductCard primitive
 * - Rich tactile empty state ("No products match — try clearing a filter")
 *
 * @param {Object} props
 * @param {Function} [props.onAddToCart] - Optional callback when user adds a product to cart/parcel
 * @param {string} [props.activeCategory] - Optional category to select dynamically
 * @param {string} [props.className] - Additional wrapper class names
 */
export function ShopSection({ onAddToCart, activeCategory, className }) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  const { addItem } = useCart();
  const shouldReduceMotion = useReducedMotion();

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedPriceRange('all');
  };

  // Determine if any non-default filter is currently active
  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    selectedPriceRange !== 'all';

  // Category counts based on the raw dataset
  const categoryCounts = useMemo(() => {
    const counts = { All: productsData.length };
    productsData.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Multi-criteria filter with AND logic (Category + Search + Price Range)
  const filteredProducts = useMemo(() => {
    const activeRange =
      PRICE_RANGES.find((r) => r.id === selectedPriceRange) || PRICE_RANGES[0];
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return productsData.filter((product) => {
      // 1. Category Filter
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // 2. Price Range Filter
      const matchesPrice =
        product.price >= activeRange.min && product.price <= activeRange.max;

      // 3. Search Query Filter (name, shortDescription, tags)
      const matchesSearch =
        normalizedQuery === '' ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.shortDescription.toLowerCase().includes(normalizedQuery) ||
        product.tags.some((t) => t.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedCategory, searchQuery, selectedPriceRange]);

  const handleAdd = (product) => {
    addItem(product);
    onAddToCart?.(product);
  };

  return (
    <section
      id="shop"
      aria-label="UrbanNest Curated Shop Collection"
      className={cn('scroll-mt-24 space-y-10 pt-8 border-t border-ink/10', className)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <Tag color="moss" size="sm" variant="solid" shape="tag" hasHole={true} leftIcon={<Sparkles className="w-3 h-3" />}>
              Artisanal Catalog
            </Tag>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-ink tracking-tight">
            Curated Goods for Mindful Living
          </h2>
          <p className="text-sm font-utility text-ink/65 max-w-2xl">
            Explore 16 small-batch wares created by independent guild partners across four core lifestyle disciplines.
          </p>
        </div>

        {/* Live Filter Counter Badge */}
        <div className="flex items-center gap-2 self-start md:self-end text-xs font-utility text-ink/70 bg-cloud px-3 py-1.5 rounded-tag border border-ink/10 shadow-xs">
          <span>Showing</span>
          <span className="font-bold text-ink">{filteredProducts.length}</span>
          <span>of {productsData.length} goods</span>
        </div>
      </div>

      {/* Control Bar: Categories + Search + Price Filter Controls */}
      <div className="bg-cloud/90 backdrop-blur-xs p-5 sm:p-6 rounded-parcel border border-ink/15 shadow-parcel space-y-4">
        
        {/* Row 1: Search & Price Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6">
            <ProductSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, material, or keyword (e.g., stoneware, linen, beeswax)..."
            />
          </div>

          <div className="lg:col-span-6 lg:justify-self-end w-full lg:w-auto">
            <ProductFilters
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={setSelectedPriceRange}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="pt-2 border-t border-ink/10">
          <Categories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRODUCT GRID OR TACTILE EMPTY STATE */}
      {/* ========================================================================= */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAdd}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* ========================================================================= */
        /* TACTILE EMPTY STATE (Design System Styled) */
        /* ========================================================================= */
        <div className="py-16 px-6 rounded-parcel bg-cloud/80 border border-dashed border-ink/20 text-center max-w-xl mx-auto shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-full bg-paper border border-ink/15 flex items-center justify-center mx-auto text-ink/60 shadow-inner">
            <PackageOpen className="w-8 h-8 text-clay" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display font-medium text-ink">
              No Handcrafted Goods Found
            </h3>
            <p className="text-xs sm:text-sm font-utility text-ink/65 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any objects matching your criteria
              {searchQuery ? ` for "${searchQuery}"` : ''}. Try broadening your search or resetting the filters.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="secondary"
              color="clay"
              size="md"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleResetFilters}
              className="shadow-xs"
            >
              Reset All Filters
            </Button>
          </div>
        </div>
      )}

      {/* Step 16: AI-Powered Content-Based Recommendations ("You Might Also Like") */}
      <Recommendations
        variant="section"
        onAddToCart={handleAdd}
      />
    </section>
  );
}


export default ShopSection;
