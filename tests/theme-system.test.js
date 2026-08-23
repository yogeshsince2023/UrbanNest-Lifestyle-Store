import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Dark/Light Theme System verification suite...');

// 1. Verify ThemeContext.jsx exists
const contextPath = path.join(workspaceRoot, 'src', 'context', 'ThemeContext.jsx');
assert(fs.existsSync(contextPath), 'ThemeContext.jsx must exist at src/context/ThemeContext.jsx');
const contextContent = fs.readFileSync(contextPath, 'utf8');

// 2. Verify variables.css tokens
const cssPath = path.join(workspaceRoot, 'src', 'styles', 'variables.css');
assert(fs.existsSync(cssPath), 'variables.css must exist');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(
  cssContent.includes('--color-paper') && cssContent.includes('--color-ink'),
  'variables.css must declare core paper and ink color tokens'
);
assert(
  cssContent.includes('.dark') || cssContent.includes('[data-theme="dark"]'),
  'variables.css must declare dark mode theme tokens'
);

console.log('✅ All Dark/Light Theme System assertions passed successfully!');
