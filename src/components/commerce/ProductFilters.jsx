import { Tag } from '../ui/Tag';
import { PRICE_RANGES } from './constants';
import { cn } from '../../utils/cn';


/**
 * ProductFilters Component
 *
 * Price-range filter as pill options combining with category and search via AND logic.
 *
 * @param {Object} props
 * @param {string} [props.selectedPriceRange='all'] - Currently active price range id
 * @param {Function} props.onSelectPriceRange - Callback when a price pill is selected
 * @param {Function} [props.onResetFilters] - Callback to clear all active filters
 * @param {boolean} [props.hasActiveFilters=false] - True if any filter/search is currently applied
 * @param {string} [props.className] - Additional wrapper class names
 */
export function ProductFilters({
  selectedPriceRange = 'all',
  onSelectPriceRange,
  onResetFilters,
  hasActiveFilters = false,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 text-xs font-utility',
        className
      )}
    >
      {/* Price Range Pills */}
      <div
        role="group"
        aria-label="Filter products by price range"
        className="flex flex-wrap items-center gap-2"
      >
        <span className="text-ink/60 mr-1 hidden sm:inline select-none">
          Price:
        </span>

        {PRICE_RANGES.map((range) => {
          const isSelected = selectedPriceRange === range.id;

          return (
            <Tag
              key={range.id}
              as="button"
              type="button"
              color={isSelected ? 'moss' : 'cloud'}
              variant={isSelected ? 'solid' : 'subtle'}
              size="sm"
              shape="pill"
              hasHole={false}
              onClick={() => onSelectPriceRange?.(range.id)}
              className={cn(
                'cursor-pointer transition-all duration-200 text-xs select-none',
                isSelected
                  ? 'ring-2 ring-moss ring-offset-1 ring-offset-paper font-semibold shadow-xs'
                  : 'text-ink/75 hover:text-ink hover:bg-ink/5 border-ink/15'
              )}
              aria-pressed={isSelected}
            >
              {range.label}
            </Tag>
          );
        })}
      </div>

      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-clay-dark hover:text-clay underline underline-offset-4 decoration-clay/40 hover:decoration-clay cursor-pointer font-utility transition-colors flex items-center gap-1"
        >
          <span>Reset all filters</span>
        </button>
      )}
    </div>
  );
}

export default ProductFilters;
