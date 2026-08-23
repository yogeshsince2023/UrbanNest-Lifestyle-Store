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
  color = 'ink',
  size = 'md',
  variant = 'solid',
  leftIcon,
  rightIcon,
  className,
  ...restProps
}) {
  const Component = 'span';

  // Color & Variant Mapping
  const colorStyles = {
    moss: {
      solid: 'bg-moss text-paper border-moss',
      subtle: 'bg-moss/10 text-moss border-moss/25',
      outline: 'bg-transparent text-moss border-moss',
    },
    clay: {
      solid: 'bg-clay text-paper border-clay',
      subtle: 'bg-clay/10 text-clay border-clay/25',
      outline: 'bg-transparent text-clay border-clay',
    },
    brass: {
      solid: 'bg-brass text-paper border-brass',
      subtle: 'bg-brass/15 text-brass-dark border-brass/30',
      outline: 'bg-transparent text-brass-dark border-brass',
    },
    ink: {
      solid: 'bg-ink text-paper border-ink',
      subtle: 'bg-ink/10 text-ink border-ink/20',
      outline: 'bg-transparent text-ink border-ink',
    },
    paper: {
      solid: 'bg-paper text-ink border-ink/20',
      subtle: 'bg-paper/80 text-ink border-ink/15',
      outline: 'bg-transparent text-ink border-ink/25',
    },
    cloud: {
      solid: 'bg-cloud text-ink border-ink/10',
      subtle: 'bg-cloud/70 text-ink border-ink/15',
      outline: 'bg-transparent text-ink border-ink/20',
    },
  };

  // Size Settings
  const sizeStyles = {
    sm: {
      base: 'text-[9px] uppercase tracking-widest py-1 min-h-[24px]',
      padding: 'px-2',
      iconGap: 'gap-1',
    },
    md: {
      base: 'text-[10px] uppercase tracking-widest py-1.5 min-h-[28px]',
      padding: 'px-2.5',
      iconGap: 'gap-1.5',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const activeColor = colorStyles[color] || colorStyles.ink;
  const activeStyle = activeColor[variant] || activeColor.solid;

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center font-utility border select-none transition-colors duration-200',
        currentSize.base,
        currentSize.padding,
        currentSize.iconGap,
        activeStyle,
        className
      )}
      {...restProps}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </Component>
  );
}

export default Tag;
