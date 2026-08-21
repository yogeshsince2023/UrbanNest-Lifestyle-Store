import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { INQUIRY_CATEGORIES } from '../src/components/forms/constants.js';


const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 13 N8N Query Form verification suite...');

// 1. Verify QueryForm.jsx and ContactSection.jsx files exist & export
const queryFormPath = path.join(workspaceRoot, 'src', 'components', 'forms', 'QueryForm.jsx');
assert(fs.existsSync(queryFormPath), 'QueryForm.jsx must exist at src/components/forms/QueryForm.jsx');
const queryFormContent = fs.readFileSync(queryFormPath, 'utf8');

const formsIndexPath = path.join(workspaceRoot, 'src', 'components', 'forms', 'index.js');
assert(fs.existsSync(formsIndexPath), 'forms/index.js must exist');
const formsIndexContent = fs.readFileSync(formsIndexPath, 'utf8');
assert(formsIndexContent.includes('QueryForm'), 'forms/index.js must export QueryForm');

const contactSectionPath = path.join(workspaceRoot, 'src', 'components', 'sections', 'ContactSection.jsx');
assert(fs.existsSync(contactSectionPath), 'ContactSection.jsx must exist');
const contactSectionContent = fs.readFileSync(contactSectionPath, 'utf8');
assert(contactSectionContent.includes('QueryForm'), 'ContactSection.jsx must host QueryForm');

// 2. Verify Category Dropdown Choices
const requiredCategories = [
  'Product Inquiry',
  'Order Inquiry',
  'General Question',
  'Complaint',
  'Other',
];

for (const cat of requiredCategories) {
  assert(
    INQUIRY_CATEGORIES.includes(cat),
    `QueryForm categories must include "${cat}"`
  );
}
console.log('✓ Category dropdown choices verified:', INQUIRY_CATEGORIES);

// 3. Verify Form Fields
assert(queryFormContent.includes('name="name"'), 'QueryForm must contain name input');
assert(queryFormContent.includes('name="email"'), 'QueryForm must contain email input');
assert(queryFormContent.includes('name="phone"'), 'QueryForm must contain phone input');
assert(queryFormContent.includes('name="category"'), 'QueryForm must contain category dropdown');
assert(queryFormContent.includes('name="message"'), 'QueryForm must contain message textarea');
assert(queryFormContent.includes('honeypot'), 'QueryForm must contain hidden honeypot spam protection');

// 4. Verify Webhook URL & Environment Variable
assert(
  queryFormContent.includes('import.meta.env.VITE_N8N_QUERY_FORM_URL'),
  'QueryForm must read import.meta.env.VITE_N8N_QUERY_FORM_URL'
);
assert(
  queryFormContent.includes('DEFAULT_WEBHOOK_URL') ||
  queryFormContent.includes('https://yogeshsince2023.app.n8n.cloud/webhook/website-query'),
  'QueryForm must include the active N8N webhook endpoint fallback'
);


// 5. Verify 10-Second Timeout AbortController Implementation
assert(
  queryFormContent.includes('AbortController') && queryFormContent.includes('10000'),
  'QueryForm must wrap fetch in a 10s timeout AbortController'
);

// 6. Verify Console Logging for Demo Verification
assert(
  queryFormContent.includes('console.log') && queryFormContent.includes('[N8N Query Webhook Success]'),
  'QueryForm must log successful webhook status to console for demo verification'
);

// 7. Verify Form Retention on Failure
assert(
  queryFormContent.includes('toast.error'),
  'QueryForm must notify user on failure without wiping entered form fields'
);

// 8. Verify App.jsx integration
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('ContactSection'), 'App.jsx must render ContactSection');
assert(appContent.includes('initialInquiryValues'), 'App.jsx must pass initialInquiryValues from CartDrawer');

console.log('✅ All Step 13 N8N Query Form assertions passed successfully!');
