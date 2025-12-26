export default function DirectionsPage() {
  const directions = [
    {
      title: 'Образование',
      description: 'Мы обучаем не теории, а тому, как ИИ реально помогает в работе. Программы адаптированы под разный уровень подготовки и задачи.',
      icon: '🎓',
    },
    {
      title: 'Бизнес',
      description: 'Помогаем компаниям находить точки применения ИИ, запускать пилоты и получать результат.',
      icon: '💼',
    },
    {
      title: 'Государство и регионы',
      description: 'Сопровождаем цифровые проекты, готовим специалистов, помогаем выстраивать долгосрочные программы развития.',
      icon: '🏛️',
    },
    {
      title: 'Мероприятия',
      description: 'Проводим форумы, хакатоны, турниры и интенсивы, где участники работают с реальными задачами.',
      icon: '📅',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">Направления деятельности</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {directions.map((direction, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="text-5xl mb-4 text-center">{direction.icon}</div>
              <h2 className="text-2xl font-semibold mb-4 text-[#0039a6] text-center">{direction.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center">{direction.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

