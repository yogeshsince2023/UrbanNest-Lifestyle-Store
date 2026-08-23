import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Product Data & Filtering verification suite...');

// 1. Load products.json
const productsPath = path.join(workspaceRoot, 'src', 'data', 'products.json');
assert(fs.existsSync(productsPath), 'products.json must exist at src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Verify product count (12–16 products)
assert(products.length >= 12 && products.length <= 16, `Expected 12–16 products, found ${products.length}`);
console.log(`✓ products.json contains ${products.length} products`);

// Verify required schema fields
const requiredFields = ['id', 'name', 'category', 'price', 'shortDescription', 'tags', 'image', 'featured'];
const validCategories = new Set(['Home Décor', 'Gifts', 'Stationery', 'Lifestyle Accessories']);
const categoryCounts = {};

products.forEach((p, idx) => {
  for (const field of requiredFields) {
    assert(p[field] !== undefined, `Product #${idx} (${p.name || 'unnamed'}) is missing field: ${field}`);
  }
  assert(typeof p.id === 'string' && p.id.length > 0, `Product #${idx} id must be non-empty string`);
  assert(typeof p.name === 'string' && p.name.length > 0, `Product #${idx} name must be non-empty string`);
  assert(validCategories.has(p.category), `Product #${idx} category "${p.category}" must be one of the 4 valid categories`);
  assert(typeof p.price === 'number' && p.price > 0, `Product #${idx} price must be a positive number`);
  assert(typeof p.shortDescription === 'string' && p.shortDescription.length > 0, `Product #${idx} shortDescription must be non-empty string`);
  assert(Array.isArray(p.tags) && p.tags.length > 0, `Product #${idx} tags must be a non-empty array`);
  assert(typeof p.image === 'string' && p.image.length > 0, `Product #${idx} image must be a non-empty string`);
  assert(typeof p.featured === 'boolean', `Product #${idx} featured must be boolean`);

  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});

// Verify each of the 4 categories is represented
assert.strictEqual(Object.keys(categoryCounts).length, 4, 'All 4 required categories must have products');
for (const cat of validCategories) {
  assert((categoryCounts[cat] || 0) >= 3, `Category "${cat}" should have at least 3 products (found ${categoryCounts[cat]})`);
}
console.log('✓ All 4 categories verified with valid schema & rich distribution:', categoryCounts);

// 2. Test Multi-criteria Filter Function (AND logic)
function filterProducts(items, { category = 'All', search = '', priceRange = 'all' }) {
  const priceRangeMap = {
    'all': { min: 0, max: Infinity },
    'under-500': { min: 0, max: 500 },
    '500-1500': { min: 500, max: 1500 },
    'above-1500': { min: 1500, max: Infinity },
  };

  const range = priceRangeMap[priceRange] || priceRangeMap['all'];
  const query = search.trim().toLowerCase();

  return items.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = p.price >= range.min && p.price <= range.max;
    const matchesSearch =
      query === '' ||
      p.name.toLowerCase().includes(query) ||
      p.shortDescription.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesPrice && matchesSearch;
  });
}

// Test Category Filtering
const homeDecorItems = filterProducts(products, { category: 'Home Décor' });
assert.strictEqual(homeDecorItems.length, categoryCounts['Home Décor'], 'Category filter should match exact category count');

// Test Search Filtering
const stonewareItems = filterProducts(products, { search: 'stoneware' });
assert(stonewareItems.length >= 1, 'Search query "stoneware" should match stoneware products');
assert(stonewareItems.every(p => p.name.toLowerCase().includes('stoneware') || p.shortDescription.toLowerCase().includes('stoneware') || p.tags.includes('stoneware')));

// Test Price Range Filtering
const under500Items = filterProducts(products, { priceRange: 'under-500' });
assert(under500Items.length >= 2, 'Under ₹500 tier should have at least 2 items');
assert(under500Items.every(p => p.price <= 500), 'All under-500 items must have price <= 500');

const midRangeItems = filterProducts(products, { priceRange: '500-1500' });
assert(midRangeItems.length >= 3, '₹500–₹1,500 tier should have at least 3 items');
assert(midRangeItems.every(p => p.price >= 500 && p.price <= 1500), 'All mid-range items must be 500–1500');

const highRangeItems = filterProducts(products, { priceRange: 'above-1500' });
assert(highRangeItems.length >= 2, 'Above ₹1,500 tier should have at least 2 items');
assert(highRangeItems.every(p => p.price >= 1500), 'All high-range items must have price >= 1500');

// Test Combined AND Filter (Category + Search + Price)
const combinedItems = filterProducts(products, {
  category: 'Stationery',
  priceRange: 'under-500',
});
assert(combinedItems.length > 0, 'Stationery under 500 should return results');
assert(combinedItems.every(p => p.category === 'Stationery' && p.price <= 500));

// Test Empty State Condition
const noMatches = filterProducts(products, { search: 'xyznonexistentobjectstring' });
assert.strictEqual(noMatches.length, 0, 'Impossible search term must return empty array to trigger empty state');
console.log('✓ AND-logic filtering and empty state triggers verified');

// 3. Verify Component Files & Exports
const commerceIndexPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'index.js');
assert(fs.existsSync(commerceIndexPath), 'commerce/index.js must exist');
const commerceIndexContent = fs.readFileSync(commerceIndexPath, 'utf8');
assert(commerceIndexContent.includes('Categories'), 'commerce/index.js must export Categories');
assert(commerceIndexContent.includes('ProductSearch'), 'commerce/index.js must export ProductSearch');
assert(commerceIndexContent.includes('ProductFilters'), 'commerce/index.js must export ProductFilters');

const sectionsIndexPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'index.js');
const sectionsIndexContent = fs.readFileSync(sectionsIndexPath, 'utf8');
assert(sectionsIndexContent.includes('ShopSection'), 'sections/index.js must export ShopSection');

console.log('✅ All Product browsing assertions passed successfully!');
