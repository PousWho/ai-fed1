export default function PresidentPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">Президент федерации</h1>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="md:flex">
              {/* Photo placeholder */}
              <div className="md:w-1/3 bg-gray-200 flex items-center justify-center p-8">
                <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-6xl text-gray-500">👤</span>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-6 text-[#0039a6] text-center md:text-left">Юрий Головко</h2>
                
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-8">
                  <p className="text-center md:text-left">
                    <strong>Предприниматель и практик.</strong>
                  </p>
                  <p className="text-center md:text-left">
                    Эксперт в области искусственного интеллекта, автоматизации и цифровых решений.
                  </p>
                  <p className="text-center md:text-left">
                    Опыт запуска и масштабирования проектов, работы с бизнесом, государством и образовательными организациями.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#0039a6]">
                  <p className="text-xl italic text-gray-800 text-center md:text-left">
                    "Федерация для меня — это не формальность, а инструмент реальных изменений."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

