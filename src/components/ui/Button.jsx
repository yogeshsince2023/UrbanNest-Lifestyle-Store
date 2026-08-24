import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Reusable Button Primitive Component (Editorial Style)
 *
 * Variants:
 * - `primary`: Solid high-contrast block.
 * - `secondary` / `outline`: Outlined with border.
 * - `ghost`: Typographic action with animated underline.
 *
 * Colors:
 * - `gold` / `brass`: Warm radiant gold with crisp dark ink text.
 * - `moss`: Forest green.
 * - `clay`: Warm terracotta.
 * - `white`: White surface / light border (ideal for dark surfaces/hero panels).
 * - `paper`: Soft parchment.
 * - `ink`: Deep ink surface.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary']
 * @param {'moss'|'clay'|'brass'|'gold'|'white'|'paper'|'ink'} [props.color='ink']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {string} [props.loadingText]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.type='button']
 * @param {string} [props.className]
 */
export function Button({
  children,
  variant = 'primary',
  color = 'ink',
  size = 'md',
  loading = false,
  loadingText,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  href,
  as,
  className,
  onClick,
  ...restProps
}) {
  const Component = as || (href ? 'a' : 'button');
  const isDisabled = disabled || loading;
  const isOutline = variant === 'secondary' || variant === 'outline';

  // Size Specifications with touch target accessibility
  const sizeStyles = {
    sm: {
      base: 'text-[11px] uppercase tracking-widest py-2 min-h-[36px] font-utility font-medium',
      primaryPadding: 'px-5',
      pillPadding: 'px-5',
      ghostPadding: 'px-2 py-1',
      iconSize: 'w-3.5 h-3.5',
      gap: 'gap-1.5',
    },
    md: {
      base: 'text-xs uppercase tracking-[0.2em] py-3 min-h-[44px] font-utility font-medium',
      primaryPadding: 'px-8',
      pillPadding: 'px-8',
      ghostPadding: 'px-3 py-1.5',
      iconSize: 'w-4 h-4',
      gap: 'gap-2',
    },
    lg: {
      base: 'text-sm uppercase tracking-[0.25em] py-4 min-h-[52px] font-utility font-medium',
      primaryPadding: 'px-10',
      pillPadding: 'px-10',
      ghostPadding: 'px-4 py-2',
      iconSize: 'w-5 h-5',
      gap: 'gap-3',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  // Primary Solid Colors
  const primaryColors = {
    gold: 'bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[#1C2B1E] border border-[var(--color-gold)] shadow-sm hover:shadow font-bold',
    brass: 'bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[#1C2B1E] border border-[var(--color-gold)] shadow-sm hover:shadow font-bold',
    white: 'bg-[#F0EBE0] hover:bg-white text-[#1C2B1E] border border-[#F0EBE0] shadow-sm hover:shadow font-bold',
    paper: 'bg-paper hover:bg-cloud text-ink border border-ink/20 shadow-sm hover:shadow font-bold',
    moss: 'bg-moss hover:bg-moss-dark text-paper border border-moss shadow-sm hover:shadow transition-all',
    clay: 'bg-clay hover:bg-clay-dark text-paper border border-clay shadow-sm hover:shadow transition-all',
    ink: 'bg-ink hover:bg-cloud hover:text-ink text-paper border border-ink shadow-sm hover:shadow transition-all',
  };

  // Secondary / Outlined Colors
  const secondaryColors = {
    gold: 'border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[#1C2B1E] font-semibold',
    brass: 'border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[#1C2B1E] font-semibold',
    white: 'border border-[#F0EBE0]/60 text-[#F0EBE0] hover:border-[#F0EBE0] hover:bg-white/10 font-medium',
    paper: 'border border-paper text-paper hover:bg-paper hover:text-ink font-semibold',
    moss: 'border border-moss text-moss hover:bg-moss hover:text-paper font-semibold',
    clay: 'border border-clay text-clay hover:bg-clay hover:text-paper font-semibold',
    ink: 'border border-ink text-ink hover:bg-ink hover:text-paper font-semibold',
  };

  // Ghost Colors
  const ghostColors = {
    gold: 'text-[var(--color-gold)] hover:opacity-75 after:bg-[var(--color-gold)] font-semibold',
    brass: 'text-[var(--color-gold)] hover:opacity-75 after:bg-[var(--color-gold)] font-semibold',
    white: 'text-[#F0EBE0] hover:text-white after:bg-[#F0EBE0] font-semibold',
    paper: 'text-paper hover:opacity-75 after:bg-paper font-semibold',
    moss: 'text-moss hover:opacity-75 after:bg-moss font-semibold',
    clay: 'text-clay hover:opacity-75 after:bg-clay font-semibold',
    ink: 'text-ink hover:opacity-75 after:bg-ink font-semibold',
  };

  return (
    <Component
      type={href ? undefined : type}
      href={href}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      onClick={isDisabled ? undefined : onClick}
      className={cn(
        'group relative inline-flex items-center justify-center font-medium select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-1',
        currentSize.base,
        currentSize.gap,

        // Primary Variant
        variant === 'primary' && [
          'border uppercase',
          currentSize.primaryPadding,
          primaryColors[color] || primaryColors.ink,
          !isDisabled &&
            'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer',
        ],

        // Secondary / Outline Variant
        isOutline && [
          'bg-transparent',
          currentSize.pillPadding,
          secondaryColors[color] || secondaryColors.ink,
          !isDisabled &&
            'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer',
        ],

        // Ghost Variant
        variant === 'ghost' && [
          'bg-transparent relative',
          currentSize.ghostPadding,
          ghostColors[color] || ghostColors.ink,
          !isDisabled && 'cursor-pointer',
          'after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full',
        ],
        
        isDisabled && 'opacity-50 cursor-not-allowed filter grayscale-[0.5]',
        className
      )}
      {...restProps}
    >
      {/* Loading Spinner */}
      {loading && (
        <Loader2
          className={cn('animate-spin shrink-0', currentSize.iconSize)}
          aria-hidden="true"
        />
      )}

      {/* Left Icon */}
      {!loading && leftIcon && (
        <span className={cn('inline-flex shrink-0 items-center', currentSize.iconSize)}>
          {leftIcon}
        </span>
      )}

      {/* Button Label */}
      <span className="inline-block truncate leading-tight">
        {loading && loadingText ? loadingText : children}
      </span>

      {/* Right Icon */}
      {!loading && rightIcon && (
        <span className={cn('inline-flex shrink-0 items-center', currentSize.iconSize)}>
          {rightIcon}
        </span>
      )}
    </Component>
  );
}

export default Button;
