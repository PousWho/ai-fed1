import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0039a6', light: '#639eff', dark: '#002d85' },
    secondary: { main: '#d52b1e' },
    background: { default: '#fbfbfa', paper: '#ffffff' },
    text: { primary: '#1a1d21', secondary: '#566273' },
    divider: '#e1e6ed',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-.035em' },
    h2: { fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', lineHeight: 1.18, letterSpacing: '-.025em' },
    h3: { fontWeight: 700, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', lineHeight: 1.25, letterSpacing: '-.02em' },
    h4: { fontWeight: 650, fontSize: '1.5rem', lineHeight: 1.3 },
    h5: { fontWeight: 650, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 650, fontSize: '1.1rem', lineHeight: 1.4 },
    body1: { lineHeight: 1.7 }, body2: { lineHeight: 1.65 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: {
      root: { borderRadius: 999, padding: '12px 24px', transition: 'background-color .2s, box-shadow .2s' },
      contained: { '&:hover': { boxShadow: '0 6px 20px #0039a622' } },
    } },
    MuiCard: { styleOverrides: { root: {
      borderRadius: 24, backgroundImage: 'none', border: '1px solid #e1e6ed',
      boxShadow: '0 8px 32px #132a4506', color: '#1a1d21',
      transition: 'border-color .2s, box-shadow .2s',
      '&[href]:hover': { borderColor: '#0039a6', boxShadow: '0 12px 32px #0039a60d' },
    } } },
    MuiCardContent: { styleOverrides: { root: { padding: 28, '@media (max-width:600px)': { padding: 22 } } } },
    MuiOutlinedInput: { styleOverrides: { root: { backgroundColor: '#fff', borderRadius: 12 } } },
    MuiLink: { styleOverrides: { root: { textUnderlineOffset: '4px' } } },
    MuiAlert: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});
export default function getTheme() { return theme; }
