# Сайт Федерации развития искусственного интеллекта и цифровых технологий

Next.js 16 с TypeScript и Tailwind CSS.

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения:
```bash
cp .env.example .env
```

Отредактируйте `.env` файл и укажите настройки для отправки email:
- `SMTP_HOST` - SMTP сервер (например, smtp.gmail.com)
- `SMTP_PORT` - Порт SMTP (обычно 587)
- `SMTP_USER` - Email для отправки
- `SMTP_PASSWORD` - Пароль приложения (для Gmail нужен App Password)
- `SMTP_FROM` - Email отправителя
- `CONTACT_EMAIL` - Email для получения заявок

3. Запустите dev сервер:
```bash
npm run dev
```

## Структура проекта

- `/app` - Страницы и API routes
- `/components` - React компоненты
- `/lib` - Утилиты (email отправка)

## Страницы сайта

- `/` - Главная страница
- `/about` - О федерации
- `/directions` - Направления деятельности
- `/projects` - Продукты и проекты
- `/partnership` - Партнерство
- `/president` - Президент федерации
- `/news` - Новости и события
- `/contacts` - Контакты и форма обратной связи

## Формы

Все формы отправляют данные на email:
- Форма "Стать партнером"
- Форма "Вступить в федерацию"
- Форма обратной связи

## Настройка email (Gmail)

Для использования Gmail:
1. Включите двухфакторную аутентификацию
2. Создайте App Password: https://myaccount.google.com/apppasswords
3. Используйте App Password в `SMTP_PASSWORD`

## Production

Для production сборки:
```bash
npm run build
npm start
```

Убедитесь, что все переменные окружения настроены в production окружении.
