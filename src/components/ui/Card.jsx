import { cn } from '../../utils/cn';

/**
 * Reusable Card Primitive Component
 *
 * An elevated Cloud-background surface with soft rounded parcel corners,
 * subtle border definition, and smooth elevation deepening on hover.
 * Serves as the foundational canvas for product cards, parcel bundles,
 * reviews, and interactive containers.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card contents
 * @param {'default'|'outlined'|'flat'|'paper'} [props.variant='default'] - Card style preset
 * @param {'none'|'sm'|'md'|'lg'|'xl'} [props.padding='md'] - Internal padding
 * @param {boolean} [props.interactive=false] - Whether card lifts & elevates on hover
 * @param {string} [props.as='div'] - Polymorphic HTML tag
 * @param {string} [props.className] - Additional class names
 * @param {string} [props.href] - If supplied, renders as interactive link
 * @param {Function} [props.onClick] - Click handler
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  as,
  className,
  href,
  onClick,
  ...restProps
}) {
  const isClickable = Boolean(href || onClick || as === 'a' || as === 'button');
  const Component = as || (href ? 'a' : isClickable ? 'button' : 'div');
  const shouldElevate = interactive || isClickable;

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const variantStyles = {
    default: 'bg-cloud border border-ink/10 shadow-parcel',
    outlined: 'bg-cloud border border-ink/20 shadow-none',
    flat: 'bg-cloud border border-transparent shadow-none',
    paper: 'bg-paper border border-ink/10 shadow-parcel',
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'relative rounded-parcel text-ink text-left overflow-hidden transition-all duration-300 ease-out',
        variantStyles[variant] || variantStyles.default,
        paddingStyles[padding],
        shouldElevate &&
          'hover:-translate-y-1 hover:shadow-parcel-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2',
        isClickable && 'cursor-pointer select-none active:translate-y-0 active:scale-[0.99]',
        className
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
}

/**
 * Card Header subcomponent
 */
export function CardHeader({ children, className, ...restProps }) {
  return (
    <div
      className={cn('flex items-start justify-between gap-4 pb-4 border-b border-ink/5', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

/**
 * Card Title subcomponent with Fraunces display font
 */
export function CardTitle({ children, as: TagName = 'h3', className, ...restProps }) {
  return (
    <TagName
      className={cn('font-display font-medium text-lg md:text-xl text-ink leading-snug', className)}
      {...restProps}
    >
      {children}
    </TagName>
  );
}

/**
 * Card Description subcomponent
 */
export function CardDescription({ children, className, ...restProps }) {
  return (
    <p className={cn('text-sm text-ink/75 font-body leading-relaxed mt-1', className)} {...restProps}>
      {children}
    </p>
  );
}

/**
 * Card Body subcomponent
 */
export function CardBody({ children, className, ...restProps }) {
  return (
    <div className={cn('py-4 font-body text-ink/90', className)} {...restProps}>
      {children}
    </div>
  );
}

/**
 * Card Footer subcomponent
 */
export function CardFooter({ children, className, ...restProps }) {
  return (
    <div
      className={cn('pt-4 mt-auto border-t border-ink/5 flex items-center justify-between gap-3', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

/**
 * Card Media / Image container subcomponent
 */
export function CardMedia({ children, src, alt = '', className, aspectRatio = 'aspect-4/3', ...restProps }) {
  return (
    <div className={cn('relative w-full overflow-hidden bg-paper/60', aspectRatio, className)} {...restProps}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          decoding="async"
        />

      ) : (
        children
      )}
    </div>
  );
}

// Compound component attachment
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;

export default Card;
