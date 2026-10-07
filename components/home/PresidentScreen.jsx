import Image from 'next/image';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import { president } from '@/lib/leadership';

export default function PresidentScreen() {
  return (
    <Box component="section" aria-labelledby="president-home-title" sx={{ backgroundColor: '#fbfbfa', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 5, lg: 6 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, .8fr) minmax(0, 1.2fr)' }, alignItems: 'center', gap: { xs: 4, md: 8 } }}>
          <Box sx={{ position: 'relative', width: '100%', maxWidth: 440, mx: 'auto', aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: 5, backgroundColor: '#e4e8ed' }}>
            <Image src={president.photo} alt={president.name} fill sizes="(min-width: 900px) 440px, (min-width: 600px) 440px, 100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          </Box>
          <Box sx={{ color: '#1a1d21' }}>
            <Box component="p" sx={{ m: 0, color: '#0039a6', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase' }}>{president.role}</Box>
            <Box component="h2" id="president-home-title" sx={{ mt: 2, mb: 3, fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)', fontWeight: 700, lineHeight: 1.15 }}>{president.name}</Box>
            <Box sx={{ fontSize: '1.08rem', lineHeight: 1.65, color: '#4a5057', '& p': { mb: 2 } }}>
              <p><strong>Предприниматель и практик.</strong></p>
              <p>Эксперт в области искусственного интеллекта, автоматизации и цифровых решений.</p>
              <p>Опыт запуска и масштабирования международных проектов, работы с бизнесом, государством и образовательными организациями.</p>
            </Box>
            <Box component="blockquote" sx={{ mx: 0, my: 4, pl: 2.5, borderLeft: '2px solid #0039a6', fontSize: { xs: '1.15rem', md: '1.4rem' }, lineHeight: 1.5, fontWeight: 500 }}>
              «Федерация для меня — это не формальность, а инструмент реальных изменений, точка сборки людей, идей и технологий, которые двигают страну вперед.»
            </Box>
            <Link href="/president" style={{ color: '#0039a6', fontWeight: 600, textDecoration: 'none' }}>Подробнее о президенте Федерации →</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
