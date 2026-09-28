import { pool } from './db.js';
import { createNewsRepository } from './newsRepository.js';
import { slugify } from './slug.js';

// Перенос новостей, которые до сих пор жили статическим массивом в
// app/news/page.jsx, в PostgreSQL — разовый посев для первого запуска на
// сервере. Скрипт идемпотентен: повторный запуск пропускает уже добавленные
// новости (проверка по slug), так что его можно безопасно гонять ещё раз.
const items = [
  {
    title: 'Программа «ИИ в личной работе руководителя»',
    excerpt: 'Четырёхдневная программа для руководителей и специалистов промышленных предприятий, вузов и ИТ-компаний Омской области. Второй день — практическая работа с AI-инструментами и Kodik AI-IDE.',
    category: 'Мастер-классы и обучение',
    url: 'https://t.me/gyurik/3432',
    publishedAt: '2026-07-29',
  },
  {
    title: 'Открытый вебинар с Бизнес-школой МФТИ',
    excerpt: 'Прямо в эфире собирали рабочие инструменты с нуля: от задачи обычными словами до готового решения — обработка заявок, отчёты, расчёты, автоматизация процессов.',
    category: 'Мастер-классы и обучение',
    url: 'https://business.mipt.ru/vibecoding',
    publishedAt: '2026-07-21',
  },
  {
    title: 'Конференция «Искусственный интеллект и общество» (AIS-2026)',
    excerpt: 'Доклад «Вайбкодинг в образовании» на второй сессии конференции в НИУ ВШЭ.',
    category: 'Форумы и конференции',
    url: 'https://cs.hse.ru/aisschool/2026/',
    publishedAt: '2026-07-01',
  },
  {
    title: 'ПМЭФ-2026: соглашение с «Группой УКМ»',
    excerpt: 'Инвестиционная компания «Группа УКМ» под руководством Никиты Мазепина инвестирует в «АрхиТех ИИ».',
    category: 'Партнёрства и соглашения',
    url: null,
    publishedAt: '2026-05-28',
  },
  {
    title: 'Сюжет на Первом канале про дипфейки',
    excerpt: 'Команда Кодик стала участником сюжета про дипфейки, нейросети и цифровой обман.',
    category: 'Признание, медиа, экспертиза',
    url: 'https://t.me/gyurik/3376',
    publishedAt: '2026-05-22',
  },
  {
    title: 'ИТ-кубок «ПРОТЕХНО 2026» — 24-часовой хакатон',
    excerpt: 'Подано 134 заявки, в финал вышли 53 человека в 15 командах. Чемпион — команда СФУ «Безумный MAX».',
    category: 'Хакатоны и турниры',
    url: 'https://cisoclub.ru/bezumnyj-max-vyigral-kubok-po-vajbkodingu-za-sposobnost-bystro-sozdavat-kommunikacionnye-platformy/',
    publishedAt: '2026-04-25',
  },
  {
    title: 'Рабочая встреча Комитетов «ИТ-Кластера Сибири»',
    excerpt: 'Синхронизация работы комитетов и определение приоритетов на год.',
    category: 'Вехи',
    url: 'https://t.me/gyurik/3348',
    publishedAt: '2026-04-22',
  },
  {
    title: 'Чтения им. В. И. Вернадского — мастер-класс',
    excerpt: 'Мастер-класс по вайбкодингу: более 30 школьников собирали работающие проекты, формулируя задачу обычными словами.',
    category: 'Мастер-классы и обучение',
    url: null,
    publishedAt: '2026-04-16',
  },
  {
    title: 'Открытая дискуссия «Талант в эпоху ИИ»',
    excerpt: 'Дискуссия о таланте и образовании в эпоху искусственного интеллекта — совместно с благотворительным фондом «Эмпатия», МФТИ.',
    category: 'Форумы и конференции',
    url: null,
    publishedAt: '2026-04-14',
  },
];

async function run() {
  const repo = createNewsRepository();

  for (const item of items) {
    const slug = slugify(item.title);

    if (await repo.slugExists(slug)) {
      console.log(`Пропускаю «${item.title}» — slug "${slug}" уже есть в базе`);
      continue;
    }

    const isTelegram = Boolean(item.url && item.url.startsWith('https://t.me/'));

    const news = await repo.createNews({
      slug,
      title: item.title,
      excerpt: item.excerpt,
      // Полного текста статьи в старом статическом списке не было —
      // используем excerpt и как content, пока не появятся полные тексты.
      content: item.excerpt,
      category: item.category,
      source_url: isTelegram ? null : item.url,
      telegram_url: isTelegram ? item.url : null,
      status: 'published',
      published_at: new Date(item.publishedAt),
    });
    console.log(`Добавлена новость: ${news.slug}`);
  }

  console.log('Посев завершён.');
  await pool.end();
}

run().catch((error) => {
  console.error('Ошибка посева:', error);
  process.exit(1);
});
