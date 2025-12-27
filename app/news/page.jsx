'use client';

import { motion } from 'framer-motion';
import GradientText from '@/components/GradientText';

// Статические данные новостей
const news = [
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function NewsPage() {
  const categories = ['Все', 'Образование', 'Партнерство', 'Проекты', 'Мероприятия'];

  return (
    <div className="w-full pt-20 pb-20">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.h1 
          initial="hidden" 
          whileInView="visible" 
          variants={fadeUp} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          <GradientText>Новости и события</GradientText>
        </motion.h1>
        
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          variants={fadeUp} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg text-neutral-700 text-center leading-relaxed">
            Здесь мы публикуем анонсы мероприятий, запуски программ, ключевые события и проекты федерации.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          variants={fadeUp} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-xl border border-white/60 bg-white/80 backdrop-blur-xl hover:border-blue-400 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* News List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
              className=""
            >
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
                <div className="mb-4 text-center">
                  <span className="text-sm text-blue-600 font-semibold">{item.category}</span>
                  <span className="text-sm text-neutral-500 ml-2">{item.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-neutral-900 text-center">{item.title}</h2>
                <p className="text-neutral-700 mb-4 text-center">{item.excerpt}</p>
                <div className="text-center">
                  <a
                    href={`/news/${item.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium transition"
                  >
                    Читать далее →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {news.length === 0 && (
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-lg text-neutral-500">Новости будут добавлены в ближайшее время</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

