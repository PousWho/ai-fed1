import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { sendContactEmail } from './email.js';

export function createApp({ sendEmail = sendContactEmail } = {}) {
const app = express();

// Опечатка в числовой переменной не должна молча отключать лимит или ломать порт
function parsePositiveInt(raw, fallback) {
  const n = Number.parseInt(raw ?? '', 10);
  if (!Number.isInteger(n) || n <= 0) {
    if (raw !== undefined && raw !== '') {
      console.warn(`Некорректное числовое значение "${raw}", использую ${fallback}`);
    }
    return fallback;
  }
  return n;
}


// За nginx/прокси реальный IP клиента приходит в X-Forwarded-For
if (process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

const defaultOrigins = [
  'https://xn--80ahcbqaa4d6aza4h.xn--p1ai',
  'https://www.xn--80ahcbqaa4d6aza4h.xn--p1ai',
  'https://pouswho.github.io',
  'http://localhost:3000',
  'http://localhost:3001',
];
const allowedOrigins = (process.env.ALLOWED_ORIGINS || defaultOrigins.join(','))
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Запросы без Origin (curl, серверные) пропускаем — CORS защищает только браузеры
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  })
);

app.use(express.json({ limit: '50kb' }));

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: parsePositiveInt(process.env.RATE_LIMIT, 5),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Слишком много запросов. Пожалуйста, попробуйте позже.' },
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).refine(value => !value || (/^[+\d\s()-]+$/.test(value) && value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 15)).optional(),
  organization: z.string().trim().max(300).optional(),
  message: z.string().trim().min(10).max(5000),
  type: z.enum(['partner', 'join', 'contact']),
  // Согласие на обработку ПДн обязательно и проверяется именно на сервере
  consent: z.literal(true),
  consentVersion: z.literal('2026-09-11'),
  // Honeypot: скрытое поле, люди его не видят и не заполняют
  website: z.string().max(200).optional(),
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const data = contactSchema.parse(req.body ?? {});

    // Бот заполнил honeypot — отвечаем «успехом», письмо не шлём
    if (data.website) {
      return res.json({ success: true });
    }

    await sendEmail(data);
    return res.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Неверные данные формы', details: error.issues });
    }

    console.error('Error sending contact form:', error);
    return res.status(500).json({
      error: 'Ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.',
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Ошибки express.json (битый JSON, слишком большое тело) должны отвечать JSON, а не HTML
// Четыре аргумента необходимы Express для распознавания error middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Неверный формат JSON' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Слишком большой запрос' });
  }
  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

return app;
}
