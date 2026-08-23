import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Store Location & Map verification suite...');

// 1. Verify StoreLocation.jsx exists
const storeLocationPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'StoreLocation.jsx');
assert(fs.existsSync(storeLocationPath), 'StoreLocation.jsx must exist at src/components/sections/StoreLocation.jsx');
const storeLocationContent = fs.readFileSync(storeLocationPath, 'utf8');

// 2. Verify sections/index.js exports StoreLocation
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('StoreLocation'), 'sections/index.js must export StoreLocation');

// 3. Verify ContactPage.jsx renders StoreLocation
const contactPagePath = path.join(workspaceRoot, 'src', 'pages', 'ContactPage.jsx');
const contactPageContent = fs.readFileSync(contactPagePath, 'utf8');
assert(contactPageContent.includes('StoreLocation'), 'ContactPage.jsx must import and render StoreLocation component');

// 4. Verify Embedded Google Map Iframe
assert(
  storeLocationContent.includes('<iframe') && storeLocationContent.includes('maps.google.com'),
  'StoreLocation.jsx must embed a Google Maps iframe'
);

// 5. Verify Structured Address
assert(
  storeLocationContent.includes('Mill Valley') && storeLocationContent.includes('94941'),
  'StoreLocation.jsx must display the physical studio address'
);

console.log('✅ All Store Location & Map assertions passed successfully!');
