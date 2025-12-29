'use client';

import Aurora from './Aurora';

export default function ThemeBackground() {
  const backgroundColor = '#E8E8E8';
  const auroraColors = ["#FEFEFE", "#FEFEFE", "#FEFEFE"];

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

