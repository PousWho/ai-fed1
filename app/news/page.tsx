interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

// Статические данные новостей
const news: NewsItem[] = [
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

export default function NewsPage() {

  const categories = ['Все', 'Образование', 'Партнерство', 'Проекты', 'Мероприятия'];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">Новости и события</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            Здесь мы публикуем анонсы мероприятий, запуски программ, ключевые события и проекты федерации.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-md border border-gray-300 hover:border-[#0039a6] hover:text-[#0039a6] transition-colors text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="mb-4 text-center">
                <span className="text-sm text-[#0039a6] font-semibold">{item.category}</span>
                <span className="text-sm text-gray-500 ml-2">{item.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 text-center">{item.title}</h2>
              <p className="text-gray-700 mb-4 text-center">{item.excerpt}</p>
              <div className="text-center">
                <a
                  href={`/news/${item.id}`}
                  className="text-[#0039a6] hover:text-[#002d85] font-medium"
                >
                  Читать далее →
                </a>
              </div>
            </article>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Новости будут добавлены в ближайшее время</p>
          </div>
        )}
      </div>
    </div>
  );
}

