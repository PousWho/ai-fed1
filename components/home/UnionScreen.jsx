'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { union } from '@/lib/homeContent';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';
const destinations = { business: '/partnership', tech: '/projects', science: '/directions#science-tech', education: '/directions#education', state: '/directions#state' };

// Асимметричная распределённая композиция (0..1) в правой панели.
// НЕ «Федерация в центре + 5 вокруг»: Федерация смещена и является одним
// из участников сети, а не управляющим центром (ТЗ п.10, п.12).
const POS = {
  business: { x: 0.16, y: 0.33 },
  science: { x: 0.46, y: 0.14 },
  tech: { x: 0.82, y: 0.24 },
  education: { x: 0.22, y: 0.76 },
  state: { x: 0.6, y: 0.87 },
  federation: { x: 0.68, y: 0.55 },
};

// Рёбра: связи существуют не только через Федерацию (ТЗ п.13) — это экосистема.
const EDGES = [
  ...union.environments.map((e) => [e.id, 'federation']),
  ...union.links,
];

const VB_W = 100;
const VB_H = 85;

// Порядок последовательного проявления при скролле (ТЗ п.15).
const orderOf = (id) =>
  id === 'federation' ? 0 : union.environments.findIndex((e) => e.id === id) + 1;

export default function UnionScreen() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null); // id среды при hover/focus
  const netRef = useRef(null);
  const netInView = useInView(netRef, { once: true, margin: '-80px' });
  const show = reduce || netInView;

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      };

  const isConnected = (id) =>
    active && (id === active || EDGES.some(([a, b]) => (a === active && b === id) || (b === active && a === id)));

  const edgeActive = (a, b) => active && (a === active || b === active);

  const nodeDelay = (id) => (reduce ? 0 : orderOf(id) * 0.12);
  const lineDelay = (a, b) => (reduce ? 0 : Math.max(orderOf(a), orderOf(b)) * 0.12 + 0.15);

  return (
    <Box
      component="section"
      id="union"
      aria-labelledby="union-h2"
      sx={{ position: 'relative', backgroundColor: '#f4f5f7', py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 5, lg: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: { xs: 'stretch', md: 'center' },
            minHeight: { md: '78vh' },
          }}
        >
          {/* Левая часть — текст */}
          <Box>
            <motion.p
              {...reveal}
              style={{
                margin: 0,
                color: ACCENT,
                fontWeight: 600,
                letterSpacing: '0.14em',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
              }}
            >
              {union.label}
            </motion.p>

            <motion.h2
              id="union-h2"
              {...reveal}
              transition={reduce ? undefined : { ...reveal.transition, delay: 0.08 }}
              style={{
                margin: '16px 0 0',
                color: GRAPHITE,
                fontWeight: 700,
                lineHeight: 1.14,
                letterSpacing: '-0.015em',
                fontSize: 'clamp(1.7rem, 3.4vw, 2.9rem)',
              }}
            >
              {union.h2Lines.map((line) => (
                <Box key={line} component="span" sx={{ display: 'block' }}>
                  {line}
                </Box>
              ))}
            </motion.h2>

            {union.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                {...reveal}
                transition={reduce ? undefined : { ...reveal.transition, delay: 0.16 + i * 0.06 }}
                style={{
                  margin: '20px 0 0',
                  color: '#4a5057',
                  lineHeight: 1.6,
                  fontSize: 'clamp(0.98rem, 1.2vw, 1.08rem)',
                  maxWidth: '52ch',
                }}
              >
                {p}
              </motion.p>
            ))}

            {/* Акцентная фраза — принцип, не рекламный слоган */}
            <motion.p
              {...reveal}
              transition={reduce ? undefined : { ...reveal.transition, delay: 0.3 }}
              style={{
                margin: '32px 0 0',
                color: GRAPHITE,
                fontWeight: 600,
                lineHeight: 1.28,
                letterSpacing: '-0.01em',
                fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)',
                maxWidth: '22ch',
                borderLeft: `2px solid ${ACCENT}`,
                paddingLeft: '18px',
              }}
            >
              {union.accentPhrase}
            </motion.p>

            <motion.div
              {...reveal}
              transition={reduce ? undefined : { ...reveal.transition, delay: 0.38 }}
              style={{ marginTop: 34 }}
            >
              <Link href={union.cta.href} style={{ textDecoration: 'none' }}>
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
                  {union.cta.text}
                  <ArrowRight className="arw" size={18} strokeWidth={2.2} />
                </Box>
              </Link>
            </motion.div>
          </Box>

          {/* Правая часть — пространственная сеть (desktop/tablet) */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              ref={netRef}
              onMouseLeave={() => setActive(null)}
              sx={{ position: 'relative', width: '100%', aspectRatio: '100 / 85', overflow: 'hidden', borderRadius: 7, background: 'radial-gradient(ellipse at 68% 52%, #133c70 0%, #091a30 42%, #061121 100%)', border: '1px solid #2e6393', boxShadow: '0 22px 48px rgba(6, 21, 42, .2), inset 0 0 100px rgba(74, 177, 255, .12)' }}
            >
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                width="100%"
                height="100%"
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
              >
                <defs>
                  <radialGradient id="union-core"><stop stopColor="#a9f6ff" /><stop offset=".22" stopColor="#2ec5ff" /><stop offset="1" stopColor="#0067d8" stopOpacity="0" /></radialGradient>
                  <linearGradient id="union-line" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#6edbff" stopOpacity=".35" /><stop offset=".5" stopColor="#d6fbff" /><stop offset="1" stopColor="#318dff" stopOpacity=".35" /></linearGradient>
                  <filter id="union-glow"><feGaussianBlur stdDeviation="1.2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <circle cx={POS.federation.x * VB_W} cy={POS.federation.y * VB_H} r="17" fill="url(#union-core)" opacity=".52" className="union-core-pulse" />
                <circle cx={POS.federation.x * VB_W} cy={POS.federation.y * VB_H} r="9" fill="none" stroke="#67dfff" strokeOpacity=".45" strokeDasharray="1 2" className="union-core-ring" />
                {/* связи */}
                {EDGES.map(([a, b], i) => {
                  const pa = POS[a];
                  const pb = POS[b];
                  if (!pa || !pb) return null;
                  const on = edgeActive(a, b);
                  return (
                    <line
                      key={i}
                      x1={pa.x * VB_W}
                      y1={pa.y * VB_H}
                      x2={pb.x * VB_W}
                      y2={pb.y * VB_H}
                      stroke={on ? '#7ee6ff' : 'url(#union-line)'}
                      strokeWidth={on ? 0.72 : 0.34}
                      strokeOpacity={active ? (on ? 1 : 0.12) : 0.58}
                      strokeDasharray={on ? 'none' : '1 1'}
                      filter={on ? 'url(#union-glow)' : undefined}
                      style={{
                        opacity: show ? 1 : 0,
                        transition: `opacity .5s ease ${lineDelay(a, b)}s, stroke .25s ease, stroke-opacity .25s ease, stroke-width .25s ease`,
                      }}
                    />
                  );
                })}
                {/* узлы */}
                {Object.entries(POS).map(([id, p]) => {
                  const fed = id === 'federation';
                  const on = active ? isConnected(id) : true;
                  return (
                    <circle
                      key={id}
                      cx={p.x * VB_W}
                      cy={p.y * VB_H}
                      r={fed ? 1.55 : 1.22}
                      fill={fed || (active && id === active) ? '#a9f6ff' : '#77b6e9'}
                      fillOpacity={on ? 1 : 0.25}
                      style={{
                        opacity: show ? 1 : 0,
                        transition: `opacity .55s ease ${nodeDelay(id)}s, fill-opacity .25s ease, fill .25s ease`,
                      }}
                    />
                  );
                })}
              </svg>

              {/* Названия — реальный DOM-текст (SEO + hover-подсветка) */}
              {union.environments.map((e) => {
                const p = POS[e.id];
                const dim = active && !isConnected(e.id);
                const isActive = active === e.id;
                return (
                  <Box
                    key={e.id}
                    component={Link}
                    href={destinations[e.id]}
                    tabIndex={0}
                    onMouseEnter={() => setActive(e.id)}
                    onFocus={() => setActive(e.id)}
                    onBlur={() => setActive(null)}
                    style={{
                      opacity: show ? 1 : 0,
                      transform: show ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% + 6px))',
                      transition: `opacity .5s ease ${nodeDelay(e.id) + 0.05}s, transform .5s ease ${nodeDelay(e.id) + 0.05}s`,
                    }}
                    sx={{
                      position: 'absolute',
                      left: `${p.x * 100}%`,
                      top: `${p.y * 100}%`,
                      pointerEvents: 'auto',
                      cursor: 'pointer', textDecoration: 'none',
                      textAlign: 'center',
                      outline: 'none',
                      '&:focus-visible .lbl': { boxShadow: `0 0 0 2px ${ACCENT}55` },
                    }}
                  >
                    <Box
                      className="lbl"
                      sx={{
                        px: 2,
                        py: 1.25,
                        borderRadius: '999px',
                        backgroundColor: isActive ? '#0a63cb' : 'rgba(8, 30, 57, .74)',
                        border: isActive ? '1px solid #a7efff' : '1px solid rgba(130, 211, 255, .5)', boxShadow: isActive ? '0 0 0 3px rgba(86, 214, 255, .15), 0 10px 30px rgba(0, 11, 28, .5)' : '0 8px 22px rgba(0, 8, 25, .3)',
                        backdropFilter: 'blur(10px)',
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '0.92rem',
                        color: isActive ? '#fff' : dim ? '#7193b5' : '#e6f6ff',
                        transition: 'color .2s, background-color .2s, box-shadow .2s, transform .2s',
                        whiteSpace: 'nowrap',
                        '&:hover': { transform: 'translateY(-2px)', backgroundColor: '#0c5ab5' },
                      }}
                    >
                      {e.name} <span aria-hidden="true">↗</span>
                    </Box>
                    {/* краткое пояснение при hover — не выводится постоянно */}
                    <Box
                      sx={{
                        maxWidth: 200,
                        mx: 'auto',
                        mt: 0.5,
                        fontSize: '0.72rem',
                        lineHeight: 1.35,
                        color: '#b8d8f0',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity .2s',
                        pointerEvents: 'none',
                      }}
                    >
                      {e.hint}
                    </Box>
                  </Box>
                );
              })}

              {/* Подпись узла Федерации */}
              <Box
                component={Link}
                href="/about"
                style={{
                  opacity: show ? 1 : 0,
                  transition: `opacity .5s ease ${nodeDelay('federation') + 0.05}s`,
                }}
                sx={{
                  position: 'absolute',
                  left: `${POS.federation.x * 100}%`,
                  top: `${POS.federation.y * 100 + 5}%`,
                  transform: 'translate(-50%, 0)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: ACCENT,
                  textAlign: 'center',
                  maxWidth: 150,
                  lineHeight: 1.25,
                  pointerEvents: 'auto',
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #1c98e5, #0039a6)',
                  color: '#fff',
                  p: 1.5,
                  borderRadius: 3,
                  border: '1px solid #9beeff',
                  boxShadow: '0 0 0 7px rgba(61, 188, 255, .1), 0 12px 30px rgba(0, 6, 25, .45)',
                  '&:focus-visible': { outline: '3px solid #639eff', outlineOffset: 4 },
                }}
              >
                {union.federationNode}
              </Box>
            </Box>
          </Box>

          {/* Compact navigation on touch screens */}
          <Box sx={{ display: { xs: 'grid', md: 'none' }, gap: 1.5 }}>
            {union.environments.map((e) => <Box key={e.id} component={Link} href={destinations[e.id]} sx={{ display: 'block', p: 2.5, borderRadius: 3, border: '1px solid #c7d9ef', background: '#fff', textDecoration: 'none', color: GRAPHITE, '&:hover, &:focus-visible': { background: '#e7f1ff', outline: '2px solid #639eff' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: ACCENT }}>{e.name}<ArrowRight size={20} /></Box>
              <Box sx={{ mt: 1, fontSize: '.85rem', lineHeight: 1.5, color: '#596776' }}>{e.hint}</Box>
            </Box>)}
            <Link href="/about" style={{ color: ACCENT, padding: 12 }}>О Федерации →</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
