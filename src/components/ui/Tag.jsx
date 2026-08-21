import { cn } from '../../utils/cn';

/**
 * Signature Gift-Tag Primitive Component
 *
 * Supports static labels (category pill, price tag, discount badge)
 * and interactive clickable wrappers (button, link, selectable chip).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label or content
 * @param {'moss'|'clay'|'brass'|'ink'|'paper'|'cloud'} [props.color='moss'] - Color theme
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Sizing preset
 * @param {'tag'|'pill'|'rounded'} [props.shape='tag'] - Geometry shape (signature tag with chamfer & eyelet, pill, or rounded)
 * @param {'solid'|'subtle'|'outline'} [props.variant='solid'] - Visual surface style
 * @param {boolean} [props.hasHole=true] - Whether to render the signature punched hole eyelet
 * @param {React.ReactNode} [props.leftIcon] - Icon slot on left
 * @param {React.ReactNode} [props.rightIcon] - Icon slot on right
 * @param {string} [props.as] - HTML element to render ('span', 'div', 'button', 'a')
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.href] - Link destination
 * @param {string} [props.className] - Additional class names
 * @param {boolean} [props.disabled] - Disabled state
 */
export function Tag({
  children,
  color = 'moss',
  size = 'md',
  shape = 'tag',
  variant = 'solid',
  hasHole = shape === 'tag',
  leftIcon,
  rightIcon,
  as,
  onClick,
  href,
  className,
  disabled = false,
  ...restProps
}) {
  const isClickable = Boolean(onClick || href || as === 'button' || as === 'a');
  const Component = as || (href ? 'a' : isClickable ? 'button' : 'span');

  // Color & Variant Mapping
  const colorStyles = {
    moss: {
      solid: 'bg-moss text-cloud border-moss-dark shadow-sm',
      subtle: 'bg-moss/10 text-moss-dark border-moss/25 hover:bg-moss/15',
      outline: 'bg-transparent text-moss border-moss/40 hover:border-moss hover:bg-moss/5',
    },
    clay: {
      solid: 'bg-clay text-cloud border-clay-dark shadow-sm',
      subtle: 'bg-clay/10 text-clay-dark border-clay/25 hover:bg-clay/15',
      outline: 'bg-transparent text-clay border-clay/40 hover:border-clay hover:bg-clay/5',
    },
    brass: {
      solid: 'bg-brass text-cloud border-brass-dark shadow-sm',
      subtle: 'bg-brass/15 text-brass-dark border-brass/30 hover:bg-brass/20',
      outline: 'bg-transparent text-brass-dark border-brass/50 hover:border-brass hover:bg-brass/5',
    },
    ink: {
      solid: 'bg-ink text-cloud border-ink shadow-sm',
      subtle: 'bg-ink/10 text-ink border-ink/20 hover:bg-ink/15',
      outline: 'bg-transparent text-ink border-ink/40 hover:border-ink hover:bg-ink/5',
    },
    paper: {
      solid: 'bg-paper text-ink border-ink/20 shadow-sm',
      subtle: 'bg-paper/80 text-ink border-ink/15',
      outline: 'bg-transparent text-ink border-ink/25',
    },
    cloud: {
      solid: 'bg-cloud text-ink border-ink/10 shadow-sm',
      subtle: 'bg-cloud/70 text-ink border-ink/15',
      outline: 'bg-transparent text-ink border-ink/20',
    },
  };

  // Size Settings with touch target accessibility
  const sizeStyles = {
    sm: {
      base: 'text-[11px] tracking-wider py-1.5 sm:py-0.5 min-h-[36px] sm:min-h-[32px]',
      tagPadding: hasHole ? 'pl-5 pr-2.5' : 'px-2.5',
      pillPadding: 'px-2.5',
      holeSize: 'w-1.5 h-1.5 left-1.5',
      iconGap: 'gap-1',
    },
    md: {
      base: 'text-xs tracking-wider py-2 sm:py-1.5 min-h-[40px] sm:min-h-[36px]',
      tagPadding: hasHole ? 'pl-6 pr-3.5' : 'px-3.5',
      pillPadding: 'px-3.5',
      holeSize: 'w-2 h-2 left-2',
      iconGap: 'gap-1.5',
    },
    lg: {
      base: 'text-sm tracking-wide py-2.5 min-h-[44px]',
      tagPadding: hasHole ? 'pl-7 pr-4.5' : 'px-4.5',
      pillPadding: 'px-4.5',
      holeSize: 'w-2.5 h-2.5 left-2.5',
      iconGap: 'gap-2',
    },
  };


  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentColor = colorStyles[color]?.[variant] || colorStyles.moss.solid;

  // Geometry / Shape Styling
  let shapeClass = '';
  let clipStyle = {};

  if (shape === 'tag') {
    // Signature chamfered gift-tag shape on the left end
    shapeClass = 'rounded-r-tag';
    clipStyle = {
      clipPath: 'polygon(9px 0%, 100% 0%, 100% 100%, 9px 100%, 0% calc(100% - 9px), 0% 9px)',
    };
  } else if (shape === 'pill') {
    shapeClass = 'rounded-full';
  } else {
    shapeClass = 'rounded-tag';
  }

  return (
    <Component
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={clipStyle}
      className={cn(
        'relative inline-flex items-center justify-center font-utility uppercase border select-none transition-all duration-200',
        currentSize.base,
        currentSize.iconGap,
        shape === 'tag' ? currentSize.tagPadding : currentSize.pillPadding,
        shapeClass,
        currentColor,
        isClickable &&
          !disabled &&
          'cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...restProps}
    >
      {/* Signature punched hole / eyelet */}
      {shape === 'tag' && hasHole && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute rounded-full border border-current/30 pointer-events-none transition-transform',
            variant === 'solid' ? 'bg-paper' : 'bg-current/20',
            currentSize.holeSize
          )}
        />
      )}

      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span className="inline-block font-medium truncate leading-tight">{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
    </Component>
  );
}

export default Tag;
