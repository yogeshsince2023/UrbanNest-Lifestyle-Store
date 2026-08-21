import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 17 Full Page Assembly verification suite...');

// 1. Verify App.jsx exists and has exact required component sequence
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
assert(fs.existsSync(appPath), 'App.jsx must exist at src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');

const expectedSequence = [
  'Navbar',
  'CartDrawer',
  'Hero',
  'Offers',
  'AboutShop',
  'ShopSection',
  'WhyChooseUs',
  'Testimonials',
  'StoreLocation',
  'ContactSection',
  'Footer',
  'ChatbotWidget',
  'WhatsAppButton',
];

let lastIndex = -1;
for (const comp of expectedSequence) {
  const currentIndex = appContent.indexOf(`<${comp}`);
  assert(
    currentIndex !== -1,
    `App.jsx must render <${comp} /> component`
  );
  assert(
    currentIndex > lastIndex,
    `Component <${comp} /> is out of sequence! Expected sequence: ${expectedSequence.join(' -> ')}`
  );
  lastIndex = currentIndex;
}
console.log('✓ Full Page sequence verified in exact order:', expectedSequence.join(' → '));

// 2. Verify Root Providers
assert(
  appContent.includes('<ThemeProvider>') &&
  appContent.includes('<CartProvider>') &&
  appContent.indexOf('<ThemeProvider>') < appContent.indexOf('<CartProvider>'),
  'App.jsx root must wrap StoreApp in ThemeProvider and CartProvider'
);
console.log('✓ ThemeProvider and CartProvider root wrapping verified');

// 3. Verify Section IDs for Smooth Scroll Navigation
const requiredSectionIds = ['home', 'shop', 'about', 'reviews', 'location', 'contact'];
assert.strictEqual(requiredSectionIds.length, 6, 'There must be 6 core landmark section IDs');

const heroContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'Hero.jsx'), 'utf8');
const aboutContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'AboutShop.jsx'), 'utf8');
const shopContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'ShopSection.jsx'), 'utf8');
const testimonialsContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'Testimonials.jsx'), 'utf8');
const locationContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'StoreLocation.jsx'), 'utf8');
const contactContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'components', 'sections', 'ContactSection.jsx'), 'utf8');


assert(heroContent.includes('id="home"') || appContent.includes('id="home"'), 'Hero section must have id="home"');
assert(aboutContent.includes('id="about"'), 'About section must have id="about"');
assert(shopContent.includes('id="shop"'), 'Shop section must have id="shop"');
assert(testimonialsContent.includes('id="reviews"'), 'Testimonials section must have id="reviews"');
assert(locationContent.includes('id="location"'), 'StoreLocation section must have id="location"');
assert(contactContent.includes('id="contact"'), 'Contact section must have id="contact"');

console.log('✓ All landmark section IDs verified (#home, #about, #shop, #reviews, #location, #contact)');

// 4. Verify Global Smooth Scrolling
const globalsContent = fs.readFileSync(path.join(workspaceRoot, 'src', 'styles', 'globals.css'), 'utf8');
assert(
  globalsContent.includes('scroll-behavior: smooth'),
  'globals.css must define scroll-behavior: smooth for global smooth scrolling'
);
console.log('✓ Global smooth-scrolling rule verified');

// 5. Verify Persistent Floating Widgets
assert(
  appContent.includes('<ChatbotWidget />') &&
  appContent.includes('<WhatsAppButton />') &&
  appContent.includes('<CartDrawer'),
  'App.jsx must globally mount ChatbotWidget, WhatsAppButton, and CartDrawer'
);
console.log('✓ Global persistent floating widgets verified');

console.log('✅ All Step 17 Full Page Assembly assertions passed successfully!');
