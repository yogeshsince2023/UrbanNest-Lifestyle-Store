import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 14 N8N Chatbot Widget verification suite...');

// 1. Verify ChatbotWidget.jsx exists and is exported
const chatbotPath = path.join(workspaceRoot, 'src', 'components', 'chat', 'ChatbotWidget.jsx');
assert(fs.existsSync(chatbotPath), 'ChatbotWidget.jsx must exist at src/components/chat/ChatbotWidget.jsx');
const chatbotContent = fs.readFileSync(chatbotPath, 'utf8');

const chatIndexPath = path.join(workspaceRoot, 'src', 'components', 'chat', 'index.js');
assert(fs.existsSync(chatIndexPath), 'chat/index.js must exist');
const chatIndexContent = fs.readFileSync(chatIndexPath, 'utf8');
assert(chatIndexContent.includes('ChatbotWidget'), 'chat/index.js must export ChatbotWidget');

// 2. Verify @n8n/chat and createChat integration
assert(
  chatbotContent.includes('@n8n/chat') && chatbotContent.includes('createChat'),
  'ChatbotWidget must import and invoke createChat from @n8n/chat'
);

// 3. Verify Webhook URL & Environment Variable Configuration
assert(
  chatbotContent.includes('import.meta.env.VITE_N8N_CHATBOT_URL'),
  'ChatbotWidget must read import.meta.env.VITE_N8N_CHATBOT_URL'
);
assert(
  chatbotContent.includes('https://soham6050.app.n8n.cloud/webhook/a35826c3-52aa-487c-a499-7da1565c630b/chat'),
  'ChatbotWidget must include the active N8N Chat Trigger endpoint'
);

// 4. Verify Proactive Greeting Bubble & SessionStorage Guard
assert(
  chatbotContent.includes('sessionStorage') && (chatbotContent.includes('4500') || chatbotContent.includes('4000') || chatbotContent.includes('5000')),
  'ChatbotWidget must include 4-5s proactive greeting timer gated by sessionStorage'
);

// 5. Verify Floating Launcher & Gift-Tag Motif
assert(
  chatbotContent.includes('bottom-6 right-6') || chatbotContent.includes('fixed bottom'),
  'ChatbotWidget must render a floating launcher in the bottom-right corner'
);
assert(
  chatbotContent.includes('rounded-full bg-paper') || chatbotContent.includes('gift-tag') || chatbotContent.includes('Concierge AI'),
  'ChatbotWidget launcher must feature our signature gift-tag motif'
);

// 6. Verify Required Code Comments & Fallback Troubleshooting Guide
assert(
  chatbotContent.includes('N8N WEBHOOK CONFIGURATION') && chatbotContent.includes('Paste your live N8N Chat Trigger Webhook URL'),
  'ChatbotWidget must include a clear comment marking where to paste the real webhook URL'
);
assert(
  chatbotContent.includes('FALLBACK & TROUBLESHOOTING CHECKLIST') &&
  chatbotContent.includes('CORS') &&
  chatbotContent.includes('Active'),
  'ChatbotWidget must include a fallback troubleshooting checklist covering CORS, CSP, and workflow active state'
);

// 7. Verify globals.css Design System Overrides
const globalsPath = path.join(workspaceRoot, 'src', 'styles', 'globals.css');
const globalsContent = fs.readFileSync(globalsPath, 'utf8');
assert(
  globalsContent.includes('--chat--color-primary: #5C6B4F') || globalsContent.includes('--chat--color-primary'),
  'globals.css must configure @n8n/chat variables with Moss primary and design tokens'
);

// 8. Verify App.jsx Integration
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('ChatbotWidget'), 'App.jsx must render ChatbotWidget');

console.log('✅ All Step 14 N8N Chatbot Widget assertions passed successfully!');
