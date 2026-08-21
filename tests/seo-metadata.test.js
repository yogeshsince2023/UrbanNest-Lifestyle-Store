import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 19 SEO, Open Graph & Structured Data verification suite...');

// 1. Verify index.html Primary SEO, Canonical, OG & Twitter Meta Tags
const indexHtmlPath = path.join(workspaceRoot, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'index.html must exist at project root');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Title & Description
assert(
  indexHtml.includes('<title>UrbanNest Lifestyle Store') && indexHtml.includes('Mindful Home Décor, Gifts &amp; Stationery'),
  'index.html must contain descriptive title'
);
assert(
  indexHtml.includes('<meta name="description"'),
  'index.html must contain meta description'
);

// Canonical URL
assert(
  indexHtml.includes('<link rel="canonical" href="https://urbannest-lifestyle.store/"'),
  'index.html must contain canonical link tag'
);

// Open Graph Tags
const requiredOgTags = ['og:type', 'og:url', 'og:site_name', 'og:title', 'og:description', 'og:image'];
for (const tag of requiredOgTags) {
  assert(
    indexHtml.includes(`property="${tag}"`),
    `index.html must include Open Graph tag: ${tag}`
  );
}
console.log('✓ Open Graph tags verified:', requiredOgTags.join(', '));

// Twitter Card Tags
const requiredTwitterTags = ['twitter:card', 'twitter:url', 'twitter:title', 'twitter:description', 'twitter:image'];
for (const tag of requiredTwitterTags) {
  assert(
    indexHtml.includes(`name="${tag}"`),
    `index.html must include Twitter Card tag: ${tag}`
  );
}
console.log('✓ Twitter Card tags verified:', requiredTwitterTags.join(', '));

// 2. Verify JSON-LD Structured Data Schema
const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(jsonLdMatch && jsonLdMatch[1], 'index.html must contain a JSON-LD structured data script');

const structuredData = JSON.parse(jsonLdMatch[1].trim());
assert.strictEqual(structuredData['@context'], 'https://schema.org', 'JSON-LD @context must be schema.org');
assert(
  Array.isArray(structuredData['@type']) && structuredData['@type'].includes('LocalBusiness') && structuredData['@type'].includes('Store'),
  'JSON-LD @type must include LocalBusiness and Store'
);
assert.strictEqual(structuredData.name, 'UrbanNest Lifestyle Store', 'JSON-LD name must be UrbanNest Lifestyle Store');
assert(structuredData.address && structuredData.address.streetAddress, 'JSON-LD must include physical postal address');
assert(structuredData.geo && structuredData.geo.latitude === 37.9060, 'JSON-LD must include geo coordinates');
assert(structuredData.priceRange, 'JSON-LD must include priceRange');
assert(structuredData.openingHoursSpecification && structuredData.openingHoursSpecification.length >= 2, 'JSON-LD must include openingHoursSpecification');
console.log('✓ JSON-LD LocalBusiness & Store schema markup parsed and verified');

// 3. Verify public/robots.txt
const robotsPath = path.join(workspaceRoot, 'public', 'robots.txt');
assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(
  robotsContent.includes('User-agent: *') && robotsContent.includes('Allow: /') && robotsContent.includes('sitemap.xml'),
  'robots.txt must allow crawlers and link to sitemap.xml'
);
console.log('✓ public/robots.txt verified');

// 4. Verify public/sitemap.xml
const sitemapPath = path.join(workspaceRoot, 'public', 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(
  sitemapContent.includes('<urlset') &&
  sitemapContent.includes('<loc>https://urbannest-lifestyle.store/</loc>') &&
  sitemapContent.includes('#shop') &&
  sitemapContent.includes('#about') &&
  sitemapContent.includes('#contact'),
  'sitemap.xml must contain valid XML URL entries for canonical site and sections'
);
console.log('✓ public/sitemap.xml verified');

// 5. Verify OG Image Guide
const ogGuidePath = path.join(workspaceRoot, 'public', 'OG_IMAGE_GUIDE.md');
assert(fs.existsSync(ogGuidePath), 'public/OG_IMAGE_GUIDE.md must exist');
console.log('✓ public/OG_IMAGE_GUIDE.md verified');

console.log('✅ All Step 19 SEO & Social Sharing assertions passed successfully!');
