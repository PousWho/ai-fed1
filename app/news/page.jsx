import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { Container, Box, Typography, Card } from '@mui/material';
import { getNewsList } from '@/lib/newsApi';

export const dynamic = 'force-dynamic';

export default async function NewsPage({ searchParams }) {
  const query = await searchParams;
  const page = Math.max(1, Number.parseInt(query?.page, 10) || 1);
  const category = typeof query?.category === 'string' ? query.category : '';
  let news;
  try { news = await getNewsList({ page, category }); }
  catch { news = null; }
  const pageHref = (number) => `/news?${new URLSearchParams({ ...(category ? { category } : {}), page: String(number) })}`;

  return <Box sx={{ pt: { xs: 3, md: 4 }, pb: 10, backgroundColor: '#fbfbfa' }}>
    <Container maxWidth="xl"><PageIntro visual="news" title="Новости и события" description="Публикации Федерации и новости искусственного интеллекта." /></Container>
    <Container maxWidth="lg">
      {!news ? <Typography role="alert">Новости временно недоступны. Попробуйте обновить страницу позже.</Typography> : <>
        {news.items.length === 0 && <Typography>Пока нет опубликованных новостей.</Typography>}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {news.items.map((item) => <Link key={item.id} href={`/news/${encodeURIComponent(item.slug)}`} style={{ textDecoration: 'none' }}><Card sx={{ p: 3, height: '100%', display: 'block', border: '1px solid rgba(0,0,0,.08)', boxShadow: 'none', color: '#212529', '&:hover': { borderColor: '#0039a6' } }}>
            {item.image_url && <Box component="img" src={item.image_url} alt="" sx={{ width: '100%', height: 190, objectFit: 'cover', borderRadius: 2, mb: 2 }} />}
            <Typography sx={{ fontSize: '.82rem', color: '#0039a6', mb: 1 }}>{item.category} · {item.published_at ? new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(new Date(item.published_at)) : ''}</Typography>
            <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
            <Typography sx={{ color: '#4a5057', lineHeight: 1.6 }}>{item.excerpt}</Typography>
          </Card></Link>)}
        </Box>
        {news.total > news.limit && <Box component="nav" aria-label="Страницы новостей" sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 5 }}>
          {page > 1 && <Link href={pageHref(page - 1)}>← Предыдущая</Link>}
          <Typography>Страница {page} из {Math.ceil(news.total / news.limit)}</Typography>
          {page * news.limit < news.total && <Link href={pageHref(page + 1)}>Следующая →</Link>}
        </Box>}
      </>}
    </Container>
  </Box>;
}
