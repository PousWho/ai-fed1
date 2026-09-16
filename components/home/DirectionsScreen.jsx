'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { directions } from '@/lib/homeContent';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';
const DEFAULT_OPEN =
  directions.items.find((item) => item.emphasis)?.id ?? directions.items[0]?.id ?? null;

export default function DirectionsScreen() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(DEFAULT_OPEN);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-70px' },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        };

  return (
    <Box
      component="section"
      id="directions"
      aria-labelledby="directions-h2"
      sx={{
        position: 'relative',
        backgroundColor: '#fbfbfa',
        py: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)',
          opacity: 0.55,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 4, md: 5, lg: 6 } }}>
        {/* Заголовочный блок */}
        <Box sx={{ maxWidth: '640px', mb: { xs: 5, md: 7 } }}>
          <motion.p
            {...reveal(0)}
            style={{
              margin: 0,
              color: ACCENT,
              fontWeight: 600,
              letterSpacing: '0.14em',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
            }}
          >
            {directions.label}
          </motion.p>
          <motion.h2
            id="directions-h2"
            {...reveal(0.06)}
            style={{
              margin: '16px 0 0',
              color: GRAPHITE,
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: '-0.015em',
              fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)',
            }}
          >
            {directions.h2}
          </motion.h2>
          <motion.p
            {...reveal(0.12)}
            style={{
              margin: '18px 0 0',
              color: '#4a5057',
              lineHeight: 1.55,
              fontSize: 'clamp(0.98rem, 1.2vw, 1.1rem)',
            }}
          >
            {directions.subtitle}
          </motion.p>
        </Box>

        {/* Вертикальная последовательность направлений */}
        <Box role="list">
          {directions.items.map((it, i) => {
            const open = active === it.id;
            const dim = active && !open;
            return (
              <motion.div key={it.id} {...reveal(0.04 * i)} role="listitem">
                <Box
                  tabIndex={0}
                  aria-expanded={open}
                  onMouseEnter={() => setActive(it.id)}
                  onMouseLeave={() => setActive(DEFAULT_OPEN)}
                  onFocus={() => setActive(it.id)}
                  onBlur={() => setActive(DEFAULT_OPEN)}
                  onClick={() => setActive(open && it.id !== DEFAULT_OPEN ? DEFAULT_OPEN : it.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActive(open && it.id !== DEFAULT_OPEN ? DEFAULT_OPEN : it.id);
                    }
                  }}
                  sx={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: { xs: '44px 1fr', md: '96px 1fr' },
                    columnGap: { xs: 2, md: 3 },
                    alignItems: 'start',
                    py: { xs: 2.25, md: 3 },
                    borderTop: '1px solid',
                    borderColor: open ? 'rgba(0,57,166,0.35)' : 'rgba(0,0,0,0.1)',
                    '&:last-of-type': { borderBottom: '1px solid rgba(0,0,0,0.1)' },
                    opacity: dim ? 0.55 : 1,
                    transition: 'opacity .25s, border-color .25s',
                    cursor: 'pointer',
                    outline: 'none',
                    '&:focus-visible': { borderColor: ACCENT },
                  }}
                >
                  {/* номер — часть графического языка */}
                  <Box
                    aria-hidden
                    sx={{
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 600,
                      lineHeight: 1,
                      fontSize: { xs: '1.1rem', md: '1.4rem' },
                      color: open ? ACCENT : '#aab0b7',
                      transition: 'color .25s',
                      pt: { md: 0.75 },
                    }}
                  >
                    {it.order}
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 1.5,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box
                        component="h3"
                        sx={{
                          m: 0,
                          fontWeight: it.emphasis ? 700 : 600,
                          letterSpacing: '-0.01em',
                          lineHeight: 1.12,
                          color: open ? ACCENT : GRAPHITE,
                          transition: 'color .25s',
                          fontSize: it.emphasis
                            ? { xs: '1.4rem', md: '2.1rem' }
                            : { xs: '1.3rem', md: '1.9rem' },
                        }}
                      >
                        {it.title}
                      </Box>
                      {it.url && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: ACCENT,
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            opacity: open ? 1 : 0,
                            transform: open ? 'translateX(0)' : 'translateX(-4px)',
                            transition: 'opacity .2s, transform .2s',
                          }}
                        >
                          Подробнее <ArrowRight size={15} strokeWidth={2.2} />
                        </Box>
                      )}
                    </Box>

                    {/* описание — раскрывается по hover/focus/tap */}
                    <Box
                      sx={{
                        overflow: 'hidden',
                        maxHeight: open || reduce ? '200px' : '0px',
                        opacity: open || reduce ? 1 : 0,
                        transition: reduce ? 'none' : 'max-height .32s ease, opacity .28s ease, margin-top .28s ease',
                        mt: open || reduce ? 1.25 : 0,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '62ch',
                          color: '#4a5057',
                          lineHeight: 1.55,
                          fontSize: { xs: '0.92rem', md: '1rem' },
                        }}
                      >
                        {it.short}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>

        {/* CTA — вторичный */}
        <motion.div {...reveal(0.1)} style={{ marginTop: 40 }}>
          <Link href={directions.cta.href} style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                color: ACCENT,
                fontWeight: 600,
                fontSize: '1rem',
                '& .arw': { transition: 'transform .2s ease' },
                '&:hover .arw': { transform: 'translateX(5px)' },
              }}
            >
              {directions.cta.text}
              <ArrowRight className="arw" size={18} strokeWidth={2.2} />
            </Box>
          </Link>
        </motion.div>
      </Container>
    </Box>
  );
}
