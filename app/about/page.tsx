export default function AboutPage() {
  const whatWeDo = [
    'Разрабатываем и проводим образовательные программы',
    'Запускаем пилотные проекты',
    'Помогаем внедрять ИИ в организациях',
    'Объединяем экспертов, бизнес и государство',
    'Создаем и масштабируем технологические решения',
  ];

  const howWeWork = [
    'Через практику',
    'Через реальные кейсы',
    'Через совместные проекты',
    'Через обучение и сопровождение',
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <section className="mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">О федерации</h1>
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-[#0039a6]">
              <h2 className="text-2xl font-semibold mb-4 text-[#0039a6] text-center">Миссия</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                Создавать условия, в которых искусственный интеллект становится рабочим инструментом для развития экономики, образования и общества.
              </p>
            </div>
          </section>

          {/* What We Do Section */}
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Что мы делаем</h2>
            <ul className="space-y-4 max-w-2xl mx-auto">
              {whatWeDo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0039a6] mr-3 text-xl">•</span>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How We Work Section */}
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Как мы работаем</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {howWeWork.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-[#0039a6] transition-colors text-center"
                >
                  <p className="text-lg text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

