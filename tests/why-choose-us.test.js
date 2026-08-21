import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 9 Why Choose Us verification suite...');

// 1. Verify WhyChooseUs.jsx exists
const whyChooseUsPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'WhyChooseUs.jsx');
assert(fs.existsSync(whyChooseUsPath), 'WhyChooseUs.jsx must exist at src/components/sections/WhyChooseUs.jsx');
const whyChooseUsContent = fs.readFileSync(whyChooseUsPath, 'utf8');

// 2. Verify sections/index.js exports WhyChooseUs
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('WhyChooseUs'), 'sections/index.js must export WhyChooseUs');

// 3. Verify App.jsx imports and uses WhyChooseUs
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('WhyChooseUs'), 'App.jsx must import and render WhyChooseUs component');

// 4. Verify 4 Required Cards and Headings
const requiredPillars = [
  'Quality Products',
  'Affordable Prices',
  'Personalized Service',
  'Fast Customer Support',
];

for (const pillar of requiredPillars) {
  assert(
    whyChooseUsContent.includes(pillar),
    `WhyChooseUs.jsx must include pillar card: "${pillar}"`
  );
}

// 5. Verify Icons (lucide-react)
const requiredIcons = ['ShieldCheck', 'Clock', 'Gift'];
for (const icon of requiredIcons) {
  assert(
    whyChooseUsContent.includes(icon),
    `WhyChooseUs.jsx must import and use lucide-react icon: "${icon}"`
  );
}

// 6. Verify Responsive Grid (1 -> 2 -> 4 columns)
assert(
  whyChooseUsContent.includes('grid-cols-1') &&
  whyChooseUsContent.includes('sm:grid-cols-2') &&
  whyChooseUsContent.includes('lg:grid-cols-4'),
  'WhyChooseUs.jsx must use responsive grid classes (grid-cols-1, sm:grid-cols-2, lg:grid-cols-4)'
);

// 7. Verify Scroll-Reveal Entrance with Stagger & Reduced Motion
assert(
  whyChooseUsContent.includes('whileInView') && whyChooseUsContent.includes('viewport'),
  'WhyChooseUs.jsx must implement scroll-reveal entrance'
);
assert(
  whyChooseUsContent.includes('staggerChildren'),
  'WhyChooseUs.jsx must implement staggered animation per card'
);
assert(
  whyChooseUsContent.includes('useReducedMotion'),
  'WhyChooseUs.jsx must respect user reduced motion preferences'
);

console.log('✅ All Step 9 Why Choose Us assertions passed successfully!');
