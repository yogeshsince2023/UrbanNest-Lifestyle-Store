import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting SEO, Open Graph & Structured Data verification suite...');

// 1. Verify index.html exists
const indexPath = path.join(workspaceRoot, 'index.html');
assert(fs.existsSync(indexPath), 'index.html must exist at project root');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// 2. Open Graph Tags
assert(indexContent.includes('og:type'), 'index.html must define og:type');
assert(indexContent.includes('og:title'), 'index.html must define og:title');
assert(indexContent.includes('og:description'), 'index.html must define og:description');
assert(indexContent.includes('og:image'), 'index.html must define og:image');

// 3. Twitter Card Tags
assert(indexContent.includes('twitter:card'), 'index.html must define twitter:card');
assert(indexContent.includes('twitter:title'), 'index.html must define twitter:title');

// 4. Structured Data
assert(indexContent.includes('application/ld+json'), 'index.html must include JSON-LD structured data');
assert(indexContent.includes('LocalBusiness') || indexContent.includes('Store'), 'index.html must include LocalBusiness or Store schema');

// 5. Robots.txt and Sitemap.xml
assert(fs.existsSync(path.join(workspaceRoot, 'public', 'robots.txt')), 'public/robots.txt must exist');
assert(fs.existsSync(path.join(workspaceRoot, 'public', 'sitemap.xml')), 'public/sitemap.xml must exist');

console.log('✅ All SEO & Social Sharing assertions passed successfully!');
