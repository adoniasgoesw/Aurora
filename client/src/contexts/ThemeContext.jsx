import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const THEME_KEY = 'theme';
const THEME_VERSION = 'aurora_theme_v2'; // light como primário

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Migração: light é primário agora - reseta se nunca migrou
    if (!localStorage.getItem(THEME_VERSION)) {
      localStorage.setItem(THEME_KEY, 'light');
      localStorage.setItem(THEME_VERSION, 'true');
      return 'light';
    }
    return localStorage.getItem(THEME_KEY) || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
