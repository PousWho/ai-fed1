# Бекенд форм сайта федерацияии.рф

Небольшой API-сервис, который принимает заявки с форм сайта и отправляет их на почту.
Сам сайт — статика на GitHub Pages, серверного кода там нет, поэтому формы шлют
запросы на этот сервис.

## Эндпоинты

- `POST /api/contact` — приём заявки (форма контактов / «стать партнёром» / «вступить»)
- `GET /health` — проверка живости

## Запуск локально

```bash
cd backend
cp .env.example .env   # заполнить SMTP_USER и SMTP_PASSWORD
npm install
npm start              # сервер на http://localhost:4000
```

Для Gmail в `SMTP_PASSWORD` нужен **пароль приложения** (не обычный пароль от почты):
Google Аккаунт → Безопасность → Двухэтапная аутентификация → Пароли приложений.

Фронтенд в режиме разработки направляется на локальный бекенд так:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev
```

## Запуск в Docker

```bash
cd backend
cp .env.example .env   # заполнить
docker compose up -d --build
```

## Деплой в продакшен (когда будет сервер)

1. Поднять контейнер на VPS (см. Docker выше), поставить перед ним nginx с HTTPS
   (например, поддомен `api.федерацияии.рф`, сертификат — certbot).
   В `.env` выставить `TRUST_PROXY=true`.

   Важно для безопасности:
   - порт бекенда наружу не публикуется — в docker-compose он привязан к
     `127.0.0.1`, менять это нельзя (иначе rate-limit обходится подделкой
     заголовка `X-Forwarded-For` при прямом обращении к порту);
   - в nginx обязательно:

     ```nginx
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header Host $host;
     ```
2. В репозитории задать адрес API и передеплоить сайт:

   ```bash
   gh variable set NEXT_PUBLIC_API_URL --body "https://api.xn--80ahcbqaa4d6aza4h.xn--p1ai"
   gh workflow run "Deploy to GitHub Pages"
   ```

## Защита от спама

- Rate-limit: не больше `RATE_LIMIT` (по умолчанию 5) заявок с одного IP за 10 минут.
- Honeypot: скрытое поле `website` в форме; если оно заполнено (бот) — письмо не отправляется.
- CORS: браузерные запросы принимаются только с доменов из `ALLOWED_ORIGINS`.
- Ограничение размера тела запроса (50 КБ) и длины всех полей.
