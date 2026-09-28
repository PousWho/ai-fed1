# Бекенд форм сайта федерацияии.рф

Небольшой API-сервис, который принимает заявки с форм сайта и отправляет их на почту.
Сам сайт — статика на GitHub Pages, серверного кода там нет, поэтому формы шлют
запросы на этот сервис.

## Эндпоинты

- `POST /api/contact` — приём заявки (форма контактов / «стать партнёром» / «вступить»)
- `GET /health` — проверка живости (и соединения с PostgreSQL)
- `GET /api/news` — список опубликованных новостей (публично)
- `GET /api/news/:slug` — одна опубликованная новость (публично)
- `POST /api/news` — создать новость (нужен токен)
- `PATCH /api/news/:id` — изменить новость (нужен токен)
- `DELETE /api/news/:id` — архивировать новость (нужен токен)
- `GET /api/admin/news` — список новостей всех статусов (нужен токен)

## Запуск локально

```bash
cd backend
cp .env.example .env   # заполнить SMTP_USER, SMTP_PASSWORD, DATABASE_URL, NEWS_API_TOKEN
npm install
```

Нужен запущенный PostgreSQL (например `docker compose up -d postgres` из этой же
папки — поднимет только базу). Дальше применить миграции и запустить сервер:

```bash
npm run migrate        # создаёт таблицу news
npm start               # сервер на http://localhost:4000
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
cp .env.example .env   # заполнить; DATABASE_URL должен указывать на хост postgres:
                        #   DATABASE_URL=postgres://fii_news:changeme@postgres:5432/fii_news
docker compose up -d --build
docker compose exec forms-api npm run migrate   # один раз при первом развёртывании
```

Контейнер `postgres` хранит данные в именованном Docker volume (`postgres_data`),
поэтому пересоздание/перезапуск `forms-api` новости не удаляет. Порт PostgreSQL
наружу не публикуется — только доступ из `forms-api` внутри сети compose.

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

## Новости

Новости хранятся в PostgreSQL (таблица `news`, миграция
`migrations/0001_create_news.sql`) и управляются через API — без изменения
кода сайта, коммитов или пересборки frontend. В дальнейшем `POST /api/news`
будет вызывать Telegram-бот `YuraAICommand_bot` после подтверждения публикации.

Страницы `/news` и `/news/[slug]` читают опубликованные записи с сервера при
каждом запросе. Для VPS задайте фронтенду `NEWS_API_ORIGIN=http://backend:4000`
на время работы контейнера (настройка уже включена в `infra/docker-compose.vps.yml`).
Перед первым запуском выполните `docker compose -f infra/docker-compose.vps.yml exec backend npm run migrate`.
Режим статического экспорта GitHub Pages не поддерживает новые динамические URL
новостей; для них нужен запущенный Next.js сервер.

### Миграции

```bash
npm run migrate
```

Применяет все ещё не применённые файлы из `migrations/` по порядку,
отслеживая их в служебной таблице `schema_migrations`. Новые миграции —
это просто новые пронумерованные `.sql`-файлы в этой папке.
Миграция `0002_seed_legacy_news.sql` один раз переносит девять прежних
карточек событий в PostgreSQL. На старом сайте для них были только короткие
описания, поэтому поле полного текста пока повторяет описание; его можно
дополнить через `PATCH /api/news/:id`.

### Публичное чтение (без токена)

```bash
curl "http://localhost:4000/api/news?page=1&limit=20"
curl "http://localhost:4000/api/news?category=Медицина"
curl "http://localhost:4000/api/news/microsoft-agent-365-digital-workforce"
```

### Создание, изменение, удаление (нужен `NEWS_API_TOKEN`)

```bash
curl -X POST http://localhost:4000/api/news \
  -H "Authorization: Bearer $NEWS_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Microsoft превращает управление AI агентами в отдельный слой",
    "excerpt": "Microsoft развивает Agent 365 как единый контур управления агентами.",
    "content": "Полный текст новости...",
    "category": "Новости ИИ",
    "status": "published"
  }'

curl -X PATCH http://localhost:4000/api/news/<id> \
  -H "Authorization: Bearer $NEWS_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Новый заголовок"}'

curl -X DELETE http://localhost:4000/api/news/<id> \
  -H "Authorization: Bearer $NEWS_API_TOKEN"

curl "http://localhost:4000/api/admin/news?status=draft" \
  -H "Authorization: Bearer $NEWS_API_TOKEN"
```

`slug` можно не передавать — он сгенерируется из `title` (транслитерация
кириллицы), при конфликте получит числовой суффикс (`-2`, `-3`, ...).
`DELETE` не удаляет запись физически, а переводит `status` в `archived`.
Токен никогда не передаётся во frontend JavaScript — только серверным
системам (Telegram-бот, автоматизация).

### Backup и восстановление

```bash
# backup (запускать на хосте, где работает docker compose)
docker compose exec postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql

# восстановление в чистую базу
cat backup.sql | docker compose exec -T postgres psql -U "$POSTGRES_USER" "$POSTGRES_DB"
```

Для `infra/docker-compose.vps.yml` контейнер называется `fii_postgres`:
`docker exec fii_postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql`.

## Проверка и согласие

`node --test` запускает все тесты: `contact.test.js` (три типа заявок, согласие, валидация, honeypot, отказ почтового сервера, ограничение частоты) и `news.test.js` (создание, токен, публичный список без черновиков, получение по slug, изменение, архивация, валидация, дублирующий slug, ошибка подключения к БД). Ни письма, ни запросы к реальному PostgreSQL при этом не выполняются — `news.test.js` подставляет вместо репозитория БД лёгкую in-memory реализацию через `createApp({ newsRepo })`.

Каждый запрос должен содержать `consent: true` и `consentVersion: "2026-09-11"`. Текст редакции расположен на `/consent`; дата получения и редакция записываются в письмо.

В обычном Next.js режиме `/api/contact` проксируется на `http://127.0.0.1:4000`. Для отдельного сервера задайте `CONTACT_API_ORIGIN` при сборке Next.js. Для статического экспорта задайте публичный `NEXT_PUBLIC_API_URL` и разрешите домен сайта в `ALLOWED_ORIGINS`.

Без настроенных SMTP_USER и SMTP_PASSWORD API возвращает ошибку доставки, а не фиктивный успех. Для размещения сервера и почтового хранилища используйте инфраструктуру, соответствующую требованиям оператора к обработке персональных данных.
