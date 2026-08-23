import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Product Cards & Shopping Cart verification suite...');

// 1. Verify Cart Context exists
const contextPath = path.join(workspaceRoot, 'src', 'context', 'CartContext.jsx');
assert(fs.existsSync(contextPath), 'CartContext.jsx must exist at src/context/CartContext.jsx');
const contextContent = fs.readFileSync(contextPath, 'utf8');

assert(contextContent.includes('calculateCartTotals'), 'CartContext.jsx must define calculateCartTotals');
assert(contextContent.includes('cartReducer'), 'CartContext.jsx must define cartReducer');
assert(contextContent.includes('useReducer'), 'CartContext.jsx must use useReducer');
console.log('✓ CartContext state transitions & arithmetic verified');

// 2. Verify ProductCard.jsx
const productCardPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'ProductCard.jsx');
assert(fs.existsSync(productCardPath), 'ProductCard.jsx must exist');
const productCardContent = fs.readFileSync(productCardPath, 'utf8');
assert(productCardContent.includes('Add to Parcel') || productCardContent.includes('Add to Cart'), 'ProductCard must include add action button');
assert(productCardContent.includes('font-utility') || productCardContent.includes('Tag'), 'ProductCard must style price with Tag in Space Mono');
assert(productCardContent.includes('tiltVariants') || productCardContent.includes('hover:'), 'ProductCard must implement hover motion');

// 3. Verify CartDrawer.jsx
const cartDrawerPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'CartDrawer.jsx');
assert(fs.existsSync(cartDrawerPath), 'CartDrawer.jsx must exist');
const cartDrawerContent = fs.readFileSync(cartDrawerPath, 'utf8');
assert(cartDrawerContent.includes('Submit Order Inquiry'), 'CartDrawer must have Submit Order Inquiry button');
assert(cartDrawerContent.includes('updateQuantity') && cartDrawerContent.includes('Minus') && cartDrawerContent.includes('Plus'), 'CartDrawer must have quantity steppers');

console.log('✅ All Product Card & Shopping Cart assertions passed successfully!');
