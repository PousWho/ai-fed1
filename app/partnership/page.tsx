import Link from 'next/link';

export default function PartnershipPage() {
  const formats = [
    {
      title: 'Образовательное партнерство',
      description: 'Совместные программы обучения, обмен экспертизой, развитие образовательных проектов',
    },
    {
      title: 'Технологическое партнерство',
      description: 'Разработка и внедрение решений, совместные технологические проекты',
    },
    {
      title: 'Региональные проекты',
      description: 'Развитие цифровой инфраструктуры регионов, поддержка местных инициатив',
    },
    {
      title: 'Информационное сотрудничество',
      description: 'Обмен опытом, публикации, участие в мероприятиях и конференциях',
    },
  ];

  const benefits = [
    'Доступ к экспертизе',
    'Участие в проектах',
    'Развитие имиджа',
    'Подготовку кадров',
    'Совместные продукты и программы',
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">Партнерство</h1>
          
          <div className="mb-16">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Мы открыты к партнерству и совместным проектам.
            </p>
          </div>

          {/* Partnership Formats */}
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Форматы партнерства</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formats.map((format, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#0039a6]"
                >
                  <h3 className="text-xl font-semibold mb-3 text-[#0039a6] text-center">{format.title}</h3>
                  <p className="text-gray-700 text-center">{format.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Партнеры получают</h2>
            <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start justify-center">
                    <span className="text-[#0039a6] mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/contacts?type=partner"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-base"
            >
              Стать партнером
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

