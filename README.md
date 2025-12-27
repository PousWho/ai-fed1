# Сайт Федерации развития искусственного интеллекта

Веб-сайт Федерации развития искусственного интеллекта

## Технологии

- **Next.js 16** 
- **Material UI (MUI)** 
- **Tailwind CSS** 
- **Framer Motion** 
- **OGL** 

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения (если требуется):
```bash
cp .env.example .env
```

Отредактируйте `.env` файл и укажите настройки для отправки email:
- `SMTP_HOST` - SMTP сервер
- `SMTP_PORT` - Порт SMTP (обычно 587)
- `SMTP_USER` - Email для отправки
- `SMTP_PASSWORD` - Пароль приложения
- `SMTP_FROM` - Email отправителя
- `CONTACT_EMAIL` - Email для получения заявок

3. Запустите dev сервер:
```bash
npm run dev
```


