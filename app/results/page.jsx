'use client';

import PageIntro from '@/components/PageIntro';
import { motion, useReducedMotion } from 'framer-motion';
import { Box, Container, Typography, Card } from '@mui/material';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { stats, results, achievements, shifts } from '@/lib/resultsContent';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

function ExternalCard({ href, children, sx = {} }) {
  return (
    <Card
      {...(href ? { component: 'a', href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      sx={{
        height: '100%',
        p: 3,
        display: 'block',
        textDecoration: 'none',
        cursor: href ? 'pointer' : 'default',
        backgroundColor: '#ffffff !important',
        color: '#212529 !important',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: 'none',
        position: 'relative',
        '& .MuiTypography-root': { color: 'inherit !important' },
        '&:hover': {
          transform: 'none !important',
          borderColor: href ? `${ACCENT} !important` : 'rgba(0,0,0,0.08) !important',
          backgroundColor: '#ffffff !important',
          '& .MuiTypography-root': { color: 'inherit !important' },
          '& .ext-arrow': { opacity: href ? 1 : 0, transform: 'translate(2px, -2px)' },
        },
        ...sx,
      }}
    >
      {href && (
        <Box
          className="ext-arrow"
          aria-hidden
          sx={{ position: 'absolute', top: 20, right: 20, color: ACCENT, opacity: 0.35, transition: 'opacity .2s ease, transform .2s ease' }}
        >
          <ArrowUpRight size={18} strokeWidth={2.2} />
        </Box>
      )}
      {children}
    </Card>
  );
}

function ShiftColumn({ heading, items }) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aa0a7', mb: 1.5 }}>
        {heading}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {items.map((it, i) => {
          const Comp = it.href ? 'a' : 'div';
          return (
            <Box
              key={i}
              component={Comp}
              {...(it.href ? { href: it.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
              sx={{
                display: 'block',
                textDecoration: 'none',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: '#4a5057',
                '&:hover': it.href ? { color: ACCENT } : {},
              }}
            >
              <Box component="span" sx={{ color: ACCENT, fontWeight: 600, fontSize: '0.78rem', mr: 1 }}>
                {it.year}
              </Box>
              {it.text}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function ResultsPage() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, margin: '-60px' },
          variants: fadeUp,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        };

  return (
    <Box sx={{ width: '100%', pt: { xs: 3, md: 4 }, pb: 12, backgroundColor: '#fbfbfa' }}>
      <Container maxWidth="lg">
        <PageIntro visual="results" title="От инициатив — к результатам" description="Два года работы Федерации: участие, проекты и результаты по ключевым направлениям." />
        {/* Статистика */}
        <motion.div {...reveal(0.16)}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 3, md: 4 },
              mb: { xs: 8, md: 11 },
              py: { xs: 4, md: 5 },
              px: { xs: 2, md: 3 },
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '4px',
            }}
          >
            {stats.map((s) => (
              <Box key={s.label} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 700, color: ACCENT, fontSize: { xs: '1.6rem', md: '2.2rem' }, lineHeight: 1.1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: '#6c757d', fontSize: '0.88rem', mt: 0.5 }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* Отобранные результаты по направлениям */}
        <Box sx={{ mb: { xs: 9, md: 12 } }}>
          <motion.div {...reveal(0)}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: GRAPHITE, mb: 4, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
              Ключевые направления
            </Typography>
          </motion.div>
          <Box role="list">
            {results.map((r, i) => (
              <motion.div key={r.num} {...reveal(0.04 * i)} role="listitem">
                <Box
                  component={r.href ? 'a' : 'div'}
                  {...(r.href ? { href: r.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '36px 1fr', md: '80px 1fr auto' },
                    alignItems: 'center',
                    columnGap: { xs: 2, md: 3 },
                    py: { xs: 2, md: 2.5 },
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    '&:last-of-type': { borderBottom: '1px solid rgba(0,0,0,0.1)' },
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover .r-title': { color: ACCENT },
                    '&:hover .r-arrow': { opacity: 1, transform: 'translateX(3px)' },
                  }}
                >
                  <Box sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: '#aab0b7', fontSize: { xs: '1rem', md: '1.2rem' } }}>
                    {r.num}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.04em', mb: 0.5 }}>
                      {r.cat}
                    </Typography>
                    <Typography className="r-title" sx={{ fontWeight: 700, color: GRAPHITE, fontSize: { xs: '1.05rem', md: '1.2rem' }, transition: 'color .2s' }}>
                      {r.title}
                    </Typography>
                    <Typography sx={{ color: '#6c757d', fontSize: '0.9rem', mt: 0.5 }}>{r.metric}</Typography>
                  </Box>
                  {r.href && (
                    <Box
                      className="r-arrow"
                      aria-hidden
                      sx={{ display: { xs: 'none', md: 'flex' }, color: ACCENT, opacity: 0.4, transition: 'opacity .2s, transform .2s' }}
                    >
                      <ArrowRight size={20} strokeWidth={2.2} />
                    </Box>
                  )}
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Доказательства — показатели и признание */}
        <Box sx={{ mb: { xs: 9, md: 12 } }}>
          <motion.div {...reveal(0)}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: GRAPHITE, mb: 4, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
              Доказательства
            </Typography>
          </motion.div>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
            {achievements.map((a, i) => (
              <motion.div key={i} variants={fadeScale} initial={reduce ? undefined : 'hidden'} whileInView={reduce ? undefined : 'visible'} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 6) * 0.05 }}>
                <ExternalCard href={a.href}>
                  <Typography sx={{ fontWeight: 700, color: `${GRAPHITE} !important`, fontSize: '1.15rem', mb: 0.5, pr: a.href ? 3 : 0 }}>
                    {a.metric}
                  </Typography>
                  <Typography sx={{ color: `${ACCENT} !important`, fontWeight: 600, fontSize: '0.92rem', mb: 1 }}>{a.label}</Typography>
                  <Typography sx={{ color: '#6c757d !important', fontSize: '0.88rem', lineHeight: 1.5 }}>{a.desc}</Typography>
                </ExternalCard>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Три сдвига — было/стало */}
        <Box>
          <motion.div {...reveal(0)}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: GRAPHITE, mb: 1, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
              Три сдвига
            </Typography>
          </motion.div>
          <motion.div {...reveal(0.06)}>
            <Typography sx={{ color: '#4a5057', mb: 5, maxWidth: '760px', lineHeight: 1.6 }}>
              За два года изменилось не количество событий, а роль: с какой стороны сцены стоит организация и что остаётся после того, как зал расходится.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 8 } }}>
            {shifts.map((s, i) => (
              <motion.div key={s.n} {...reveal(0.04 * i)}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '56px 1fr' }, columnGap: 3 }}>
                  <Typography sx={{ fontWeight: 700, color: '#aab0b7', fontSize: { xs: '1.1rem', md: '1.4rem' }, fontVariantNumeric: 'tabular-nums' }}>
                    {s.n}
                  </Typography>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: GRAPHITE, mb: 1.5, fontSize: { xs: '1.15rem', md: '1.4rem' } }}>
                      {s.title}
                    </Typography>
                    <Typography sx={{ color: '#4a5057', lineHeight: 1.6, mb: 3, maxWidth: '760px' }}>{s.text}</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' }, gap: { xs: 3, sm: 4 }, alignItems: 'start' }}>
                      <ShiftColumn heading="Было" items={s.before} />
                      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center', color: ACCENT, opacity: 0.5, pt: 3 }}>
                        <ArrowRight size={18} />
                      </Box>
                      <ShiftColumn heading="Стало" items={s.after} />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
