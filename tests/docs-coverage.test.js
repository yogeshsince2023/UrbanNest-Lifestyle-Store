import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Documentation verification suite...');

const requiredDocFiles = [
  'tech-stack.md',
  'n8n-integration.md',
  'deployment-guide.md',
  'future-improvements.md',
  'ARCHITECTURE.md',
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

console.log('✅ All Documentation assertions passed successfully!');
