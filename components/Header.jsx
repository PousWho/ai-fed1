'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Box, 
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'О федерации', href: '/about' },
    { label: 'Направления', href: '/directions' },
    { label: 'Продукты и проекты', href: '/projects' },
    { label: 'Партнерство', href: '/partnership' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Container maxWidth="xl" sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Логотип */}
          <Link href="/" style={{ textDecoration: 'none', marginRight: 'auto' }} onClick={handleLogoClick}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.25rem' },
                whiteSpace: 'nowrap',
                mr: { md: 4 },
                '& .federation-text': {
                  color: '#ffffff',
                  textShadow: '0 0 1px rgba(0, 0, 0, 0.3), 0 0 2px rgba(0, 0, 0, 0.2), 1px 1px 0 rgba(128, 128, 128, 0.5)',
                  WebkitTextStroke: '0.5px rgba(128, 128, 128, 0.3)',
                },
                '& .blue-text': {
                  color: 'primary.main',
                },
                '& .red-text': {
                  color: 'secondary.main',
                },
              }}
            >
              <span className="federation-text">Федерация</span>{' '}
              <span className="blue-text">искусственного</span>{' '}
              <span className="red-text">интеллекта</span>
            </Typography>
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3, ml: 'auto' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/contacts?type=join" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 500,
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                Вступить
              </Button>
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: -1 }}>
              <ThemeToggle />
            </Box>
          </Box>

          {/* Mobile Menu Buttons */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: -1 }}>
              <ThemeToggle />
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuToggle}
              sx={{ color: 'text.primary' }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Container>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: isDark 
              ? 'rgba(26, 32, 51, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            mt: '64px',
            borderBottom: isDark
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <Box sx={{ width: '100%', py: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <Link href={link.href} style={{ width: '100%', textDecoration: 'none' }} onClick={handleMenuClose}>
                  <ListItemButton>
                    <ListItemText 
                      primary={link.label}
                      primaryTypographyProps={{
                        color: 'text.primary',
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
              <Link href="/contacts?type=join" style={{ width: '100%', textDecoration: 'none' }} onClick={handleMenuClose}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    fontWeight: 500,
                    borderRadius: '12px',
                  }}
                >
                  Вступить
                </Button>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
