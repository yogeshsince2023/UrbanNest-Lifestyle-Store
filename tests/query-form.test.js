import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting N8N Query Form verification suite...');

// 1. Verify QueryForm.jsx exists
const formPath = path.join(workspaceRoot, 'src', 'components', 'forms', 'QueryForm.jsx');
assert(fs.existsSync(formPath), 'QueryForm.jsx must exist at src/components/forms/QueryForm.jsx');
const formContent = fs.readFileSync(formPath, 'utf8');

// 2. Verify forms/index.js exports QueryForm
const formsIndexPath = path.join(workspaceRoot, 'src', 'components', 'forms', 'index.js');
assert(fs.existsSync(formsIndexPath), 'forms/index.js must exist');
const formsIndexContent = fs.readFileSync(formsIndexPath, 'utf8');
assert(formsIndexContent.includes('QueryForm'), 'forms/index.js must export QueryForm');

// 3. Verify ContactSection.jsx renders QueryForm
const contactSectionPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'ContactSection.jsx');
assert(fs.existsSync(contactSectionPath), 'ContactSection.jsx must exist');
const contactSectionContent = fs.readFileSync(contactSectionPath, 'utf8');
assert(contactSectionContent.includes('QueryForm'), 'ContactSection.jsx must import and render QueryForm');

// 4. Verify ContactPage.jsx renders ContactSection
const contactPagePath = path.join(workspaceRoot, 'src', 'pages', 'ContactPage.jsx');
const contactPageContent = fs.readFileSync(contactPagePath, 'utf8');
assert(contactPageContent.includes('ContactSection'), 'ContactPage.jsx must render ContactSection');

// 5. Verify N8N Webhook payload structure
assert(
  formContent.includes('fetch(') && formContent.includes('application/json'),
  'QueryForm.jsx must submit formData as JSON payload via fetch'
);

console.log('✅ All N8N Query Form assertions passed successfully!');
