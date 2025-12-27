'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О федерации' },
    { href: '/directions', label: 'Направления' },
    { href: '/projects', label: 'Продукты и проекты' },
    { href: '/partnership', label: 'Партнерство' },
    { href: '/president', label: 'Президент' },
    { href: '/news', label: 'Новости' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <div className="text-lg font-semibold text-gray-900">
              Федерация ИИ
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/contacts"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Оставить заявку
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contacts"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Оставить заявку
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

