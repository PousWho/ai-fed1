'use client';

export default function ThemeBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none theme-background"
      aria-hidden="true"
      style={{
        zIndex: 0,
        backgroundColor: '#fbfbfa',
      }}
    />
  );
}

