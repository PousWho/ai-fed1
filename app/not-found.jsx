import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0039a6] via-[#0039a6] to-[#d52b1e] mb-4">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Страница не найдена
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#0039a6] text-white px-8 py-4 rounded-lg hover:bg-[#002d85] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/contacts"
            className="bg-white text-[#0039a6] border-2 border-[#0039a6] px-8 py-4 rounded-lg hover:bg-[#0039a6] hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}

