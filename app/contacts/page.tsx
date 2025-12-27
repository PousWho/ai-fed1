'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';

function ContactsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'partner' | 'join' | 'contact' | null;

  const formType = type === 'partner' ? 'partner' : type === 'join' ? 'join' : 'contact';

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">Контакты</h1>
          
          <div className="mb-16">
            <p className="text-lg text-gray-700 text-center leading-relaxed mb-6">
              Свяжитесь с нами, если вы:
            </p>
            <ul className="list-none text-gray-700 space-y-3 max-w-2xl mx-auto text-center">
              <li>• хотите стать партнером</li>
              <li>• заинтересованы в проектах</li>
              <li>• планируете внедрение ИИ</li>
              <li>• ищете образовательные программы</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold mb-6 text-[#0039a6]">Контактная информация</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Email:</h3>
                  <a href="mailto:info@fii-federation.ru" className="text-[#0039a6] hover:underline">
                    info@fii-federation.ru
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Социальные сети:</h3>
                  <div className="flex space-x-4 justify-center lg:justify-start">
                    <a href="#" className="text-[#0039a6] hover:underline">Telegram</a>
                    <a href="#" className="text-[#0039a6] hover:underline">VK</a>
                    <a href="#" className="text-[#0039a6] hover:underline">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm type={formType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-12 px-4">Загрузка...</div>}>
      <ContactsContent />
    </Suspense>
  );
}

