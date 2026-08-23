/**
 * =============================================================================
 * CENTRALIZED MOTION SYSTEM (Framer Motion Consistency Pass)
 * =============================================================================
 *
 * Provides standardized animation tokens, cubic-bezier easing curves,
 * and reduced-motion aware variants across all sections in UrbanNest.
 *
 * Motion Philosophy:
 * - Tactile, unhurried, physical craft aesthetic (spring damping 28, stiffness 280)
 * - Scroll-reveal: Subtle vertical lift (y: 20px) + opacity fade (duration: 0.5s)
 * - Staggered children: 100ms interval for natural cascading rhythm
 * - Reduced motion: All animations skipped entirely (duration: 0, immediate rendering)
 */

/**
 * Signature craft easing curve (natural physical settling)
 */
export const CRAFT_EASING = [0.16, 1, 0.3, 1];

/**
 * Standard scroll-reveal item fade-up variants
 * @param {boolean} shouldReduceMotion
 */
export const getFadeUpVariants = (shouldReduceMotion = false) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.0001 : 0.5,
      ease: CRAFT_EASING,
    },
  },
});

/**
 * Standard container stagger variants for cascading lists/grids
 * @param {boolean} shouldReduceMotion
 * @param {number} [staggerDelay=0.1]
 * @param {number} [delayChildren=0.05]
 */
export const getStaggerContainerVariants = (
  shouldReduceMotion = false,
  staggerDelay = 0.1,
  delayChildren = 0.05
) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      delayChildren: shouldReduceMotion ? 0 : delayChildren,
    },
  },
});

/**
 * Standard viewport configuration for whileInView triggers
 */
export const DEFAULT_VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -50px 0px',
};

/**
 * 3D tilt hover variants for product cards
 * Creates a "physical object lifting off page" effect using perspective
 * @param {boolean} shouldReduceMotion
 */
export const getTiltVariants = (shouldReduceMotion = false) => ({
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    boxShadow: '0 2px 16px rgba(28, 43, 30, 0.08), 0 1px 4px rgba(28, 43, 30, 0.04)',
  },
  hover: {
    scale: shouldReduceMotion ? 1 : 1.03,
    boxShadow: shouldReduceMotion
      ? '0 2px 16px rgba(28, 43, 30, 0.08)'
      : '0 20px 48px rgba(28, 43, 30, 0.18), 0 6px 16px rgba(28, 43, 30, 0.10)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

/**
 * Slide-up reveal from bottom — for quick-add bars, overlays
 * @param {boolean} shouldReduceMotion
 */
export const getSlideUpVariants = (shouldReduceMotion = false) => ({
  hidden: {
    y: shouldReduceMotion ? 0 : '100%',
    opacity: shouldReduceMotion ? 1 : 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.0001 : 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

/**
 * Floating breathe animation for hero elements
 * Gentle vertical oscillation — the "breathing" effect
 */
export const FLOAT_TRANSITION = {
  duration: 4,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

export const getFloatVariants = (shouldReduceMotion = false) => ({
  animate: shouldReduceMotion
    ? {}
    : {
        y: [0, -8, 0],
        transition: FLOAT_TRANSITION,
      },
});

/**
 * Word-by-word stagger for hero headlines
 * @param {string} text — the full headline text
 * @param {boolean} shouldReduceMotion
 */
export const getWordStaggerVariants = (shouldReduceMotion = false) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.08,
      delayChildren: shouldReduceMotion ? 0 : 0.1,
    },
  },
});

export const WORD_VARIANT = (shouldReduceMotion = false) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

/**
 * Counter animation helper — use with useEffect + useState
 * @param {number} target
 * @param {number} duration ms
 * @param {Function} onUpdate callback(currentValue)
 */
export function animateCounter(target, duration = 1500, onUpdate) {
  const startTime = performance.now();
  const easeOutQuad = (t) => t * (2 - t);

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOutQuad(progress) * target);
    onUpdate(value);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
