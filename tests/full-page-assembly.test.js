import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Full Page Assembly verification suite...');

// 1. Verify App.jsx exists
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
assert(fs.existsSync(appPath), 'App.jsx must exist at src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');

// 2. Verify Providers and Routing
assert(appContent.includes('BrowserRouter') || appContent.includes('Routes'), 'App.jsx must configure React Router');
assert(appContent.includes('CartProvider'), 'App.jsx must wrap application in CartProvider');
assert(appContent.includes('ThemeProvider'), 'App.jsx must wrap application in ThemeProvider');

// 3. Verify Page Modules exist
const pages = ['HomePage.jsx', 'ShopPage.jsx', 'AboutPage.jsx', 'ReviewsPage.jsx', 'ContactPage.jsx'];
for (const page of pages) {
  const pagePath = path.join(workspaceRoot, 'src', 'pages', page);
  assert(fs.existsSync(pagePath), `src/pages/${page} must exist`);
}

console.log('✅ All Full Page Assembly assertions passed successfully!');
