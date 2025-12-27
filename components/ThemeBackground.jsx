'use client';

import Aurora from './Aurora';
import { useThemeMode } from './ThemeProvider';

export default function ThemeBackground() {
  const { mode } = useThemeMode();
  
  const backgroundColor = mode === 'dark' ? '#0a0e1a' : '#F0F8FB';
  const auroraColors = mode === 'dark' 
    ? ["#1a2332", "#0039a6", "#1a2332"]
    : ["#ffffff", "#0039a6", "#ffffff"];

  return (
    <div 
      className="fixed inset-0 w-screen h-screen pointer-events-none theme-background" 
      style={{ 
        zIndex: 0, 
        backgroundColor,
        transition: 'background-color 0.3s ease'
      }}
    >
      <Aurora
        colorStops={auroraColors}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ zIndex: 1 }}></div>
    </div>
  );
}

