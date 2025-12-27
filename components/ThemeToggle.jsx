'use client';

import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from './ThemeProvider';

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        size="small"
        sx={{
          color: 'text.primary',
          width: '32px',
          height: '32px',
          padding: '6px',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.05)',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.1)',
            borderColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(255, 255, 255, 0.2)',
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem',
          },
        }}
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}

