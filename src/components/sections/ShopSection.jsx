import { useState, useMemo, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  PackageOpen,
  RotateCcw,
} from 'lucide-react';
import productsData from '../../data/products.json';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { ProductSearch } from '../commerce/ProductSearch';
import { ProductFilters } from '../commerce/ProductFilters';
import { ProductCard } from '../commerce/ProductCard';
import { Recommendations } from '../commerce/Recommendations';
import { PRICE_RANGES } from '../commerce/constants';
import { useCart } from '../../hooks';
import { cn } from '../../utils/cn';
import {
  getStaggerContainerVariants,
  getFadeUpVariants,
} from '../../utils/motion';

/**
 * ShopSection Component
 *
 * Implements animated product catalog with sticky category filtering:
 * - Product data loading from products.json
 * - Sticky category tab bar with gold active indicator
 * - Debounced ProductSearch & Price Range filters
 * - Staggered entrance animations on initial load & category switch
 * - Responsive product grid with ProductCard primitive
 * - Tactile empty state
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
      className={cn('scroll-mt-28 space-y-12 pt-8 border-t border-[var(--color-ink)]/10', className)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <Tag
              color="moss"
              size="md"
              variant="solid"
              shape="tag"
              hasHole={true}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              className="text-xs font-semibold px-3 py-1"
            >
              Artisanal Catalog
            </Tag>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-[var(--color-ink)] tracking-tight">
            Curated Goods for Mindful Living
          </h2>
          <p className="text-base sm:text-lg font-body text-[var(--color-ink)]/75 max-w-2xl leading-relaxed">
            Explore small-batch wares created by independent guild partners across four core lifestyle disciplines.
          </p>
        </div>

        {/* Live Filter Counter Badge / View All Link */}
        <div className="flex items-center gap-4 self-start md:self-end">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-sm font-utility uppercase tracking-wider text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors cursor-pointer font-semibold underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
          <div className="flex items-center gap-2 text-sm font-utility text-[var(--color-ink)]/80 bg-[var(--color-cloud)] px-4 py-2 rounded-tag border border-[var(--color-ink)]/15 shadow-xs">
            <span>Showing</span>
            <span className="font-bold text-[var(--color-ink)]">{filteredProducts.length}</span>
            <span>of {productsData.length} goods</span>
          </div>
        </div>
      </div>

      {/* Sticky Category Filter Bar */}
      <div className="sticky top-[68px] z-40 bg-[var(--color-paper)]/95 backdrop-blur-md border-b border-[var(--color-ink)]/10 py-3 px-2 shadow-xs">
        <div className="flex items-center gap-8 sm:gap-10 overflow-x-auto no-scrollbar">
          {Object.keys(categoryCounts).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'font-utility text-sm sm:text-base uppercase tracking-[0.16em] py-2 transition-all duration-200 cursor-pointer whitespace-nowrap',
                  isSelected
                    ? 'border-b-2 border-[var(--color-gold)] text-[var(--color-ink)] font-bold'
                    : 'text-[var(--color-ink)]/50 hover:text-[var(--color-ink)]/90'
                )}
              >
                {cat}{' '}
                <span className="text-xs opacity-65 font-normal ml-1">
                  ({categoryCounts[cat]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Search & Price Range Filters */}
      <div className="bg-[var(--color-cloud)]/90 backdrop-blur-xs p-6 sm:p-7 rounded-parcel border border-[var(--color-ink)]/15 shadow-parcel space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
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
      </div>

      {/* ========================================================================= */}
      {/* PRODUCT GRID WITH STAGGERED ENTRANCE ANIMATIONS */}
      {/* ========================================================================= */}
      {filteredProducts.length > 0 ? (
        <motion.div
          key={selectedCategory}
          variants={getStaggerContainerVariants(shouldReduceMotion, 0.08, 0.05)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={getFadeUpVariants(shouldReduceMotion)}
              className="flex"
            >
              <ProductCard
                product={product}
                onAddToCart={handleAdd}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* ========================================================================= */
        /* TACTILE EMPTY STATE */
        /* ========================================================================= */
        <div className="py-20 px-8 rounded-parcel bg-[var(--color-cloud)]/80 border border-dashed border-[var(--color-ink)]/20 text-center max-w-xl mx-auto shadow-sm space-y-6">
          <div className="w-18 h-18 rounded-full bg-[var(--color-paper)] border border-[var(--color-ink)]/15 flex items-center justify-center mx-auto text-[var(--color-ink)]/60 shadow-inner">
            <PackageOpen className="w-9 h-9 text-[var(--color-clay)]" />
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[var(--color-ink)]">
              No Handcrafted Goods Found
            </h3>
            <p className="text-sm sm:text-base font-body text-[var(--color-ink)]/75 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any objects matching your criteria
              {searchQuery ? ` for "${searchQuery}"` : ''}. Try broadening your search or resetting the filters.
            </p>
          </div>

          <div className="pt-3">
            <Button
              variant="secondary"
              color="clay"
              size="lg"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={handleResetFilters}
              className="shadow-xs text-sm"
            >
              Reset All Filters
            </Button>
          </div>
        </div>
      )}

      {/* AI-Powered Content-Based Recommendations ("You Might Also Like") */}
      <Recommendations
        variant="section"
        onAddToCart={handleAdd}
      />
    </section>
  );
}

export default ShopSection;
