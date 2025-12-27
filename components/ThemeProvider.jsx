'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from '@/lib/theme';

const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('themeMode') || 'light';
    setMode(savedMode);
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newMode);
    }
  };

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode, mounted]);

  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

