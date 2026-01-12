'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
        <Container maxWidth="xl" sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
          {/* Логотип */}
          <Link href="/" style={{ textDecoration: 'none', marginRight: 'auto' }} onClick={handleLogoClick}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' },
                whiteSpace: 'nowrap',
                mr: { xs: 1, sm: 2, md: 3, lg: 4 },
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
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: { lg: 2, xl: 3 }, ml: 'auto' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    fontSize: { lg: '0.875rem', xl: '1rem' },
                    px: { lg: 1.5, xl: 2 },
                    py: { lg: 0.75, xl: 1 },
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
                  fontSize: { lg: '0.875rem', xl: '1rem' },
                  px: { lg: 2, xl: 2.5 },
                  py: { lg: 0.75, xl: 1 },
                }}
              >
                Вступить
              </Button>
            </Link>
          </Box>

          {/* Mobile/Tablet Menu Buttons */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuToggle}
              sx={{ 
                color: 'text.primary',
                p: { xs: 1, sm: 1.5 }
              }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Container>
      </Toolbar>

      {/* Mobile/Tablet Menu Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            mt: { xs: '56px', sm: '64px' },
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
            overflow: 'auto',
          },
        }}
      >
        <Box sx={{ width: '100%', py: { xs: 2, sm: 3 } }}>
          <List sx={{ px: { xs: 1, sm: 2 } }}>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <Link href={link.href} style={{ width: '100%', textDecoration: 'none' }} onClick={handleMenuClose}>
                  <ListItemButton sx={{ py: { xs: 1.5, sm: 2 } }}>
                    <ListItemText 
                      primary={link.label}
                      primaryTypographyProps={{
                        color: 'text.primary',
                        fontWeight: 500,
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: { xs: 1.5, sm: 2 }, px: { xs: 1, sm: 2 } }}>
              <Link href="/contacts?type=join" style={{ width: '100%', textDecoration: 'none' }} onClick={handleMenuClose}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    fontWeight: 500,
                    borderRadius: '12px',
                    py: { xs: 1.25, sm: 1.5 },
                    fontSize: { xs: '1rem', sm: '1.125rem' },
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
