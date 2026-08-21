import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * ProductSearch Component
 *
 * Search input with icon filtering by product name / description, debounced at ~250ms.
 *
 * @param {Object} props
 * @param {string} [props.value=''] - Current search term from parent
 * @param {Function} props.onChange - Debounced callback passing the latest query string
 * @param {string} [props.placeholder='Search ceramics, linens, journals, candles...'] - Input placeholder
 * @param {number} [props.debounceMs=250] - Debounce delay in milliseconds
 * @param {string} [props.className] - Additional wrapper class names
 */
export function ProductSearch({
  value = '',
  onChange,
  placeholder = 'Search ceramics, linens, journals, candles...',
  debounceMs = 250,
  className,
}) {
  const [searchTerm, setSearchTerm] = useState(value);
  const isFirstRender = useRef(true);

  // Sync internal state if external value resets (e.g., Reset All Filters button)
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Debounced effect for triggering onChange
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      onChange?.(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs, onChange]);

  const handleClear = () => {
    setSearchTerm('');
    onChange?.('');
  };

  return (
    <div className={cn('relative w-full', className)}>
      <label htmlFor="product-search-input" className="sr-only">
        Search artisanal products
      </label>

      {/* Leading Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink/45">
        <Search className="w-4 h-4" aria-hidden="true" />
      </div>

      {/* Input Element */}
      <input
        id="product-search-input"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        className="w-full bg-paper/90 border border-ink/20 rounded-tag py-2.5 pl-10 pr-9 text-xs sm:text-sm font-utility text-ink placeholder:text-ink/40 shadow-xs focus:outline-none focus:ring-2 focus:ring-moss focus:border-moss transition-all"
      />

      {/* Clear Search Button */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear product search query"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink/40 hover:text-ink transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default ProductSearch;
