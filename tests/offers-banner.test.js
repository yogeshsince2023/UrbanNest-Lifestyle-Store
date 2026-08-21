import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 8 Offers / Promotional Banner verification suite...');

// 1. Verify Offers.jsx exists
const offersPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'Offers.jsx');
assert(fs.existsSync(offersPath), 'Offers.jsx must exist at src/components/sections/Offers.jsx');
const offersContent = fs.readFileSync(offersPath, 'utf8');

// 2. Verify sections/index.js exports Offers
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('Offers'), 'sections/index.js must export Offers');

// 3. Verify App.jsx imports and uses Offers
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('Offers'), 'App.jsx must import and render Offers component');

// 4. Verify Required Merchandising Copy
assert(
  offersContent.includes('15% off') && offersContent.includes('Stationery'),
  'Offers.jsx must showcase the specific promotional spotlight (15% off Stationery this week)'
);
assert(
  offersContent.includes('SLOWSTUDIO15'),
  'Offers.jsx must include the actionable promo code SLOWSTUDIO15'
);

// 5. Verify Clay Gift-Tag Accent Styling Tokens
assert(
  offersContent.includes('bg-clay') && offersContent.includes('text-cloud') && offersContent.includes('border-clay-dark'),
  'Offers.jsx must be styled as a large gift-tag banner in the Clay accent'
);

// 6. Verify CTA Button and Category Scroll Action
assert(
  offersContent.includes('Shop Stationery') || offersContent.includes('Explore Stationery'),
  'Offers.jsx must include a clear CTA button'
);
assert(
  offersContent.includes('scrollIntoView') || offersContent.includes('onClaimOffer'),
  'Offers.jsx must provide smooth scroll or category selection handler'
);

// 7. Verify Accessibility and Reduced Motion Support
assert(
  offersContent.includes('useReducedMotion'),
  'Offers.jsx must respect user reduced motion preferences'
);
assert(
  offersContent.includes('aria-label'),
  'Offers.jsx must provide accessible landmark labels'
);

console.log('✅ All Step 8 Offers / Promotional Banner assertions passed successfully!');
