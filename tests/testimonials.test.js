import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 10 Testimonials verification suite...');

// 1. Verify testimonials.json
const testimonialsDataPath = path.join(workspaceRoot, 'src', 'data', 'testimonials.json');
assert(fs.existsSync(testimonialsDataPath), 'testimonials.json must exist at src/data/testimonials.json');
const rawData = fs.readFileSync(testimonialsDataPath, 'utf8');
const testimonials = JSON.parse(rawData);

assert(
  Array.isArray(testimonials) && testimonials.length >= 5 && testimonials.length <= 6,
  `testimonials.json must contain 5-6 items, found: ${testimonials.length}`
);

// Validate schema and specific quote content
const requiredProductMentions = ['stoneware', 'linen', 'tea ceremony', 'journal', 'candle', 'tote'];

testimonials.forEach((t, i) => {
  assert(t.name && typeof t.name === 'string', `Item #${i} missing valid name`);
  assert(t.quote && t.quote.length > 30, `Item #${i} missing believable, specific quote`);
  assert(typeof t.rating === 'number' && t.rating >= 4, `Item #${i} missing valid star rating`);
  assert(t.roleTag && typeof t.roleTag === 'string', `Item #${i} missing roleTag`);
});

const joinedQuotes = testimonials.map(t => `${t.quote} ${t.productPurchased || ''}`).join(' ').toLowerCase();
for (const mention of requiredProductMentions) {
  assert(
    joinedQuotes.includes(mention),
    `Testimonials quotes must authentically mention specific catalog items like "${mention}"`
  );
}
console.log(`✓ testimonials.json verified with ${testimonials.length} authentic, category-specific reviews`);

// 2. Verify Testimonials.jsx exists & exports
const testimonialsCompPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'Testimonials.jsx');
assert(fs.existsSync(testimonialsCompPath), 'Testimonials.jsx must exist at src/components/sections/Testimonials.jsx');
const testimonialsCompContent = fs.readFileSync(testimonialsCompPath, 'utf8');

const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('Testimonials'), 'sections/index.js must export Testimonials');

// 3. Verify App.jsx imports and uses Testimonials
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('Testimonials'), 'App.jsx must import and render Testimonials component');

// 4. Verify Card.jsx usage, Star icon ratings, and responsive layout classes
assert(
  testimonialsCompContent.includes('Card') &&
  testimonialsCompContent.includes('CardHeader') &&
  testimonialsCompContent.includes('CardBody') &&
  testimonialsCompContent.includes('CardFooter'),
  'Testimonials.jsx must be built on Card.jsx primitives'
);

assert(
  testimonialsCompContent.includes('Star') &&
  (testimonialsCompContent.includes('fill-current') || testimonialsCompContent.includes('StarRating')),
  'Testimonials.jsx must render filled/outline star rating icons'
);

assert(
  testimonialsCompContent.includes('lg:grid-cols-3') &&
  (testimonialsCompContent.includes('overflow-x-auto') || testimonialsCompContent.includes('snap-x')),
  'Testimonials.jsx must feature 3-up desktop grid and swipeable/scrollable mobile track'
);

console.log('✅ All Step 10 Testimonials assertions passed successfully!');
