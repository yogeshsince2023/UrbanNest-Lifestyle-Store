import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Offers / Promotional Banner verification suite...');

// 1. Verify Offers.jsx exists
const offersPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'Offers.jsx');
assert(fs.existsSync(offersPath), 'Offers.jsx must exist at src/components/sections/Offers.jsx');
const offersContent = fs.readFileSync(offersPath, 'utf8');

// 2. Verify sections/index.js exports Offers
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('Offers'), 'sections/index.js must export Offers');

// 3. Verify HomePage.jsx imports and uses Offers
const homePagePath = path.join(workspaceRoot, 'src', 'pages', 'HomePage.jsx');
const homePageContent = fs.readFileSync(homePagePath, 'utf8');
assert(homePageContent.includes('Offers'), 'HomePage.jsx must import and render Offers component');

// 4. Verify Required Merchandising Copy
assert(
  offersContent.includes('15% off') && offersContent.includes('Stationery'),
  'Offers.jsx must showcase the specific promotional spotlight (15% off Stationery this week)'
);
assert(
  offersContent.includes('SLOWSTUDIO15'),
  'Offers.jsx must include the actionable promo code SLOWSTUDIO15'
);

// 5. Verify CTA Button
assert(
  offersContent.includes('Shop Stationery') || offersContent.includes('Explore Stationery'),
  'Offers.jsx must include a clear CTA button'
);

// 6. Verify Accessibility and Reduced Motion Support
assert(
  offersContent.includes('useReducedMotion'),
  'Offers.jsx must respect user reduced motion preferences'
);
assert(
  offersContent.includes('aria-label'),
  'Offers.jsx must provide accessible landmark labels'
);

console.log('✅ All Offers / Promotional Banner assertions passed successfully!');
