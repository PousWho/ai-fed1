 'use client';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import { federationContacts } from '@/lib/contacts';
export default function Footer() {
 return <Box component="footer" sx={{ mt: 6, background: '#0b1422', color: '#fff', borderTop: '3px solid #163659' }}>
  <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
   <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr' }, gap: 4 }}>
    <Box><Typography variant="h5" sx={{ maxWidth: '23ch', mb: 2 }}>Федерация искусственного интеллекта</Typography><Typography variant="body2" sx={{ color: '#aebdd0' }}>Объединяем тех, кто создаёт будущее ИИ в России.</Typography></Box>
    <Box component="nav" aria-label="Навигация в подвале" sx={{ display: 'grid', gap: 1.25 }}>
     {[["/about", "О Федерации"], ["/directions", "Направления"], ["/projects", "Проекты"], ["/results", "Результаты"], ["/news", "Новости"], ["/partnership", "Партнёрство"]].map(([href, title]) => <Link key={href} href={href}>{title}</Link>)}
    </Box>
    <Box sx={{ display: 'grid', alignContent: 'start', gap: 1.5 }}><Link href="/contacts">Контакты</Link><a href={`mailto:${federationContacts.email}`}>{federationContacts.email}</a><a href={federationContacts.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram ↗</a><a href={federationContacts.vkUrl} target="_blank" rel="noopener noreferrer">ВКонтакте ↗</a></Box>
   </Box>
   <Box sx={{ borderTop: '1px solid #ffffff20', mt: 5, pt: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between', color: '#aebdd0', fontSize: '.8rem' }}><span>© {new Date().getFullYear()} Федерация искусственного интеллекта</span><Link href="/privacy">Политика обработки данных</Link><Link href="/consent">Согласие на обработку ПДн</Link></Box>
  </Container>
 </Box>;
}
