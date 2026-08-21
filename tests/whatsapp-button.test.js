import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  DEFAULT_WHATSAPP_PHONE,
  DEFAULT_WHATSAPP_MESSAGE,
} from '../src/components/common/constants.js';


const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 15 WhatsApp Quick-Contact verification suite...');

// 1. Verify WhatsAppButton.jsx exists and is exported
const whatsappPath = path.join(workspaceRoot, 'src', 'components', 'common', 'WhatsAppButton.jsx');
assert(fs.existsSync(whatsappPath), 'WhatsAppButton.jsx must exist at src/components/common/WhatsAppButton.jsx');
const whatsappContent = fs.readFileSync(whatsappPath, 'utf8');

const commonIndexPath = path.join(workspaceRoot, 'src', 'components', 'common', 'index.js');
assert(fs.existsSync(commonIndexPath), 'common/index.js must exist');
const commonIndexContent = fs.readFileSync(commonIndexPath, 'utf8');
assert(commonIndexContent.includes('WhatsAppButton'), 'common/index.js must export WhatsAppButton');

// 2. Verify WhatsApp pre-filled chat link format
assert(
  whatsappContent.includes('https://wa.me/') && whatsappContent.includes('encodeURIComponent'),
  'WhatsAppButton must format chat link as https://wa.me/<cleanPhone>?text=<encodedText>'
);

// 3. Verify target="_blank" and security attributes
assert(
  whatsappContent.includes('target="_blank"') && whatsappContent.includes('rel="noopener noreferrer"'),
  'WhatsApp link must open in a new tab with rel="noopener noreferrer"'
);

// 4. Verify Brand Green Palette Exception
assert(
  whatsappContent.includes('#25D366') && whatsappContent.includes('#128C7E'),
  'WhatsAppButton must use official brand green #25D366 and hover shade #128C7E'
);

// 5. Verify Safe Viewport Positioning (Bottom-Left clear of Chatbot bottom-right)
assert(
  whatsappContent.includes('bottom-6 left-6') || (whatsappContent.includes('bottom-') && whatsappContent.includes('left-')),
  'WhatsAppButton must be positioned at bottom-left to avoid colliding with the bottom-right chatbot widget'
);

// 6. Verify Intentional Brand Palette Code Comments
assert(
  whatsappContent.includes('WHATSAPP QUICK-CONTACT CONFIGURATION') &&
  whatsappContent.includes('intentional exception to our earth-tone'),
  'WhatsAppButton must document the intentional brand palette exception'
);

// 7. Verify Default Constants
assert(DEFAULT_WHATSAPP_PHONE && DEFAULT_WHATSAPP_PHONE.length >= 10, 'DEFAULT_WHATSAPP_PHONE must be defined');
assert(DEFAULT_WHATSAPP_MESSAGE && DEFAULT_WHATSAPP_MESSAGE.includes('UrbanNest'), 'DEFAULT_WHATSAPP_MESSAGE must mention UrbanNest');
console.log('✓ Default WhatsApp configuration verified:', {
  phone: DEFAULT_WHATSAPP_PHONE,
  message: DEFAULT_WHATSAPP_MESSAGE,
});

// 8. Verify App.jsx Integration
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('WhatsAppButton'), 'App.jsx must render WhatsAppButton');

console.log('✅ All Step 15 WhatsApp Quick-Contact assertions passed successfully!');
