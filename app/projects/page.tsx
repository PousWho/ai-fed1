interface Project {
  id: string;
  name: string;
  problem: string;
  target: string;
  result: string;
}

// Статические данные проектов
const projects: Project[] = [
  {
    id: '1',
    name: 'Образовательная платформа ИИ',
    problem: 'Недостаток практических навыков работы с ИИ у студентов и преподавателей',
    target: 'Студенты, преподаватели, образовательные учреждения',
    result: 'Повышение уровня компетенций, готовность к работе с ИИ-инструментами',
  },
  {
    id: '2',
    name: 'Система автоматизации бизнес-процессов',
    problem: 'Ручная обработка больших объемов данных и документов',
    target: 'Средний и крупный бизнес',
    result: 'Сокращение времени на обработку данных на 60-80%, снижение ошибок',
  },
];

export default function ProjectsPage() {

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">Продукты и проекты</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            Мы создаем и развиваем собственные решения в области ИИ и автоматизации. 
            Каждый проект — это ответ на конкретную задачу.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-semibold mb-6 text-[#0039a6] text-center">{project.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Какую проблему решает:</h3>
                  <p className="text-gray-700 text-center">{project.problem}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Для кого предназначен:</h3>
                  <p className="text-gray-700 text-center">{project.target}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Какой результат дает:</h3>
                  <p className="text-gray-700 text-center">{project.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Проекты будут добавлены в ближайшее время</p>
          </div>
        )}
      </div>
    </div>
  );
}

