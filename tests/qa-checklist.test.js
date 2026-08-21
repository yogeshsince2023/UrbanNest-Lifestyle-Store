import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 22 QA Checklist Document verification suite...');

const checklistPath = path.join(workspaceRoot, 'tests', 'manual-qa-checklist.md');
assert(fs.existsSync(checklistPath), 'tests/manual-qa-checklist.md must exist');
const content = fs.readFileSync(checklistPath, 'utf8');

const requiredTopics = [
  'Section Load & Visual Integrity',
  'Navbar Navigation & Scroll-Spy',
  'Mobile Navigation Drawer',
  'Category + Search + Price Filter Combination',
  'Shopping Cart, Drawer & Order Inquiry Pre-Fill',
  'AI Content-Based Recommendations Relevance',
  'Real Dark / Light Theme System',
  'Testimonials Section & Carousel',
  'Store Location & Interactive Map',
  'Live N8N Query Form',
  'Live N8N Chatbot Widget',
  'Floating WhatsApp Quick-Contact Button',
  'Cross-Browser & Breakpoint Compatibility',
  'prefers-reduced-motion',
];

for (const topic of requiredTopics) {
  assert(
    content.includes(topic),
    `manual-qa-checklist.md must include section covering: ${topic}`
  );
}

console.log(`✓ All ${requiredTopics.length} manual QA protocol areas verified in manual-qa-checklist.md`);
console.log('✅ All Step 22 QA Checklist Document assertions passed successfully!');
