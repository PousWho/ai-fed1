'use client';

import Link from 'next/link';
import { Box, Container, Typography, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const linkColor = '#212529';
  
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', px: { xs: 2, sm: 3, md: 4 }, pb: 5 }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: '100%', maxWidth: '1280px' }}
      >
        <Paper
          elevation={0}
          sx={{
            mt: 10,
            p: { xs: 3, md: 5 },
          }}
        >
          <Container maxWidth="xl" sx={{ px: 0 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'center', md: 'center' }}
              spacing={4}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      mb: 1,
                      '& .blue-text': {
                        color: 'primary.main',
                      },
                      '& .red-text': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    <span style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Федерация</span>{' '}
                    <span className="blue-text">искусственного</span>{' '}
                    <span className="red-text">интеллекта</span>
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mt: 1,
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  © 2025 Федерация развития ИИ. Все права защищены.
                </Typography>
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={4}
                alignItems="center"
              >
                <Stack direction="row" spacing={3}>
                  <Link href="/contacts" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: linkColor,
                        fontWeight: 500,
                        textShadow: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      Контакты
                    </Typography>
                  </Link>
                  <Link href="/about" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: linkColor,
                        fontWeight: 500,
                        textShadow: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      О федерации
                    </Typography>
                  </Link>
                  <Link href="/partnership" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: linkColor,
                        fontWeight: 500,
                        textShadow: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      Партнерство
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Link href="mailto:ceo@aimy.expert" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: linkColor,
                        fontWeight: 500,
                        textShadow: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      Email
                    </Typography>
                  </Link>
                  <Link href="http://t.me/Gyurik5" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: linkColor,
                        fontWeight: 500,
                        textShadow: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      Telegram
                    </Typography>
                  </Link>
                  <Link href="https://vk.com/yurigolovko" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: linkColor,
                        fontWeight: 500,
                        textShadow: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      VK
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Paper>
      </motion.div>
    </Box>
  );
}
