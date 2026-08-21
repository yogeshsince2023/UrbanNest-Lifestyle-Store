import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 20 Performance & Accessibility verification suite...');

// 1. Verify Keyboard Navigation & Escape Dismissal Listeners
const cartDrawerContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'commerce', 'CartDrawer.jsx'), 'utf8');
assert(
  cartDrawerContent.includes("e.key === 'Escape'") && cartDrawerContent.includes('closeDrawer()'),
  'CartDrawer.jsx must listen for Escape key to close the drawer'
);
console.log('✓ CartDrawer Escape key dismissal verified');

const chatbotContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'chat', 'ChatbotWidget.jsx'), 'utf8');
assert(
  chatbotContent.includes("e.key === 'Escape'") && chatbotContent.includes('setShowGreeting(false)'),
  'ChatbotWidget.jsx must listen for Escape key to dismiss greeting & close chat'
);
console.log('✓ ChatbotWidget Escape key dismissal verified');

const navbarContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'layout', 'Navbar.jsx'), 'utf8');
assert(
  navbarContent.includes("e.key === 'Escape'") && navbarContent.includes('setIsMobileMenuOpen(false)'),
  'Navbar.jsx must listen for Escape key to close mobile menu'
);
console.log('✓ Navbar mobile menu Escape key dismissal verified');

// 2. Verify Visible Focus Ring Accessibility Floor
const globalsCss = fs.readFileSync(path.join(workspaceRoot, 'src', 'styles', 'globals.css'), 'utf8');
assert(
  globalsCss.includes(':focus-visible') && globalsCss.includes('outline: var(--focus-ring-width)'),
  'globals.css must enforce visible focus rings on :focus-visible'
);
console.log('✓ Visible keyboard focus ring verified in globals.css');

// 3. Verify Font Loading Strategy in index.html
const indexHtml = fs.readFileSync(path.join(workspaceRoot, 'index.html'), 'utf8');
assert(
  indexHtml.includes('display=swap') &&
  indexHtml.includes('rel="preconnect" href="https://fonts.googleapis.com"') &&
  indexHtml.includes('rel="preconnect" href="https://fonts.gstatic.com"'),
  'index.html must preconnect to Google Fonts and use display=swap for zero FOUT layout stability'
);
console.log('✓ Font loading strategy (preconnect + display=swap) verified');

// 4. Verify Lazy-Loading & Media Optimization
const locationContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'StoreLocation.jsx'), 'utf8');
assert(
  locationContent.includes('loading="lazy"') && locationContent.includes('title="UrbanNest Store Location Map"'),
  'StoreLocation.jsx iframe must specify loading="lazy" and descriptive title'
);


const cardContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'ui', 'Card.jsx'), 'utf8');
assert(
  cardContent.includes('loading="lazy"') && cardContent.includes('decoding="async"'),
  'Card.jsx CardMedia must specify loading="lazy" and decoding="async"'
);
console.log('✓ Image & iframe lazy loading and async decoding verified');

// 5. Verify Form Accessibility & ARIA Landmarks
const queryFormContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'forms', 'QueryForm.jsx'), 'utf8');
assert(
  queryFormContent.includes('htmlFor="query-name"') &&
  queryFormContent.includes('htmlFor="query-email"') &&
  queryFormContent.includes('htmlFor="query-message"') &&
  queryFormContent.includes('aria-required="true"') &&
  queryFormContent.includes('role="alert"'),
  'QueryForm.jsx must have accessible labels, aria-required, and role="alert" for validation errors'
);
console.log('✓ Form accessibility (labels, aria-required, inline alerts) verified');


console.log('✅ All Step 20 Performance & Accessibility assertions passed successfully!');
