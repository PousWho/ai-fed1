'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { hero } from '@/lib/homeContent';
import { track } from '@/lib/analytics';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';
const BRAIN_STREAMS = [
  'M102 260 Q87 215 126 170 T188 142 Q224 162 222 201 T174 244 Q142 275 153 300',
  'M121 291 Q161 252 150 209 T187 159 Q225 200 251 245 Q231 286 180 300',
  'M103 232 Q137 182 173 191 T231 225 Q211 259 153 290',
  'M126 170 Q164 160 198 185 Q172 220 210 281 Q165 315 121 291',
];

export default function HeroScreen() {
  const reduce = useReducedMotion();
  const delay = (ms) => (reduce ? undefined : `${ms}s`);

  return (
    <Box
      component="section"
      aria-labelledby="hero-h1"
      id="hero"
      sx={{
        position: 'relative',
        // тянем секцию под прозрачный header (компенсируем pt main в layout)
        mt: { xs: '-112px', md: '-128px' },
        pt: { xs: '96px', md: '128px' },
        minHeight: { xs: '92vh', md: '96vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#fbfbfa', // off-white
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ position: 'relative', zIndex: 2, px: { xs: 2.5, sm: 4, md: 5, lg: 6 }, py: { xs: 5, md: 8 } }}
      >
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(220px, 0.7fr) minmax(0, 1.5fr)' },
          alignItems: 'center', gap: { xs: 3, md: 4, lg: 6 },
          background: 'radial-gradient(ellipse at 12% 45%, #102a48 0%, #0b1422 48%, #090f19 100%)',
          borderRadius: { xs: '24px', md: '36px' },
          p: { xs: 3, sm: 5, md: 5, lg: 6 },
          overflow: 'hidden',
        }}>
        <Box aria-hidden="true" sx={{
          position: 'relative', width: '100%', aspectRatio: '899 / 916',
          maxWidth: { xs: 180, sm: 220, md: 400 }, mx: 'auto',
        }}>
          <Image src="/logo-icon.png" alt="" fill priority sizes="(min-width: 900px) 400px, 220px" style={{ objectFit: 'contain' }} />
          <Box className="hero-brain-energy" sx={{
            position: 'absolute', left: '8%', top: '13%', width: '24%', height: '22%',
            borderRadius: '50%', mixBlendMode: 'screen', pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 35% 40%, #e0ffff 0%, #00ddffbb 28%, transparent 70%)',
            filter: 'blur(3px)',
          }} />
          <svg className="hero-brain-signals" viewBox="0 0 899 916" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <g fill="none" stroke="#65eaff" strokeWidth="1.5" opacity=".4">
              {BRAIN_STREAMS.map((path) => <path key={path} d={path} />)}
            </g>
            <g fill="none" stroke="#c5ffff" strokeWidth="3" strokeLinecap="round">
              {BRAIN_STREAMS.map((path, index) => <path className="hero-brain-paths" key={path} d={path} style={{ animationDelay: `${index * -0.65}s`, animationDuration: `${2.8 + index * 0.4}s` }} />)}
            </g>
            <g className="hero-brain-wave" fill="none" stroke="#55eaff" strokeWidth="2">
              <ellipse cx="174" cy="223" rx="42" ry="54" />
            </g>
            <g fill="#e0ffff">
              {[[108, 256], [150, 209], [126, 170], [188, 142], [222, 201], [174, 244], [210, 281], [153, 290]].map(([cx, cy], index) => (
                <circle key={index} className="hero-brain-node" cx={cx} cy={cy} r="5" style={{ animationDelay: `${index * -0.28}s`, transformOrigin: `${cx}px ${cy}px` }} />
              ))}
              {BRAIN_STREAMS.map((path, index) => (
                <g key={path} className="hero-brain-particle" opacity={reduce ? 0 : 1}>
                  <circle r="11" fill="#00cfff" opacity=".22" />
                  <circle r="4" />
                  {!reduce && <animateMotion dur={`${2.8 + index * 0.4}s`} begin={`${index * -0.8}s`} repeatCount="indefinite" path={path} />}
                </g>
              ))}
            </g>
            <g className="hero-eye-light" fill="#80f7ff">
              <ellipse cx="399" cy="343" rx="27" ry="7" transform="rotate(6 399 343)" />
              <ellipse cx="578" cy="357" rx="10" ry="7" transform="rotate(15 578 357)" />
            </g>
          </svg>
        </Box>
        <Box sx={{ minWidth: 0 }}>
          {/* H1 — реальный текстовый заголовок (SEO), крупная типографика */}
          <Box
            component="h1"
            id="hero-h1"
            data-hero-rise
            style={{ animationDelay: delay(0.18) }}
            sx={{
              m: '18px 0 0',
              color: GRAPHITE,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(1.75rem, 3.4vw, 3.1rem)',
            }}
          >
            {hero.h1Lines.map((line, index) => (
              <Box key={line} component="span" sx={{ display: 'block', color: ['#ffffff', '#639eff', '#ff6b70'][index] }}>
                {line}
              </Box>
            ))}
          </Box>

          {/* Пояснение — заметно меньше H1 */}
          <Box
            component="p"
            data-hero-rise
            style={{ animationDelay: delay(0.34) }}
            sx={{
              m: '24px 0 0',
              color: '#b9c5d5',
              fontWeight: 400,
              lineHeight: 1.55,
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              maxWidth: '54ch',
            }}
          >
            {hero.subtitle}
          </Box>

          {/* CTA */}
          <Box
            data-hero-rise
            style={{ animationDelay: delay(0.5) }}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px 20px',
              alignItems: 'center',
              mt: '34px',
            }}
          >
            <Link href={hero.primaryCta.href} style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                onClick={() => track('cta_join_hero', { location: 'hero' })}
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
                  boxShadow: '0 6px 18px rgba(0,57,166,0.18)',
                  transition: 'background-color .18s ease, transform .18s ease, box-shadow .18s ease',
                  '& .arw': { transition: 'transform .2s ease' },
                  '&:hover': {
                    backgroundColor: '#002d85',
                    boxShadow: '0 8px 22px rgba(0,57,166,0.24)',
                  },
                  '&:hover .arw': { transform: 'translateX(3px)' },
                }}
              >
                {hero.primaryCta.text}
                <ArrowRight className="arw" size={18} strokeWidth={2.2} />
              </Box>
            </Link>

            <Link href={hero.secondaryCta.href} style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                onClick={() => track('cta_about', { location: 'hero' })}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  py: 1,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  position: 'relative',
                  '& .arw': { transition: 'transform .2s ease' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 2,
                    height: '1px',
                    width: '0%',
                    backgroundColor: 'currentColor',
                    transition: 'width .25s ease',
                  },
                  '&:hover::after': { width: '100%' },
                  '&:hover .arw': { transform: 'translateX(5px)' },
                }}
              >
                {hero.secondaryCta.text}
                <ArrowRight className="arw" size={17} strokeWidth={2.2} />
              </Box>
            </Link>
          </Box>

          {/* Нижняя строка — в потоке на mobile (не перекрывает контент) */}
          <Box data-hero-rise style={{ animationDelay: delay(0.66) }} sx={{ mt: '44px' }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexWrap: 'wrap', alignItems: 'center', gap: '6px 10px', color: '#aebed0', fontSize: '0.82rem', letterSpacing: '0.02em' }}>
              {hero.environmentsLine.map((w, i) => (
                <Box key={w} sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  {i > 0 && <Box component="span" sx={{ color: ACCENT, opacity: 0.5 }}>·</Box>}
                  <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{w}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        </Box>
      </Container>

      {/* Нижняя смысловая строка (desktop/tablet) — часть айдентики, НЕ карточки/кнопки */}
      <Container
        maxWidth="xl"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: { xs: 28, md: 40 },
          zIndex: 2,
          px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
        }}
      >
        <Box data-hero-rise style={{ animationDelay: delay(0.66) }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: { xs: '6px 10px', md: '8px 18px' },
              color: '#6c757d',
              fontSize: { xs: '0.82rem', md: '0.95rem' },
              letterSpacing: '0.02em',
            }}
          >
            {hero.environmentsLine.map((w, i) => (
              <Box key={w} sx={{ display: 'inline-flex', alignItems: 'center', gap: { xs: '10px', md: '18px' } }}>
                {i > 0 && <Box component="span" sx={{ color: ACCENT, opacity: 0.5 }}>·</Box>}
                <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{w}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
