import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import { getNewsBySlug } from '@/lib/newsApi';
import NewsContent from '@/components/NewsContent';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const item = await getNewsBySlug(slug);
    return item ? { title: item.seo_title || item.title, description: item.seo_description || item.excerpt } : {};
  } catch { return {}; }
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  let item;
  try { item = await getNewsBySlug(slug); }
  catch { return <Container sx={{ py: 8 }}><Typography role="alert">Новость временно недоступна. Попробуйте позже.</Typography></Container>; }
  if (!item) notFound();

  return <Box sx={{ pt: 4, pb: 10, backgroundColor: '#fbfbfa' }}><Container maxWidth="md">
    <Link href="/news">← Все новости</Link>
    <Typography sx={{ color: '#0039a6', mt: 5, mb: 2 }}>{item.category} · {item.published_at ? new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(new Date(item.published_at)) : ''}</Typography>
    <Typography component="h1" variant="h2" sx={{ fontWeight: 700, mb: 3 }}>{item.title}</Typography>
    <Typography sx={{ fontSize: '1.2rem', color: '#4a5057', mb: 4 }}>{item.excerpt}</Typography>
    {item.image_url && <Box component="img" src={item.image_url} alt="" sx={{ display: 'block', width: '100%', height: 'auto', borderRadius: 3, mb: 5 }} />}
    <NewsContent content={item.content} />
    <Typography sx={{ mt: 5, color: '#667' }}>Автор: {item.author}</Typography>
    {item.source_url && <Typography sx={{ mt: 2 }}><a href={item.source_url} target="_blank" rel="noopener noreferrer">Источник: {item.source_name || item.source_url}</a></Typography>}
    {item.telegram_url && <Typography sx={{ mt: 1 }}><a href={item.telegram_url} target="_blank" rel="noopener noreferrer">Публикация в Telegram</a></Typography>}
  </Container></Box>;
}
