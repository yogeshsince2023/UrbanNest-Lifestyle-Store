import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  CRAFT_EASING,
  getFadeUpVariants,
  getStaggerContainerVariants,
  DEFAULT_VIEWPORT,
} from '../src/utils/motion.js';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Animation Consistency & Reduced-Motion verification suite...');

// 1. Verify Shared Easing Curve
assert.deepStrictEqual(
  CRAFT_EASING,
  [0.16, 1, 0.3, 1],
  'motion.js must export the uniform CRAFT_EASING curve [0.16, 1, 0.3, 1]'
);

// 2. Verify Reduced Motion Behavior in getFadeUpVariants
const normalFade = getFadeUpVariants(false);
assert.strictEqual(normalFade.hidden.opacity, 0);
assert.strictEqual(normalFade.hidden.y, 20);
assert.strictEqual(normalFade.visible.transition.duration, 0.5);

const reducedFade = getFadeUpVariants(true);
assert.strictEqual(reducedFade.hidden.y, 0, 'Reduced motion must eliminate Y-axis movement');
assert.strictEqual(reducedFade.visible.transition.duration, 0.0001, 'Reduced motion duration must be instantaneous');

// 3. Verify Reduced Motion Behavior in getStaggerContainerVariants
const normalStagger = getStaggerContainerVariants(false, 0.1, 0.05);
assert.strictEqual(normalStagger.visible.transition.staggerChildren, 0.1);

const reducedStagger = getStaggerContainerVariants(true, 0.1, 0.05);
assert.strictEqual(reducedStagger.visible.transition.staggerChildren, 0, 'Reduced motion must eliminate stagger interval');

console.log('✓ Motion utility math and reduced-motion zero-duration bypass verified');

// 4. Verify CSS global reduced-motion rule in globals.css
const cssPath = path.join(workspaceRoot, 'src', 'styles', 'globals.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');
assert(
  cssContent.includes('prefers-reduced-motion: reduce'),
  'globals.css must contain a global @media (prefers-reduced-motion: reduce) rule'
);
console.log('✓ CSS global prefers-reduced-motion zero-duration bypass verified in globals.css');

console.log('✅ All Animation Consistency & Reduced-Motion assertions passed successfully!');
