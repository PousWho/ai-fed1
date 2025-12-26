import Link from 'next/link';

export default function Home() {
  const directions = [
    {
      icon: '🎓',
      title: 'Образование',
      description: 'Практические программы по ИИ и цифровым навыкам для школьников, студентов, преподавателей и управленцев.',
    },
    {
      icon: '⚙️',
      title: 'Внедрение',
      description: 'Помогаем организациям внедрять ИИ в рабочие процессы — от аналитики и продаж до управления и поддержки.',
    },
    {
      icon: '🗺️',
      title: 'Регионы',
      description: 'Поддержка цифрового развития территорий, запуск пилотов, подготовка специалистов.',
    },
    {
      icon: '👥',
      title: 'Кадры',
      description: 'Формирование кадрового резерва и подготовка специалистов нового поколения.',
    },
    {
      icon: '💻',
      title: 'Продукты',
      description: 'Разработка и тиражирование собственных платформ и решений.',
    },
  ];

  const targetAudience = [
    {
      title: 'Государству',
      description: 'Методическая поддержка, кадры, цифровые проекты и пилоты.',
    },
    {
      title: 'Образованию',
      description: 'Современные программы, инструменты и практики для преподавателей и студентов.',
    },
    {
      title: 'Бизнесу',
      description: 'Решения, которые дают измеримый результат и экономию времени.',
    },
    {
      title: 'Регионам',
      description: 'Экосистемный подход к развитию ИИ и цифровых компетенций.',
    },
    {
      title: 'Молодежи',
      description: 'Навыки, которые реально пригодятся в профессии и жизни.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Федерация развития
              <br />
              <span className="text-[#0039a6]">искусственного интеллекта</span>
              <br />
              <span className="text-[#d52b1e]">и цифровых технологий</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Мы объединяем образование, бизнес и государство, чтобы ИИ работал в реальных задачах, а не в презентациях.
              <br />
              <span className="font-semibold text-gray-900">Подготовка кадров. Внедрение решений. Масштабирование практик.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partnership"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-base"
              >
                Стать партнером
              </Link>
              <Link
                href="/contacts?type=join"
                className="bg-white text-black border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium text-base"
              >
                Вступить в федерацию
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Federation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">
              Зачем существует федерация
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Искусственный интеллект уже влияет на экономику, образование и управление.
              </p>
              <p>
                Наша задача — сделать так, чтобы эти технологии были понятны, доступны и полезны людям, организациям и регионам.
              </p>
              <p className="font-semibold text-gray-900 text-xl">
                Федерация — это точка сборки экспертизы, практики и проектов.
              </p>
              <p>
                Мы соединяем тех, кто создает технологии, с теми, кому они реально нужны.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Directions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">
            Ключевые направления
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directions.map((direction, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{direction.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{direction.title}</h3>
                <p className="text-gray-600 leading-relaxed">{direction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">
            Для кого мы работаем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((audience, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#0039a6]">{audience.title}</h3>
                <p className="text-gray-600 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900">
              Готовы начать сотрудничество?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Присоединяйтесь к федерации и станьте частью экосистемы развития ИИ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partnership"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-base"
              >
                Стать партнером
              </Link>
              <Link
                href="/contacts?type=join"
                className="bg-white text-black border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium text-base"
              >
                Вступить в федерацию
              </Link>
              <Link
                href="/contacts"
                className="bg-white text-black border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium text-base"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
