import { NextResponse } from 'next/server';

// Статические данные проектов (можно заменить на файл или внешний API)
const staticProjects = [
  {
    id: '1',
    name: 'Образовательная платформа ИИ',
    problem: 'Недостаток практических навыков работы с ИИ у студентов и преподавателей',
    target: 'Студенты, преподаватели, образовательные учреждения',
    result: 'Повышение уровня компетенций, готовность к работе с ИИ-инструментами',
    published: true,
  },
  {
    id: '2',
    name: 'Система автоматизации бизнес-процессов',
    problem: 'Ручная обработка больших объемов данных и документов',
    target: 'Средний и крупный бизнес',
    result: 'Сокращение времени на обработку данных на 60-80%, снижение ошибок',
    published: true,
  },
];

export async function GET(request) {
  try {
    const projects = staticProjects.filter((p) => p.published);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке проектов' },
      { status: 500 }
    );
  }
}

