import { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './themeContextInstance';

const STORAGE_KEY = 'urbannest_lifestyle_theme';


/**
 * Resolve initial theme preference with localStorage persistence & system fallback
 * @returns {'light' | 'dark'}
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // LocalStorage unavailable
  }

  // System preference fallback
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * ThemeProvider Component
 * Manages 'light' | 'dark' mode with localStorage persistence,
 * document root classes, color-scheme property, and smooth transitions
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  const applyThemeToDocument = useCallback((targetTheme, withTransition = false) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const isReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Apply brief smooth transition class if motion is allowed
    if (withTransition && !isReducedMotion) {
      root.classList.add('theme-transitioning');
      window.clearTimeout(window.__themeTransitionTimeout);
      window.__themeTransitionTimeout = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 300);
    }

    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, []);

  // Initial mount application
  useEffect(() => {
    applyThemeToDocument(theme, false);
  }, [applyThemeToDocument, theme]);

  // Listen to system preference changes if user hasn't explicitly set a preference in storage
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          const newTheme = e.matches ? 'dark' : 'light';
          setThemeState(newTheme);
          applyThemeToDocument(newTheme, true);
        }
      } catch {
        // LocalStorage access error
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [applyThemeToDocument]);

  const setTheme = useCallback((newTheme) => {
    const validTheme = newTheme === 'dark' ? 'dark' : 'light';
    setThemeState(validTheme);
    applyThemeToDocument(validTheme, true);
    try {
      localStorage.setItem(STORAGE_KEY, validTheme);
    } catch {
      // Storage full or restricted
    }
  }, [applyThemeToDocument]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
