import { Tag } from '../ui/Tag';
import { CATEGORY_CONFIG } from './constants';
import { cn } from '../../utils/cn';


/**
 * Categories Component
 *
 * Horizontal row of category filter pills using Tag.jsx with "All" option.
 *
 * @param {Object} props
 * @param {string} props.selectedCategory - Currently active category id
 * @param {Function} props.onSelectCategory - Callback when a category is clicked
 * @param {Object} [props.counts] - Optional object with item counts per category e.g. { All: 16, Gifts: 4 }
 * @param {string} [props.className] - Additional wrapper classes
 */
export function Categories({
  selectedCategory = 'All',
  onSelectCategory,
  counts,
  className,
}) {
  return (
    <div
      role="group"
      aria-label="Filter products by category"
      className={cn('flex flex-wrap items-center gap-2 sm:gap-2.5 overflow-x-auto py-1 no-scrollbar', className)}
    >
      {CATEGORY_CONFIG.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts ? counts[cat.id] : undefined;

        return (
          <Tag
            key={cat.id}
            as="button"
            type="button"
            color={isSelected ? cat.color : 'ink'}
            variant={isSelected ? 'solid' : 'subtle'}
            size="md"
            shape="tag"
            hasHole={isSelected}
            leftIcon={<span className="text-xs mr-0.5" aria-hidden="true">{cat.icon}</span>}
            onClick={() => onSelectCategory?.(cat.id)}
            className={cn(
              'transition-all duration-200 cursor-pointer select-none text-xs sm:text-sm font-utility',
              isSelected
                ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper font-semibold shadow-sm scale-[1.02]'
                : 'opacity-85 hover:opacity-100 hover:border-ink/40'
            )}
            aria-pressed={isSelected}
          >
            <span>{cat.label}</span>
            {count !== undefined && (
              <span
                className={cn(
                  'ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-utility',
                  isSelected
                    ? 'bg-cloud/25 text-cloud'
                    : 'bg-ink/10 text-ink/75'
                )}
              >
                {count}
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}

export default Categories;
