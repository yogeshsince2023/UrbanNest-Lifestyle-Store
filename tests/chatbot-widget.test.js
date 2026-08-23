import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting N8N Chatbot Widget verification suite...');

// 1. Verify ChatbotWidget.jsx exists
const chatbotPath = path.join(workspaceRoot, 'src', 'components', 'chat', 'ChatbotWidget.jsx');
assert(fs.existsSync(chatbotPath), 'ChatbotWidget.jsx must exist at src/components/chat/ChatbotWidget.jsx');
const chatbotContent = fs.readFileSync(chatbotPath, 'utf8');

// 2. Verify chat/index.js exports ChatbotWidget
const chatIndexPath = path.join(workspaceRoot, 'src', 'components', 'chat', 'index.js');
assert(fs.existsSync(chatIndexPath), 'chat/index.js must exist');
const chatIndexContent = fs.readFileSync(chatIndexPath, 'utf8');
assert(chatIndexContent.includes('ChatbotWidget'), 'chat/index.js must export ChatbotWidget');

// 3. Verify @n8n/chat integration
assert(
  chatbotContent.includes('@n8n/chat'),
  'ChatbotWidget must import and integrate the @n8n/chat library'
);
assert(
  chatbotContent.includes('DEFAULT_CHATBOT_WEBHOOK_URL') || chatbotContent.includes('VITE_N8N_CHATBOT_URL'),
  'ChatbotWidget must configure the N8N webhook URL'
);

// 4. Verify Proactive Greeting
assert(
  chatbotContent.includes('showGreeting') && chatbotContent.includes('setTimeout'),
  'ChatbotWidget must implement a proactive greeting timer'
);

// 5. Verify Escape Key and Close Handlers
assert(
  chatbotContent.includes('Escape') && chatbotContent.includes('setIsOpen'),
  'ChatbotWidget must dismiss on Escape key'
);

console.log('✅ All N8N Chatbot Widget assertions passed successfully!');
