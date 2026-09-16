'use client';

import PageIntro from '@/components/PageIntro';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { directions } from '@/lib/homeContent';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function DirectionsPage() {
  return (
    <Box sx={{ width: '100%', py: { xs: 3, md: 4 }, backgroundColor: '#fbfbfa' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 5, lg: 6 } }}>
        <PageIntro visual="directions" title={directions.h2} description={directions.subtitle} label={directions.label} />

        {/* 6 направлений по ТЗ лист 3 */}
        <Box role="list" sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {directions.items.map((it, index) => (
            <motion.div
              key={it.id}
              id={it.id}
              style={{ scrollMarginTop: 120 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              role="listitem"
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '44px 1fr', md: '96px 1fr' },
                  columnGap: { xs: 2, md: 3 },
                  alignItems: 'start',
                  py: { xs: 3, md: 4 },
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  '&:last-of-type': { borderBottom: '1px solid rgba(0,0,0,0.1)' },
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 57, 166, 0.02)',
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    lineHeight: 1,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    color: it.emphasis ? ACCENT : '#aab0b7',
                    pt: { md: 0.5 },
                  }}
                >
                  {it.order}
                </Typography>

                <Box>
                  <Typography
                    component="h2"
                    sx={{
                      m: 0,
                      fontWeight: it.emphasis ? 700 : 600,
                      letterSpacing: '-0.015em',
                      lineHeight: 1.15,
                      color: GRAPHITE,
                      fontSize: it.emphasis
                        ? { xs: '1.35rem', md: '1.95rem' }
                        : { xs: '1.25rem', md: '1.75rem' },
                    }}
                  >
                    {it.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.5,
                      maxWidth: '68ch',
                      color: '#4a5057',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                    }}
                  >
                    {it.short}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Ссылка назад на главную или к вступлению */}
        <Box sx={{ mt: 6, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/join" style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3.25,
                py: 1.5,
                borderRadius: '999px',
                backgroundColor: ACCENT,
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 4px 14px rgba(0,57,166,0.2)',
                transition: 'background-color .2s',
                '&:hover': { backgroundColor: '#002d85' },
              }}
            >
              Вступить в Федерацию
              <ArrowRight size={17} strokeWidth={2.2} />
            </Box>
          </Link>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                color: GRAPHITE,
                fontWeight: 600,
                fontSize: '1rem',
                '&:hover': { color: ACCENT },
              }}
            >
              ← На главную
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
