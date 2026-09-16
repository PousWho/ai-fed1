'use client';

import PageIntro from '@/components/PageIntro';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Card } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';

const ACCENT = '#0039a6';
const GRAPHITE = '#1a1d21';

// Реальные события — взяты из results-2024-2026.html (полная хронология
// 79 мероприятий Федерации). Здесь — самые свежие, по разным направлениям.
// «Читать далее» не показываем — отдельных страниц новостей пока нет
// (тот же принцип, что и на экране «Направления»: нет страницы — нет ссылки).
const news = [
  {
    id: 'ev78',
    title: 'Программа «ИИ в личной работе руководителя»',
    excerpt: 'Четырёхдневная программа для руководителей и специалистов промышленных предприятий, вузов и ИТ-компаний Омской области. Второй день — практическая работа с AI-инструментами и Kodik AI-IDE.',
    date: '29 июля — 1 августа 2026',
    category: 'Мастер-классы и обучение',
    url: 'https://t.me/gyurik/3432',
  },
  {
    id: 'ev77',
    title: 'Открытый вебинар с Бизнес-школой МФТИ',
    excerpt: 'Прямо в эфире собирали рабочие инструменты с нуля: от задачи обычными словами до готового решения — обработка заявок, отчёты, расчёты, автоматизация процессов.',
    date: '21 июля 2026',
    category: 'Мастер-классы и обучение',
    url: 'https://business.mipt.ru/vibecoding',
  },
  {
    id: 'ev76',
    title: 'Конференция «Искусственный интеллект и общество» (AIS-2026)',
    excerpt: 'Доклад «Вайбкодинг в образовании» на второй сессии конференции в НИУ ВШЭ.',
    date: '1 июля 2026',
    category: 'Форумы и конференции',
    url: 'https://cs.hse.ru/aisschool/2026/',
  },
  {
    id: 'ev73',
    title: 'ПМЭФ-2026: соглашение с «Группой УКМ»',
    excerpt: 'Инвестиционная компания «Группа УКМ» под руководством Никиты Мазепина инвестирует в «АрхиТех ИИ».',
    date: '28–29 мая 2026',
    category: 'Партнёрства и соглашения',
    url: null,
  },
  {
    id: 'ev70',
    title: 'Сюжет на Первом канале про дипфейки',
    excerpt: 'Команда Кодик стала участником сюжета про дипфейки, нейросети и цифровой обман.',
    date: '22 мая 2026',
    category: 'Признание, медиа, экспертиза',
    url: 'https://t.me/gyurik/3376',
  },
  {
    id: 'ev68',
    title: 'ИТ-кубок «ПРОТЕХНО 2026» — 24-часовой хакатон',
    excerpt: 'Подано 134 заявки, в финал вышли 53 человека в 15 командах. Чемпион — команда СФУ «Безумный MAX».',
    date: '25 апреля 2026',
    category: 'Хакатоны и турниры',
    url: 'https://cisoclub.ru/bezumnyj-max-vyigral-kubok-po-vajbkodingu-za-sposobnost-bystro-sozdavat-kommunikacionnye-platformy/',
  },
  {
    id: 'ev67',
    title: 'Рабочая встреча Комитетов «ИТ-Кластера Сибири»',
    excerpt: 'Синхронизация работы комитетов и определение приоритетов на год.',
    date: '22 апреля 2026',
    category: 'Вехи',
    url: 'https://t.me/gyurik/3348',
  },
  {
    id: 'ev66',
    title: 'Чтения им. В. И. Вернадского — мастер-класс',
    excerpt: 'Мастер-класс по вайбкодингу: более 30 школьников собирали работающие проекты, формулируя задачу обычными словами.',
    date: '16 апреля 2026',
    category: 'Мастер-классы и обучение',
    url: null,
  },
  {
    id: 'ev63',
    title: 'Открытая дискуссия «Талант в эпоху ИИ»',
    excerpt: 'Дискуссия о таланте и образовании в эпоху искусственного интеллекта — совместно с благотворительным фондом «Эмпатия», МФТИ.',
    date: '14 апреля 2026',
    category: 'Форумы и конференции',
    url: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function NewsPage() {
  return (
    <Box sx={{ width: '100%', pt: { xs: 3, md: 4 }, pb: 10, backgroundColor: '#fbfbfa' }}>
      <Container maxWidth="lg">
        <PageIntro visual="news" title="Новости и события" description="Мероприятия, программы, партнёрства и ключевые события Федерации." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
            >
              <Card
                {...(item.url
                  ? { component: 'a', href: item.url, target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                sx={{
                  height: '100%',
                  p: 3,
                  display: 'block',
                  textDecoration: 'none',
                  cursor: item.url ? 'pointer' : 'default',
                  backgroundColor: '#ffffff !important',
                  color: '#212529 !important',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: 'none',
                  position: 'relative',
                  '& .MuiTypography-root': { color: 'inherit !important' },
                  '&:hover': {
                    transform: 'none !important',
                    borderColor: item.url ? `${ACCENT} !important` : 'rgba(0,0,0,0.08) !important',
                    backgroundColor: '#ffffff !important',
                    '& .MuiTypography-root': { color: 'inherit !important' },
                    '& .news-arrow': { opacity: item.url ? 1 : 0, transform: 'translate(2px, -2px)' },
                  },
                }}
              >
                {item.url && (
                  <Box
                    className="news-arrow"
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      color: ACCENT,
                      opacity: 0.35,
                      transition: 'opacity .2s ease, transform .2s ease',
                    }}
                  >
                    <ArrowUpRight size={18} strokeWidth={2.2} />
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap', pr: item.url ? 3 : 0 }}>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: `${ACCENT} !important`,
                      backgroundColor: 'rgba(0,57,166,0.08) !important',
                      borderRadius: '999px',
                      px: 1.25,
                      py: 0.4,
                    }}
                  >
                    {item.category}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#6c757d !important' }}>{item.date}</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.25, color: `${GRAPHITE} !important` }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#4a5057 !important', lineHeight: 1.55 }}>{item.excerpt}</Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
