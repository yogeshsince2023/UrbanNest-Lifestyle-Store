import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { cartReducer, calculateCartTotals } from '../src/context/cartReducer.js';


const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 7 Product Cards & Shopping Cart verification suite...');

// 1. Test calculateCartTotals calculation
const sampleItems = [
  { id: '1', price: 1850, quantity: 2 },
  { id: '2', price: 850, quantity: 3 },
];
const totals = calculateCartTotals(sampleItems);
assert.strictEqual(totals.totalCount, 5, 'calculateCartTotals totalCount should equal sum of quantities');
assert.strictEqual(totals.subtotal, 1850 * 2 + 850 * 3, 'calculateCartTotals subtotal should equal sum of price * quantity');
console.log('✓ calculateCartTotals calculation verified');

// 2. Test cartReducer action logic
let state = {
  items: [],
  totalCount: 0,
  subtotal: 0,
  isDrawerOpen: false,
};

// ADD_ITEM (new item)
const p1 = { id: 'prod-01', name: 'Stoneware Pitcher', price: 1850, category: 'Home Décor' };
state = cartReducer(state, { type: 'ADD_ITEM', payload: p1, quantity: 1 });
assert.strictEqual(state.items.length, 1);
assert.strictEqual(state.totalCount, 1);
assert.strictEqual(state.subtotal, 1850);

// ADD_ITEM (existing item increment)
state = cartReducer(state, { type: 'ADD_ITEM', payload: p1, quantity: 2 });
assert.strictEqual(state.items.length, 1);
assert.strictEqual(state.items[0].quantity, 3);
assert.strictEqual(state.totalCount, 3);
assert.strictEqual(state.subtotal, 1850 * 3);

// ADD_ITEM (second product)
const p2 = { id: 'prod-05', name: 'Botanical Candle', price: 850, category: 'Gifts' };
state = cartReducer(state, { type: 'ADD_ITEM', payload: p2, quantity: 1 });
assert.strictEqual(state.items.length, 2);
assert.strictEqual(state.totalCount, 4);
assert.strictEqual(state.subtotal, 1850 * 3 + 850);

// UPDATE_QUANTITY
state = cartReducer(state, { type: 'UPDATE_QUANTITY', payload: { id: 'prod-01', quantity: 1 } });
assert.strictEqual(state.items.find(i => i.id === 'prod-01').quantity, 1);
assert.strictEqual(state.totalCount, 2);

// UPDATE_QUANTITY (to 0 removes item)
state = cartReducer(state, { type: 'UPDATE_QUANTITY', payload: { id: 'prod-01', quantity: 0 } });
assert.strictEqual(state.items.find(i => i.id === 'prod-01'), undefined);
assert.strictEqual(state.items.length, 1);
assert.strictEqual(state.totalCount, 1);

// REMOVE_ITEM
state = cartReducer(state, { type: 'REMOVE_ITEM', payload: 'prod-05' });
assert.strictEqual(state.items.length, 0);
assert.strictEqual(state.totalCount, 0);
assert.strictEqual(state.subtotal, 0);

// Drawer open/close/toggle actions
state = cartReducer(state, { type: 'OPEN_DRAWER' });
assert.strictEqual(state.isDrawerOpen, true);
state = cartReducer(state, { type: 'CLOSE_DRAWER' });
assert.strictEqual(state.isDrawerOpen, false);
state = cartReducer(state, { type: 'TOGGLE_DRAWER' });
assert.strictEqual(state.isDrawerOpen, true);
console.log('✓ cartReducer state transitions & arithmetic verified');

// 3. Verify ProductCard.jsx
const productCardPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'ProductCard.jsx');
assert(fs.existsSync(productCardPath), 'ProductCard.jsx must exist');
const productCardContent = fs.readFileSync(productCardPath, 'utf8');
assert(productCardContent.includes('Add to Parcel') || productCardContent.includes('Add to Cart'), 'ProductCard must include add action button');
assert(productCardContent.includes('font-utility') || productCardContent.includes('Tag'), 'ProductCard must style price with Tag in Space Mono');
assert(productCardContent.includes('hover:shadow-parcel-hover') || productCardContent.includes('hover:-translate-y'), 'ProductCard must implement lift & peel hover motion');

// 4. Verify CartDrawer.jsx and deliberate choice comment
const cartDrawerPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'CartDrawer.jsx');
assert(fs.existsSync(cartDrawerPath), 'CartDrawer.jsx must exist');
const cartDrawerContent = fs.readFileSync(cartDrawerPath, 'utf8');
assert(cartDrawerContent.includes('Submit Order Inquiry'), 'CartDrawer must have Submit Order Inquiry button');
assert(
  cartDrawerContent.includes('ponytail: Deliberate choice') || cartDrawerContent.includes('deliberate choice'),
  'CartDrawer must include code comment explaining deliberate choice for inquiry pre-fill'
);
assert(cartDrawerContent.includes('updateQuantity') && cartDrawerContent.includes('Minus') && cartDrawerContent.includes('Plus'), 'CartDrawer must have quantity steppers');

// 5. Verify App.jsx integration
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('CartProvider'), 'App.jsx must wrap application in CartProvider');
assert(appContent.includes('CartDrawer'), 'App.jsx must mount CartDrawer');
assert(appContent.includes('handleOrderInquiry'), 'App.jsx must handle pre-filling inquiry form from cart');

console.log('✅ All Step 7 Product Card & Shopping Cart assertions passed successfully!');
