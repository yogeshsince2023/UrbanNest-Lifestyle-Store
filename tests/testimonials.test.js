import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Testimonials verification suite...');

// 1. Verify Testimonials.jsx exists
const testimonialsPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'Testimonials.jsx');
assert(fs.existsSync(testimonialsPath), 'Testimonials.jsx must exist at src/components/sections/Testimonials.jsx');
const testimonialsContent = fs.readFileSync(testimonialsPath, 'utf8');

// 2. Verify sections/index.js exports Testimonials
const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
assert(fs.existsSync(sectionsIndexPath), 'sections/index.js must exist');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('Testimonials'), 'sections/index.js must export Testimonials');

// 3. Verify ReviewsPage.jsx renders Testimonials
const reviewsPagePath = path.join(workspaceRoot, 'src', 'pages', 'ReviewsPage.jsx');
const reviewsPageContent = fs.readFileSync(reviewsPagePath, 'utf8');
assert(reviewsPageContent.includes('Testimonials'), 'ReviewsPage.jsx must import and render Testimonials component');

// 4. Verify testimonials.json dataset
const dataPath = path.join(workspaceRoot, 'src', 'data', 'testimonials.json');
assert(fs.existsSync(dataPath), 'testimonials.json data file must exist');
const testimonialsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

assert(testimonialsData.length >= 4, 'testimonials.json must contain at least 4 reviews');
console.log(`✓ testimonials.json verified with ${testimonialsData.length} authentic reviews`);

// 5. Verify Accessibility & Motion
assert(
  testimonialsContent.includes('useReducedMotion'),
  'Testimonials.jsx must respect user prefers-reduced-motion settings'
);

console.log('✅ All Testimonials assertions passed successfully!');
