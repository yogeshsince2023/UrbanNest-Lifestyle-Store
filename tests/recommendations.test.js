import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  calculateJaccardSimilarity,
  getRecommendations,
} from '../src/utils/recommendations.js';
import productsData from '../src/data/products.json' with { type: 'json' };

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 16 AI Recommendations verification suite...');

// 1. Verify calculateJaccardSimilarity mathematical correctness
const testA = ['ceramics', 'stoneware', 'tableware'];
const testB = ['ceramics', 'tea', 'tableware'];
// Intersection = {'ceramics', 'tableware'} = 2
// Union = {'ceramics', 'stoneware', 'tableware', 'tea'} = 4
// Expected = 2 / 4 = 0.5
const jaccardScore = calculateJaccardSimilarity(testA, testB);
assert.strictEqual(jaccardScore, 0.5, 'Jaccard similarity of 2 overlapping tags out of 4 union must be 0.5');

const identicalScore = calculateJaccardSimilarity(['linen', 'organic'], ['linen', 'organic']);
assert.strictEqual(identicalScore, 1.0, 'Identical tag arrays must have Jaccard similarity of 1.0');

const disjointScore = calculateJaccardSimilarity(['woodwork'], ['candles']);
assert.strictEqual(disjointScore, 0.0, 'Disjoint tag arrays must have Jaccard similarity of 0.0');

console.log('✓ Jaccard similarity math verified (0.0, 0.5, 1.0 test cases passed)');

// 2. Verify getRecommendations content-based filtering
const pitcher = productsData.find((p) => p.id === 'prod-01'); // Stoneware Pitcher (ceramics, stoneware, tableware)
assert(pitcher, 'prod-01 Stoneware Pitcher must exist in products.json');

const pitcherRecs = getRecommendations({
  targetProduct: pitcher,
  limit: 4,
});

assert(pitcherRecs.length === 4, 'Recommendations must return 4 items');
assert(!pitcherRecs.some((r) => r.id === 'prod-01'), 'Target item must be excluded from recommendations');

// Verify top recommendations share ceramics or home decor traits
const topRec = pitcherRecs[0];
assert(topRec.similarityScore > 0.4, 'Top recommendation must have meaningful similarity score');
assert(topRec.matchPercentage >= 40, 'Top recommendation must display match percentage >= 40%');
console.log('✓ Pitcher recommendations verified:', pitcherRecs.map((r) => `${r.name} (${r.matchPercentage}% match)`));

// 3. Verify Cart Multi-Item Recommendation Aggregation & Anti-Duplication
const cartItemsMock = [
  { id: 'prod-05', name: 'Botanical Candle', tags: ['candle', 'apothecary', 'beeswax'], price: 850, quantity: 1 },
  { id: 'prod-09', name: 'Cotton-Rag Journal', tags: ['journal', 'paper', 'writing'], price: 950, quantity: 1 },
];

const cartRecs = getRecommendations({
  cartItems: cartItemsMock,
  limit: 3,
});

assert(cartRecs.length === 3, 'Cart recommendations must return 3 items');
assert(
  !cartRecs.some((r) => r.id === 'prod-05' || r.id === 'prod-09'),
  'Items already in cart must be strictly excluded from recommendations'
);
console.log('✓ Cart recommendations verified (excludes in-cart items):', cartRecs.map((r) => r.name));

// 4. Verify Empty-State Fallback
const emptyRecs = getRecommendations({
  cartItems: [],
  limit: 4,
});
assert(emptyRecs.length === 4, 'Empty cart must return 4 fallback featured recommendations');
assert(emptyRecs[0].featured === true, 'Empty cart fallback must prioritize featured items');

// 5. Verify Recommendations.jsx Component & Files
const recComponentPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'Recommendations.jsx');
assert(fs.existsSync(recComponentPath), 'Recommendations.jsx must exist at src/components/commerce/Recommendations.jsx');
const recComponentContent = fs.readFileSync(recComponentPath, 'utf8');

const commerceIndexPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'index.js');
const commerceIndexContent = fs.readFileSync(commerceIndexPath, 'utf8');
assert(commerceIndexContent.includes('Recommendations'), 'commerce/index.js must export Recommendations');

// 6. Verify Plain-English Similarity Documentation Comments
const recUtilsPath = path.join(workspaceRoot, 'src', 'utils', 'recommendations.js');
const recUtilsContent = fs.readFileSync(recUtilsPath, 'utf8');
assert(
  recUtilsContent.includes('HOW THE SIMILARITY ALGORITHM WORKS IN PLAIN TERMS') &&
  recUtilsContent.includes('Jaccard') &&
  recUtilsContent.includes('Intersection'),
  'recommendations.js must include detailed plain-English judge-friendly algorithm explanation'
);
assert(
  recComponentContent.includes('SIMILARITY LOGIC EXPLANATION') &&
  recComponentContent.includes('Jaccard'),
  'Recommendations.jsx must include similarity explanation comments'
);

// 7. Verify Integration in ShopSection.jsx and CartDrawer.jsx
const shopSectionPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'ShopSection.jsx');
const shopSectionContent = fs.readFileSync(shopSectionPath, 'utf8');
assert(shopSectionContent.includes('Recommendations'), 'ShopSection.jsx must mount Recommendations section');

const cartDrawerPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'CartDrawer.jsx');
const cartDrawerContent = fs.readFileSync(cartDrawerPath, 'utf8');
assert(cartDrawerContent.includes('Recommendations'), 'CartDrawer.jsx must mount drawer Recommendations');

console.log('✅ All Step 16 AI Recommendations assertions passed successfully!');
