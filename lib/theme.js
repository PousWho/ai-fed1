import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#0039a6', // federation-blue
      light: '#2563eb',
      dark: '#002080',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d52b1e', // federation-red
      light: '#ff5742',
      dark: '#a01e14',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'dark' ? '#0a0e1a' : '#ffffff',
      paper: mode === 'dark' ? 'rgba(26, 32, 51, 0.8)' : '#f8f9fa',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#212529',
      secondary: mode === 'dark' ? '#b0b8c4' : '#6c757d',
    },
  },
  typography: {
    fontFamily: [
      'var(--font-geist-sans)',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : '#ffffff',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(0, 86, 179, 0.2)',
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 2px 8px rgba(0, 86, 179, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)'
              : 'linear-gradient(135deg, rgba(0, 86, 179, 0.05) 0%, rgba(0, 86, 179, 0) 100%)',
            pointerEvents: 'none',
          },
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : '#f8f9fa',
            boxShadow: mode === 'dark'
              ? '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 12px rgba(0, 86, 179, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
            borderColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(0, 86, 179, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          backgroundColor: '#0039a6',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 57, 166, 0.3)',
          '&:hover': {
            backgroundColor: '#002080',
            boxShadow: '0 6px 20px rgba(0, 57, 166, 0.4)',
          },
        },
        outlined: {
          backgroundColor: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : '#ffffff',
          border: mode === 'dark'
            ? '1px solid rgba(0, 57, 166, 0.5)'
            : '1px solid rgba(0, 86, 179, 0.3)',
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : '#f8f9fa',
            border: mode === 'dark'
              ? '1px solid rgba(0, 57, 166, 0.7)'
              : '1px solid rgba(0, 86, 179, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: mode === 'dark'
            ? 'rgba(26, 32, 51, 0.4)'
            : '#ffffff',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(0, 86, 179, 0.2)',
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 4px 16px rgba(0, 86, 179, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: mode === 'dark'
              ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0, 86, 179, 0.2), transparent)',
            pointerEvents: 'none',
          },
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(26, 32, 51, 0.6)'
              : '#ffffff',
            boxShadow: mode === 'dark'
              ? '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 8px 24px rgba(0, 86, 179, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-6px) scale(1.02)',
            borderColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(0, 86, 179, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: mode === 'dark'
            ? 'rgba(26, 32, 51, 0.4)'
            : '#f8f9fa',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(0, 86, 179, 0.15)',
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 4px 16px rgba(0, 86, 179, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        },
        elevation1: {
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 4px 16px rgba(0, 86, 179, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        },
        elevation4: {
          boxShadow: mode === 'dark'
            ? '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 8px 24px rgba(0, 86, 179, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: mode === 'dark'
            ? 'rgba(26, 32, 51, 0.6)'
            : 'rgba(255, 255, 255, 0.95)',
          border: 'none',
          borderBottom: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(0, 86, 179, 0.15)',
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 2px 8px rgba(0, 86, 179, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: mode === 'dark'
              ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0, 86, 179, 0.2), transparent)',
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: mode === 'dark'
              ? 'rgba(26, 32, 51, 0.6)'
              : '#ffffff',
            '&:hover fieldset': {
              borderColor: '#0039a6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0039a6',
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default getTheme;
