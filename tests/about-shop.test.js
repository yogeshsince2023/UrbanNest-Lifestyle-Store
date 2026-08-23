import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting About / Brand Story verification suite...');

// 1. Verify AboutShop.jsx exists
const aboutPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'AboutShop.jsx');
assert(fs.existsSync(aboutPath), 'AboutShop.jsx must exist at src/components/sections/AboutShop.jsx');
const aboutContent = fs.readFileSync(aboutPath, 'utf8');

// 2. Verify sections/index.js exports AboutShop
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('AboutShop'), 'sections/index.js must export AboutShop');

// 3. Verify AboutPage.jsx renders AboutShop
const aboutPagePath = path.join(workspaceRoot, 'src', 'pages', 'AboutPage.jsx');
const aboutPageContent = fs.readFileSync(aboutPagePath, 'utf8');
assert(aboutPageContent.includes('AboutShop'), 'AboutPage.jsx must render AboutShop');

// 4. Verify Stat Counters exist
assert(
  aboutContent.includes('BRAND_STATS') || aboutContent.includes('Years'),
  'AboutShop.jsx must display studio brand stats'
);

console.log('✅ All About / Brand Story assertions passed successfully!');
