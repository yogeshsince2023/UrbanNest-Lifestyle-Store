import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextInstance';


/**
 * Custom hook to consume the ThemeContext
 * @returns {{ theme: 'light' | 'dark', isDark: boolean, toggleTheme: Function, setTheme: Function }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
