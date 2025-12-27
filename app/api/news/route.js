import { NextResponse } from 'next/server';

// Статические данные новостей (можно заменить на файл или внешний API)
const staticNews = [
  {
    id: '1',
    title: 'Запуск новой образовательной программы',
    excerpt: 'Объявляем о старте программы по практическому применению ИИ в бизнесе',
    date: '2024-01-15',
    category: 'Образование',
  },
  {
    id: '2',
    title: 'Партнерство с ведущими вузами',
    excerpt: 'Федерация подписала соглашения о сотрудничестве с несколькими университетами',
    date: '2024-01-10',
    category: 'Партнерство',
  },
];

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    let news = staticNews;

    if (category && category !== 'Все') {
      news = news.filter((item) => item.category === category);
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке новостей' },
      { status: 500 }
    );
  }
}

