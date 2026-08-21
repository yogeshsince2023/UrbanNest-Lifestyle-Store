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
