'use client';

import { Typography } from '@mui/material';

export default function GradientText({ children, variant = 'h3', component = 'span', sx = {} }) {
  return (
    <Typography
      variant={variant}
      component={component}
      sx={{
        background: 'linear-gradient(90deg, #000000 0%, #0039a6 50%, #000000 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradient-shift 5s ease infinite',
        display: 'inline-block',
        fontWeight: 700,
        filter: 'drop-shadow(0 2px 16px rgba(255, 255, 255, 0.4)) drop-shadow(0 1px 8px rgba(255, 255, 255, 0.3))',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
