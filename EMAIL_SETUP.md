# Настройка отправки email

Для работы форм обратной связи необходимо настроить отправку email через SMTP.

## Вариант 1: Gmail

1. Включите двухфакторную аутентификацию в вашем Google аккаунте
2. Создайте App Password:
   - Перейдите на https://myaccount.google.com/apppasswords
   - Выберите "Почта" и "Другое устройство"
   - Скопируйте сгенерированный пароль

3. Настройте `.env` файл:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=info@fii-federation.ru
```

## Вариант 2: Яндекс.Почта

```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your-email@yandex.ru
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@yandex.ru
CONTACT_EMAIL=info@fii-federation.ru
```

## Вариант 3: Mail.ru

```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_USER=your-email@mail.ru
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@mail.ru
CONTACT_EMAIL=info@fii-federation.ru
```

## Вариант 4: Другой SMTP сервер

Настройте переменные окружения согласно параметрам вашего SMTP сервера:
- `SMTP_HOST` - адрес SMTP сервера
- `SMTP_PORT` - порт (обычно 587 для TLS или 465 для SSL)
- `SMTP_USER` - имя пользователя
- `SMTP_PASSWORD` - пароль
- `SMTP_FROM` - email отправителя
- `CONTACT_EMAIL` - email для получения заявок

## Тестирование

После настройки проверьте отправку формы на странице `/contacts`. Если настройки верны, вы получите email с данными заявки.

## Безопасность

⚠️ **Важно**: Никогда не коммитьте файл `.env` в репозиторий! Он уже добавлен в `.gitignore`.

