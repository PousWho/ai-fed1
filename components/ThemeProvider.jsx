'use client';

import { useEffect, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { MotionConfig } from 'framer-motion';
import getTheme from '@/lib/theme';

const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const mode = 'light'; // Всегда используем светлую тему

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleColorMode = () => {}; // Пустая функция для совместимости

  const theme = getTheme();

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

