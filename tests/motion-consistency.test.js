import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  CRAFT_EASING,
  getFadeUpVariants,
  getStaggerContainerVariants,
} from '../src/utils/motion.js';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 18 Animation Consistency & Reduced-Motion verification suite...');

// 1. Verify Motion Utility Tokens & Reduced-Motion Mathematical Behavior
assert.deepStrictEqual(CRAFT_EASING, [0.16, 1, 0.3, 1], 'CRAFT_EASING must match signature craft curve');

const normalFade = getFadeUpVariants(false);
assert.strictEqual(normalFade.hidden.opacity, 0, 'Normal fade-up hidden opacity must be 0');
assert.strictEqual(normalFade.hidden.y, 20, 'Normal fade-up hidden y must be 20');
assert.strictEqual(normalFade.visible.transition.duration, 0.5, 'Normal fade-up duration must be 0.5s');

const reducedFade = getFadeUpVariants(true);
assert.strictEqual(reducedFade.hidden.opacity, 1, 'Reduced motion fade-up hidden opacity must immediately be 1');
assert.strictEqual(reducedFade.hidden.y, 0, 'Reduced motion fade-up hidden y must immediately be 0 (no translation drift)');
assert(reducedFade.visible.transition.duration <= 0.001, 'Reduced motion duration must be skipped (<= 0.001s)');

const normalStagger = getStaggerContainerVariants(false, 0.1, 0.05);
assert.strictEqual(normalStagger.visible.transition.staggerChildren, 0.1, 'Normal stagger interval must be 0.1s');

const reducedStagger = getStaggerContainerVariants(true, 0.1, 0.05);
assert.strictEqual(reducedStagger.visible.transition.staggerChildren, 0, 'Reduced motion stagger must be 0 (immediate)');

console.log('✓ Motion utility math and reduced-motion zero-duration bypass verified');

// 2. Audit All Animated Sections for useReducedMotion Compliance
const animatedSections = [
  'Hero.jsx',
  'AboutShop.jsx',
  'ShopSection.jsx',
  'Recommendations.jsx',
  'WhyChooseUs.jsx',
  'Testimonials.jsx',
  'StoreLocation.jsx',
  'ContactSection.jsx',
  'CartDrawer.jsx',
];

for (const file of animatedSections) {
  let filePath = path.join(workspaceRoot, 'src', 'components', 'sections', file);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(workspaceRoot, 'src', 'components', 'commerce', file);
  }
  assert(fs.existsSync(filePath), `Component file ${file} must exist`);

  const content = fs.readFileSync(filePath, 'utf8');
  assert(
    content.includes('useReducedMotion') || content.includes('shouldReduceMotion'),
    `${file} must import and implement useReducedMotion for accessibility compliance`
  );
}
console.log(`✓ All ${animatedSections.length} interactive and animated components implement useReducedMotion`);

// 3. Verify CSS prefers-reduced-motion media query in globals.css
const globalsCssPath = path.join(workspaceRoot, 'src', 'styles', 'globals.css');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
assert(
  globalsCss.includes('@media (prefers-reduced-motion: reduce)') &&
  globalsCss.includes('animation-duration: 0.001ms !important;') &&
  globalsCss.includes('transition-duration: 0.001ms !important;') &&
  globalsCss.includes('scroll-behavior: auto !important;'),
  'globals.css must contain global CSS zero-duration bypass for prefers-reduced-motion'
);
console.log('✓ CSS global prefers-reduced-motion zero-duration bypass verified in globals.css');

// 4. Verify Hover Consistency in ProductCard.jsx
const productCardPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'ProductCard.jsx');
const productCardContent = fs.readFileSync(productCardPath, 'utf8');
assert(
  productCardContent.includes('hover:-translate-y-1.5') &&
  productCardContent.includes('hover:shadow-parcel-hover') &&
  productCardContent.includes('shadow-peel'),
  'ProductCard.jsx must maintain the signature lift + corner-peel hover motion system'
);
console.log('✓ ProductCard signature lift + corner-peel hover motion verified');

console.log('✅ All Step 18 Animation Consistency & Reduced-Motion assertions passed successfully!');
