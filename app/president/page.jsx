'use client';

import Image from 'next/image';
import PageIntro from '@/components/PageIntro';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function PresidentPage() {
  return (
    <div className="w-full pt-6 pb-20">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <PageIntro visual="president" title="Юрий Головко" label="Президент Федерации" />
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeScale} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-200 flex items-center justify-center p-8">
                  <Image src="/president.jpeg" alt="Юрий Головко" width={240} height={300} className="rounded-2xl object-cover" />
                </div>
                
                <div className="md:w-2/3 p-8">
                  <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center md:text-left">Юрий Головко</h2>
                  
                  <div className="space-y-4 text-lg text-neutral-700 leading-relaxed mb-8">
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

                  <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 backdrop-blur-xl p-6 rounded-xl border border-blue-200/50">
                    <p className="text-xl italic text-neutral-800 text-center md:text-left">
                      «Федерация для меня — это не формальность, а инструмент реальных изменений.»
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

