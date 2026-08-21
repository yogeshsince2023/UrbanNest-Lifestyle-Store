import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 5 About / Brand Story verification suite...');

// 1. Verify AboutShop.jsx exists
const aboutShopPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'AboutShop.jsx');
assert(fs.existsSync(aboutShopPath), 'AboutShop.jsx must exist at src/components/sections/AboutShop.jsx');
const aboutShopContent = fs.readFileSync(aboutShopPath, 'utf8');

// 2. Verify sections/index.js exports AboutShop
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('AboutShop'), 'sections/index.js must export AboutShop');

// 3. Verify App.jsx imports and uses AboutShop
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('AboutShop'), 'App.jsx must import and use AboutShop component');

// 4. Verify Founder-style narrative on why UrbanNest exists
assert(
  aboutShopContent.includes('UrbanNest was born') || aboutShopContent.includes('born out of a quiet frustration'),
  'AboutShop must include a founder-style narrative on why UrbanNest exists'
);
assert(
  aboutShopContent.includes('Artisan Row') || aboutShopContent.includes('Mill Valley'),
  'AboutShop must include specific authentic brick-and-mortar studio origins'
);

// 5. Verify What it sells is woven into narrative
const productKeywords = ['ceramics', 'linen', 'candles', 'stationery', 'accessories'];
for (const kw of productKeywords) {
  assert(
    aboutShopContent.toLowerCase().includes(kw),
    `AboutShop narrative must weave in product category: ${kw}`
  );
}

// 6. Verify Differentiation against big retail chains
assert(
  aboutShopContent.includes('retail') || aboutShopContent.includes('mass-manufactured') || aboutShopContent.includes('Personal Hands-On Curation'),
  'AboutShop must articulate differentiation from big retail chains'
);

// 7. Verify 3-4 stat counters styled as gift-tag labels
assert(aboutShopContent.includes('BRAND_STATS'), 'AboutShop must define brand stat counters');
assert(aboutShopContent.includes('5+'), 'AboutShop stats must include years in business (5+)');
assert(aboutShopContent.includes('180+'), 'AboutShop stats must include products curated (180+)');
assert(aboutShopContent.includes('34'), 'AboutShop stats must include local makers partnered with (34)');
assert(aboutShopContent.includes('100%'), 'AboutShop stats must include sustainable packaging metric (100%)');

// 8. Verify Two-column layout on desktop, stacked on mobile
assert(
  aboutShopContent.includes('grid-cols-1') && aboutShopContent.includes('lg:grid-cols-12'),
  'AboutShop must have responsive two-column grid layout (lg:grid-cols-12, stacked grid-cols-1 on mobile)'
);

// 9. Verify standard scroll-reveal entrance & reduced motion compliance
assert(
  aboutShopContent.includes('whileInView') && aboutShopContent.includes('viewport'),
  'AboutShop must implement scroll-reveal entrance using whileInView'
);
assert(
  aboutShopContent.includes('useReducedMotion'),
  'AboutShop must respect user reduced motion preferences'
);

console.log('✅ All Step 5 About / Brand Story assertions passed successfully!');
