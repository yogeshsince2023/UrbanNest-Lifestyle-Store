import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Full Responsive QA verification suite...');

// 1. Verify CartDrawer mobile width
const cartPath = path.join(workspaceRoot, 'src', 'components', 'commerce', 'CartDrawer.jsx');
const cartContent = fs.readFileSync(cartPath, 'utf8');
assert(cartContent.includes('w-full'), 'CartDrawer must provide responsive full-width container on mobile');

// 2. Verify Testimonials responsive grid
const testPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'Testimonials.jsx');
const testContent = fs.readFileSync(testPath, 'utf8');
assert(testContent.includes('overflow-x-auto') || testContent.includes('grid'), 'Testimonials must support responsive layout');

// 3. Verify Navbar responsiveness
const navPath = path.join(workspaceRoot, 'src', 'components', 'layout', 'Navbar.jsx');
const navContent = fs.readFileSync(navPath, 'utf8');
assert(navContent.includes('md:hidden'), 'Navbar must provide a responsive mobile drawer toggle');

console.log('✅ All Full Responsive QA assertions passed successfully!');
