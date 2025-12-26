import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">
              Федерация Искусственного Интеллекта
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Объединяем образование, бизнес и государство для развития ИИ и цифровых технологий
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-gray-900">Разделы</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  О федерации
                </Link>
              </li>
              <li>
                <Link href="/directions" className="hover:text-gray-900 transition-colors">
                  Направления
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gray-900 transition-colors">
                  Проекты
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-gray-900 transition-colors">
                  Партнерство
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gray-900 transition-colors">
                  Новости
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-gray-900">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/contacts" className="hover:text-gray-900 transition-colors">
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-gray-900 transition-colors">
                  Стать партнером
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-gray-900 transition-colors">
                  Вступить в федерацию
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Федерация развития искусственного интеллекта и цифровых технологий. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

