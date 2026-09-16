'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { track } from '@/lib/analytics';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';
const RED = '#d52b1e';

const navLinks = [
  { label: 'О Федерации', href: '/about' },
  { label: 'Направления', href: '/directions' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Результаты', href: '/results' },
  { label: 'Новости', href: '/news' },
  { label: 'Контакты', href: '/contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Прозрачный header только на главной у самого верха; при скролле — лёгкий фон.
  const transparent = isHome && !scrolled && !isMenuOpen;

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 1300,
        backgroundColor: transparent ? 'transparent' : 'rgba(251,251,250,0.82)',
        backdropFilter: transparent ? 'none' : 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(14px) saturate(160%)',
        borderBottom: transparent ? '1px solid transparent' : '1px solid rgba(0,0,0,0.07)',
        boxShadow: 'none',
        transition: 'background-color .3s ease, border-color .3s ease, backdrop-filter .3s ease',
        '&::before': { display: 'none' },
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 60, md: 72 }, px: 0 }}>
        <Container
          maxWidth="xl"
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
          }}
        >
          {/* Логотип — фирменный триколор: Федерация / искусственного / интеллекта */}
          <Link
            href="/"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6em' }}
            onClick={handleLogoClick}
          >
            <Box
              sx={{
                width: { xs: 36, md: 42 },
                height: { xs: 36, md: 42 },
                flexShrink: 0,
                display: 'flex',
              }}
            >
              <Image src="/logo.webp" alt="Федерация искусственного интеллекта" width={42} height={42} priority style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: { xs: 'flex-start', sm: 'baseline' }, flexDirection: { xs: 'column', sm: 'row' }, lineHeight: { xs: 1.15, sm: 1.5 },
                gap: { xs: 0, sm: '0.4em' },
                fontWeight: 700,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              <Box
                component="span"
                sx={{
                  color: GRAPHITE,
                }}
              >
                Федерация
              </Box>
              <Box component="span" sx={{ color: ACCENT }}>
                искусственного
              </Box>{' '}
              <Box component="span" sx={{ color: RED }}>
                интеллекта
              </Box>
            </Box>
          </Link>

          {/* Desktop-меню */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navLinks.map((link) => {
              const activeLink = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <Button
                    disableRipple
                    sx={{
                      color: activeLink ? ACCENT : GRAPHITE,
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      px: 1.75,
                      py: 1,
                      minWidth: 0,
                      backgroundColor: 'transparent',
                      border: 'none',
                      backdropFilter: 'none',
                      boxShadow: 'none',
                      borderRadius: '8px',
                      '&::before': { display: 'none' },
                      '&:hover': {
                        color: ACCENT,
                        backgroundColor: 'rgba(0,57,166,0.06)',
                        transform: 'none',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            <Link href="/join" style={{ textDecoration: 'none', marginLeft: 8 }}>
              <Button
                disableRipple
                onClick={() => track('cta_join_header', { location: 'header' })}
                sx={{
                  color: '#fff',
                  backgroundColor: ACCENT,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  borderRadius: '999px',
                  px: 2.5,
                  py: 1,
                  border: 'none',
                  backdropFilter: 'none',
                  boxShadow: '0 4px 12px rgba(0,57,166,0.18)',
                  '&::before': { display: 'none' },
                  '&:hover': {
                    backgroundColor: '#002d85',
                    transform: 'none',
                    boxShadow: '0 6px 16px rgba(0,57,166,0.24)',
                  },
                }}
              >
                Вступить
              </Button>
            </Link>
          </Box>

          {/* Бургер (mobile/tablet) */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center' }}>
            <IconButton
              edge="end"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              sx={{ color: GRAPHITE }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Container>
      </Toolbar>

      {/* Drawer (mobile/tablet) */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(251,251,250,0.98)',
            backdropFilter: 'blur(12px)',
            mt: { xs: '60px', md: '72px' },
            borderRadius: 0,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
          },
        }}
      >
        <Box sx={{ py: 2 }}>
          <List sx={{ px: 1.5 }}>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <Link href={link.href} style={{ width: '100%', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                  <ListItemButton sx={{ py: 1.5, borderRadius: '10px' }}>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{ color: GRAPHITE, fontWeight: 500, fontSize: '1.05rem' }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 1.5, px: 1 }}>
              <Link href="/join" style={{ width: '100%', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                <Button
                  fullWidth
                  onClick={() => track('cta_join_header', { location: 'header_mobile' })}
                  sx={{
                    color: '#fff',
                    backgroundColor: ACCENT,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '999px',
                    py: 1.35,
                    fontSize: '1.05rem',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,57,166,0.18)',
                    '&::before': { display: 'none' },
                    '&:hover': { backgroundColor: '#002d85', transform: 'none' },
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
