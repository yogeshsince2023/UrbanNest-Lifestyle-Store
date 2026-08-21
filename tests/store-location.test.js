import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 11 Store Location & Map verification suite...');

// 1. Verify StoreLocation.jsx exists
const storeLocationPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'StoreLocation.jsx');
assert(fs.existsSync(storeLocationPath), 'StoreLocation.jsx must exist at src/components/sections/StoreLocation.jsx');
const storeLocationContent = fs.readFileSync(storeLocationPath, 'utf8');

// 2. Verify sections/index.js exports StoreLocation
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('StoreLocation'), 'sections/index.js must export StoreLocation');

// 3. Verify App.jsx imports and uses StoreLocation
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('StoreLocation'), 'App.jsx must import and render StoreLocation component');

// 4. Verify Embedded Google Map Iframe (Basic Embed, No API Key)
assert(
  storeLocationContent.includes('<iframe') &&
  storeLocationContent.includes('maps.google.com/maps?q='),
  'StoreLocation.jsx must embed a basic Google Maps iframe without requiring an API key'
);

// 5. Verify Store Hours
assert(
  storeLocationContent.includes('Tuesday') &&
  storeLocationContent.includes('Saturday') &&
  storeLocationContent.includes('Monday'),
  'StoreLocation.jsx must display structured store opening hours'
);

// 6. Verify Physical Address Details
assert(
  storeLocationContent.includes('Mill Valley') &&
  storeLocationContent.includes('94941') &&
  storeLocationContent.includes('Sunburst Way'),
  'StoreLocation.jsx must display plausible physical studio address coordinates'
);

// 7. Verify "Get Directions" Link with target="_blank"
assert(
  storeLocationContent.includes('Get Directions') &&
  storeLocationContent.includes('target="_blank"') &&
  storeLocationContent.includes('rel="noopener noreferrer"'),
  'StoreLocation.jsx must include an accessible Get Directions link opening Google Maps in a new tab'
);

// 8. Verify Design System Parcel Frame Styling
assert(
  storeLocationContent.includes('rounded-parcel') &&
  storeLocationContent.includes('shadow-parcel'),
  'StoreLocation.jsx must style the surrounding map frame with system tokens (rounded-parcel, shadow-parcel)'
);

console.log('✅ All Step 11 Store Location & Map assertions passed successfully!');
