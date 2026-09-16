 'use client';
import { Typography } from '@mui/material';
export default function GradientText({ children, variant = 'h3', component = 'span', sx = {} }) {
  return <Typography variant={variant} component={component} sx={{ color: '#1a1d21', fontWeight: 700, letterSpacing: '-.025em', ...sx }}>{children}</Typography>;
}
