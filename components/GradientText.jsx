'use client';

import { Typography, useTheme } from '@mui/material';

export default function GradientText({ children, variant = 'h3', component = 'span', sx = {} }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  
  return (
    <Typography
      variant={variant}
      component={component}
      sx={{
        background: isLight 
          ? 'linear-gradient(90deg, #000000 0%, #0039a6 50%, #000000 100%)'
          : 'linear-gradient(90deg, #d1d5db 0%, #0039a6 50%, #d1d5db 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradient-shift 5s ease infinite',
        display: 'inline-block',
        fontWeight: 700,
        filter: isLight ? 'drop-shadow(0 2px 16px rgba(255, 255, 255, 0.4)) drop-shadow(0 1px 8px rgba(255, 255, 255, 0.3))' : 'none',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
