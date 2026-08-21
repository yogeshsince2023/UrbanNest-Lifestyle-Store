import fs from 'fs';
import path from 'path';
import assert from 'assert';

const workspaceRoot = process.cwd();

console.log('🧪 Starting Step 12 Dark/Light Theme System verification suite...');

// 1. Verify ThemeContext and useTheme files exist
const themeContextPath = path.join(workspaceRoot, 'src', 'context', 'ThemeContext.jsx');
assert(fs.existsSync(themeContextPath), 'ThemeContext.jsx must exist at src/context/ThemeContext.jsx');
const themeContextContent = fs.readFileSync(themeContextPath, 'utf8');
assert(themeContextContent.includes('ThemeProvider'), 'ThemeContext.jsx must export ThemeProvider');
assert(themeContextContent.includes('localStorage'), 'ThemeContext.jsx must support localStorage theme persistence');

const useThemePath = path.join(workspaceRoot, 'src', 'hooks', 'useTheme.js');
assert(fs.existsSync(useThemePath), 'useTheme.js must exist at src/hooks/useTheme.js');

const hooksIndexPath = path.join(workspaceRoot, 'src', 'hooks', 'index.js');
const hooksIndexContent = fs.readFileSync(hooksIndexPath, 'utf8');
assert(hooksIndexContent.includes('useTheme'), 'hooks/index.js must export useTheme');

// 2. Verify variables.css defines warm dark mode token variants
const variablesPath = path.join(workspaceRoot, 'src', 'styles', 'variables.css');
assert(fs.existsSync(variablesPath), 'variables.css must exist');
const variablesContent = fs.readFileSync(variablesPath, 'utf8');

assert(
  variablesContent.includes('.dark') || variablesContent.includes('[data-theme="dark"]'),
  'variables.css must define .dark / [data-theme="dark"] selectors'
);
assert(
  variablesContent.includes('#181614') || variablesContent.includes('--color-paper: #1'),
  'Dark mode Paper must be defined as deep warm charcoal, not pure harsh black #000'
);
assert(
  variablesContent.includes('--color-cloud') && variablesContent.includes('--color-ink'),
  'variables.css must calibrate Cloud and Ink dark variants for proper surface contrast'
);

// 3. Verify globals.css defines smooth transition and reduced motion bypass
const globalsPath = path.join(workspaceRoot, 'src', 'styles', 'globals.css');
const globalsContent = fs.readFileSync(globalsPath, 'utf8');
assert(
  globalsContent.includes('theme-transitioning') || globalsContent.includes('transition: background-color'),
  'globals.css must define smooth color transition on theme toggle'
);
assert(
  globalsContent.includes('prefers-reduced-motion') && globalsContent.includes('transition-duration: 0.001ms'),
  'globals.css must bypass transition immediately when prefers-reduced-motion is active'
);

// 4. Verify tailwind.config.js enables darkMode class
const tailwindConfigPath = path.join(workspaceRoot, 'tailwind.config.js');
const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf8');
assert(
  tailwindConfigContent.includes("darkMode: 'class'") || tailwindConfigContent.includes('darkMode: "class"'),
  'tailwind.config.js must enable class-based dark mode (darkMode: "class")'
);

// 5. Verify Navbar.jsx wires useTheme with animated Sun/Moon toggle
const navbarPath = path.join(workspaceRoot, 'src', 'components', 'layout', 'Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf8');
assert(navbarContent.includes('useTheme'), 'Navbar.jsx must consume useTheme() hook');
assert(
  navbarContent.includes('Sun') && navbarContent.includes('Moon'),
  'Navbar.jsx must render Sun and Moon icons for light/dark switching'
);

// 6. Verify App.jsx wraps with ThemeProvider
const appPath = path.join(workspaceRoot, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('ThemeProvider'), 'App.jsx must wrap application root in ThemeProvider');

console.log('✅ All Step 12 Dark/Light Theme System assertions passed successfully!');
