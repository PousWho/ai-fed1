import { Router } from 'express';
import { z } from 'zod';
import { generateUniqueSlug } from './slug.js';

const slugSchema = z.string().trim().toLowerCase().min(1).max(200)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug должен состоять из латинских букв, цифр и дефисов');

const urlField = z.string().trim().url().max(2000).nullable().optional();
const shortText = (max) => z.string().trim().max(max).nullable().optional();

const baseNewsFields = {
  slug: slugSchema.optional(),
  title: z.string().trim().min(3).max(300),
  excerpt: z.string().trim().min(3).max(1000),
  content: z.string().trim().min(10).max(100000),
  category: z.string().trim().min(2).max(100),
  image_url: urlField,
  source_name: shortText(200),
  source_url: urlField,
  telegram_url: urlField,
  author: z.string().trim().min(1).max(200).default('Федерация искусственного интеллекта'),
  seo_title: shortText(300),
  seo_description: shortText(500),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  published_at: z.coerce.date().nullable().optional(),
};

const createNewsSchema = z.object(baseNewsFields);
const updateNewsSchema = z.object(baseNewsFields).partial();

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().trim().min(1).max(100).optional(),
});

const adminListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

const uuidSchema = z.string().uuid();

function logNewsOperation(operation, news) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    operation,
    id: news.id,
    slug: news.slug,
    status: news.status,
  }));
}

function stripUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

export function createNewsRouter({ repo, requireAuth, readLimiter, writeLimiter }) {
  const router = Router();

  router.get('/api/news', readLimiter, async (req, res) => {
    try {
      const query = listQuerySchema.parse(req.query);
      const { items, total } = await repo.listPublished(query);
      res.json({ items, page: query.page, limit: query.limit, total });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Неверные параметры запроса', details: error.issues });
      }
      console.error('Error listing news:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  router.get('/api/news/:slug', readLimiter, async (req, res) => {
    try {
      const news = await repo.getPublishedBySlug(req.params.slug);
      if (!news) return res.status(404).json({ error: 'Новость не найдена' });
      res.json(news);
    } catch (error) {
      console.error('Error fetching news by slug:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  router.get('/api/admin/news', readLimiter, requireAuth, async (req, res) => {
    try {
      const query = adminListQuerySchema.parse(req.query);
      const { items, total } = await repo.listAdmin(query);
      res.json({ items, page: query.page, limit: query.limit, total });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Неверные параметры запроса', details: error.issues });
      }
      console.error('Error listing admin news:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  router.post('/api/news', writeLimiter, requireAuth, async (req, res) => {
    try {
      const data = createNewsSchema.parse(req.body ?? {});

      if (data.slug) {
        if (await repo.slugExists(data.slug)) {
          return res.status(409).json({ error: 'Такой slug уже используется' });
        }
      } else {
        data.slug = await generateUniqueSlug(data.title, (candidate) => repo.slugExists(candidate));
      }

      if (data.status === 'published' && !data.published_at) {
        data.published_at = new Date();
      }

      const created = await repo.createNews(stripUndefined(data));
      logNewsOperation('create', created);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Неверные данные новости', details: error.issues });
      }
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Такой slug уже используется' });
      }
      console.error('Error creating news:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  router.patch('/api/news/:id', writeLimiter, requireAuth, async (req, res) => {
    try {
      if (!uuidSchema.safeParse(req.params.id).success) {
        return res.status(404).json({ error: 'Новость не найдена' });
      }

      const patch = updateNewsSchema.parse(req.body ?? {});
      if (Object.keys(patch).length === 0) {
        return res.status(400).json({ error: 'Нет полей для обновления' });
      }

      const existing = await repo.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Новость не найдена' });

      if (patch.slug && patch.slug !== existing.slug) {
        if (await repo.slugExists(patch.slug, req.params.id)) {
          return res.status(409).json({ error: 'Такой slug уже используется' });
        }
      }

      if (patch.status === 'published' && !patch.published_at && !existing.published_at) {
        patch.published_at = new Date();
      }

      const updated = await repo.updateNews(req.params.id, stripUndefined(patch));
      logNewsOperation('update', updated);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Неверные данные новости', details: error.issues });
      }
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Такой slug уже используется' });
      }
      console.error('Error updating news:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  router.delete('/api/news/:id', writeLimiter, requireAuth, async (req, res) => {
    try {
      if (!uuidSchema.safeParse(req.params.id).success) {
        return res.status(404).json({ error: 'Новость не найдена' });
      }

      const existing = await repo.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Новость не найдена' });

      const archived = await repo.archiveNews(req.params.id);
      logNewsOperation('archive', archived);
      res.json(archived);
    } catch (error) {
      console.error('Error archiving news:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  return router;
}
