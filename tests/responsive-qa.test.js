import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 21 Full Responsive QA verification suite...');

// 1. Verify Cart Drawer Mobile Width & Sizing
const cartDrawerContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'commerce', 'CartDrawer.jsx'), 'utf8');
assert(
  cartDrawerContent.includes('w-full') && cartDrawerContent.includes('max-w-md'),
  'CartDrawer.jsx must use w-full with max-w-md to fit 375px mobile viewports without overflow'
);
console.log('✓ CartDrawer mobile responsiveness verified (w-full max-w-md)');

// 2. Verify Testimonials Carousel Mobile Touch & Snap Behavior
const testimonialsContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'Testimonials.jsx'), 'utf8');
assert(
  testimonialsContent.includes('overflow-x-auto') &&
  testimonialsContent.includes('snap-x') &&
  testimonialsContent.includes('snap-mandatory') &&
  testimonialsContent.includes('lg:grid-cols-3'),
  'Testimonials.jsx must use snap-x snap-mandatory on mobile and 3-column grid on desktop'
);
console.log('✓ Testimonials mobile touch snap & desktop 3-up grid verified');

// 3. Verify Category and Price Filter Rows Wrap Instead of Overflowing
const categoriesContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'commerce', 'Categories.jsx'), 'utf8');
assert(
  categoriesContent.includes('flex-wrap'),
  'Categories.jsx must use flex-wrap to prevent horizontal overflow on small screens'
);

const filtersContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'commerce', 'ProductFilters.jsx'), 'utf8');
assert(
  filtersContent.includes('flex-wrap'),
  'ProductFilters.jsx must use flex-wrap to prevent horizontal overflow on small screens'
);
console.log('✓ Categories & Price Filters flex-wrap verified');

// 4. Verify Floating Chatbot & WhatsApp Button Non-Overlapping Coordinates
const whatsappContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'common', 'WhatsAppButton.jsx'), 'utf8');
const chatbotContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'chat', 'ChatbotWidget.jsx'), 'utf8');
assert(
  whatsappContent.includes('left-4') || whatsappContent.includes('left-6'),
  'WhatsApp button must be positioned on the bottom-left'
);
assert(
  chatbotContent.includes('right-4') || chatbotContent.includes('right-6'),
  'Chatbot widget must be positioned on the bottom-right'
);
console.log('✓ Floating actions clearance verified (WhatsApp on Left, Chatbot on Right)');

// 5. Verify Zero Horizontal Scroll Root Rules
const globalsCss = fs.readFileSync(path.join(workspaceRoot, 'src', 'styles', 'globals.css'), 'utf8');
assert(
  globalsCss.includes('overflow-x: hidden;'),
  'globals.css body must enforce overflow-x: hidden to prevent horizontal scroll'
);
console.log('✓ Zero horizontal overflow-x: hidden rule verified');

// 6. Verify Minimum Touch Targets on Button and Tag Primitives
const buttonContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'ui', 'Button.jsx'), 'utf8');
assert(
  buttonContent.includes('min-h-[44px]'),
  'Button.jsx must provide >= 44px touch target height on standard interactive buttons'
);

const tagContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'ui', 'Tag.jsx'), 'utf8');
assert(
  tagContent.includes('min-h-[36px]') || tagContent.includes('min-h-[40px]'),
  'Tag.jsx must provide comfortable touch targets for mobile pill interactions'
);
console.log('✓ Touch target accessibility verified (>=44px buttons, comfortable tag pills)');

console.log('✅ All Step 21 Full Responsive QA assertions passed successfully!');
