import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 23 Documentation verification suite...');

const requiredDocFiles = [
  'problem-statement.md',
  'proposed-solution.md',
  'tech-stack.md',
  'n8n-integration.md',
  'deployment-guide.md',
  'future-improvements.md',
  'differentiators.md',
];

for (const filename of requiredDocFiles) {
  const filePath = path.join(workspaceRoot, 'docs', filename);
  assert(fs.existsSync(filePath), `docs/${filename} must exist`);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.length > 200, `docs/${filename} must contain comprehensive content`);
  console.log(`✓ docs/${filename} verified (${content.split('\n').length} lines)`);
}

// Check n8n-integration.md mentions webhook configuration
const n8nContent = fs.readFileSync(path.join(workspaceRoot, 'docs', 'n8n-integration.md'), 'utf8');
assert(
  n8nContent.includes('VITE_N8N_QUERY_FORM_URL') &&
  n8nContent.includes('VITE_N8N_CHATBOT_URL') &&
  n8nContent.includes('QueryForm.jsx') &&
  n8nContent.includes('ChatbotWidget.jsx'),
  'n8n-integration.md must explicitly document webhook URL configuration locations'
);
console.log('✓ n8n-integration.md webhook environment variable configuration verified');

// Check differentiators.md mentions extensions beyond brief
const diffContent = fs.readFileSync(path.join(workspaceRoot, 'docs', 'differentiators.md'), 'utf8');
const expectedDiffs = ['cart', 'search', 'filter', 'testimonials', 'map', 'dark mode', 'WhatsApp', 'recommendations', 'SEO'];
for (const term of expectedDiffs) {
  assert(
    diffContent.toLowerCase().includes(term.toLowerCase()),
    `differentiators.md must explicitly mention: ${term}`
  );
}
console.log('✓ differentiators.md verified with all feature extensions beyond brief');

console.log('✅ All Step 23 Documentation assertions passed successfully!');
