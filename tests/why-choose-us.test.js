import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Why Choose Us verification suite...');

// 1. Verify WhyChooseUs.jsx exists
const whyChooseUsPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'WhyChooseUs.jsx');
assert(fs.existsSync(whyChooseUsPath), 'WhyChooseUs.jsx must exist at src/components/sections/WhyChooseUs.jsx');
const whyChooseUsContent = fs.readFileSync(whyChooseUsPath, 'utf8');

// 2. Verify sections/index.js exports WhyChooseUs
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('WhyChooseUs'), 'sections/index.js must export WhyChooseUs');

// 3. Verify AboutPage.jsx renders WhyChooseUs
const aboutPagePath = path.join(workspaceRoot, 'src', 'pages', 'AboutPage.jsx');
const aboutPageContent = fs.readFileSync(aboutPagePath, 'utf8');
assert(aboutPageContent.includes('WhyChooseUs'), 'AboutPage.jsx must import and render WhyChooseUs component');

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
    `WhyChooseUs.jsx must include value proposition: ${pillar}`
  );
}

// 5. Verify Accessibility & Motion
assert(
  whyChooseUsContent.includes('useReducedMotion'),
  'WhyChooseUs.jsx must respect user prefers-reduced-motion settings'
);
assert(
  whyChooseUsContent.includes('aria-label'),
  'WhyChooseUs.jsx must provide accessible landmark labels'
);

console.log('✅ All Why Choose Us assertions passed successfully!');
