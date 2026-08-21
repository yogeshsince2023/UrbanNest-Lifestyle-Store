import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Reusable Button Primitive Component
 *
 * Variants:
 * - `primary`: Signature gift-tag background with eyelet motif, rich solid color, and hover lift.
 * - `secondary`: Crisp outlined pill with smooth background wash on hover.
 * - `ghost`: Editorial typographic action with signature underline-on-hover animation.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / content
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary'] - Button style variant
 * @param {'moss'|'clay'|'brass'|'ink'} [props.color='moss'] - Color accent
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Sizing preset
 * @param {boolean} [props.loading=false] - Loading spinner state
 * @param {string} [props.loadingText] - Optional label shown when loading
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} [props.leftIcon] - Icon slot on left
 * @param {React.ReactNode} [props.rightIcon] - Icon slot on right
 * @param {boolean} [props.hasHole=true] - Whether primary tag variant shows signature punched eyelet
 * @param {string} [props.type='button'] - HTML button type
 * @param {string} [props.href] - If provided, renders as an anchor <a>
 * @param {string} [props.as] - Custom polymorphic component
 * @param {string} [props.className] - Additional class names
 */
export function Button({
  children,
  variant = 'primary',
  color = 'moss',
  size = 'md',
  loading = false,
  loadingText,
  disabled = false,
  leftIcon,
  rightIcon,
  hasHole = true,
  type = 'button',
  href,
  as,
  className,
  onClick,
  ...restProps
}) {
  const Component = as || (href ? 'a' : 'button');
  const isDisabled = disabled || loading;

  // Size Specifications with touch target accessibility
  const sizeStyles = {
    sm: {
      base: 'text-xs tracking-wider py-2 min-h-[38px] sm:min-h-[40px] font-utility',
      primaryPadding: hasHole ? 'pl-6 pr-4' : 'px-4',
      pillPadding: 'px-4',
      ghostPadding: 'px-2.5 py-1',
      holeSize: 'w-1.5 h-1.5 left-2',
      iconSize: 'w-3.5 h-3.5',
      gap: 'gap-1.5',
    },
    md: {
      base: 'text-sm tracking-wide py-2.5 min-h-[44px] font-utility',
      primaryPadding: hasHole ? 'pl-7 pr-5' : 'px-5',
      pillPadding: 'px-5',
      ghostPadding: 'px-3 py-1.5',
      holeSize: 'w-2 h-2 left-2.5',
      iconSize: 'w-4 h-4',
      gap: 'gap-2',
    },
    lg: {
      base: 'text-base tracking-wide py-3.5 min-h-[48px] font-utility',
      primaryPadding: hasHole ? 'pl-8 pr-6' : 'px-6',
      pillPadding: 'px-7',
      ghostPadding: 'px-4 py-2',
      holeSize: 'w-2.5 h-2.5 left-3',
      iconSize: 'w-5 h-5',
      gap: 'gap-2.5',
    },
  };


  const currentSize = sizeStyles[size] || sizeStyles.md;

  // Variant & Color Styles
  const primaryColors = {
    moss: 'bg-moss hover:bg-moss-dark text-cloud border-moss-dark/40 shadow-sm hover:shadow-md',
    clay: 'bg-clay hover:bg-clay-dark text-cloud border-clay-dark/40 shadow-sm hover:shadow-md',
    brass: 'bg-brass hover:bg-brass-dark text-cloud border-brass-dark/40 shadow-sm hover:shadow-md',
    ink: 'bg-ink hover:bg-ink/90 text-cloud border-ink shadow-sm hover:shadow-md',
  };

  const secondaryColors = {
    moss: 'border-2 border-moss text-moss hover:bg-moss hover:text-cloud',
    clay: 'border-2 border-clay text-clay hover:bg-clay hover:text-cloud',
    brass: 'border-2 border-brass text-brass-dark hover:bg-brass hover:text-cloud',
    ink: 'border-2 border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cloud',
  };

  const ghostColors = {
    moss: 'text-moss hover:text-moss-dark hover:bg-moss/10 after:bg-moss',
    clay: 'text-clay hover:text-clay-dark hover:bg-clay/10 after:bg-clay',
    brass: 'text-brass-dark hover:text-brass hover:bg-brass/15 after:bg-brass',
    ink: 'text-ink hover:text-moss hover:bg-ink/5 after:bg-ink',
  };

  // Primary Gift-Tag Clip Path
  const primaryClipStyle =
    variant === 'primary'
      ? {
          clipPath:
            'polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)',
        }
      : {};

  return (
    <Component
      type={href ? undefined : type}
      href={href}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      onClick={isDisabled ? undefined : onClick}
      style={primaryClipStyle}
      className={cn(
        'group relative inline-flex items-center justify-center font-medium select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2',
        currentSize.base,
        currentSize.gap,

        // Primary Variant
        variant === 'primary' && [
          'rounded-r-tag border uppercase',
          currentSize.primaryPadding,
          primaryColors[color] || primaryColors.moss,
          !isDisabled &&
            'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer',
        ],

        // Secondary Variant
        variant === 'secondary' && [
          'rounded-full bg-transparent',
          currentSize.pillPadding,
          secondaryColors[color] || secondaryColors.ink,
          !isDisabled &&
            'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer',
        ],

        // Ghost Variant
        variant === 'ghost' && [
          'rounded-tag bg-transparent relative',
          currentSize.ghostPadding,
          ghostColors[color] || ghostColors.ink,
          'after:content-[""] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left',
          !isDisabled && 'cursor-pointer active:scale-[0.98]',
        ],

        // Disabled State
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none shadow-none',
        className
      )}
      {...restProps}
    >
      {/* Signature Tag Punched Eyelet for Primary */}
      {variant === 'primary' && hasHole && !loading && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute rounded-full bg-paper border border-current/30 pointer-events-none transition-transform group-hover:scale-110',
            currentSize.holeSize
          )}
        />
      )}

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
