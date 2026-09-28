import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createApp } from './server.js';

const TOKEN = 'test-secret-token';

function createFakeRepo() {
  const items = [];
  return {
    async ping() {},
    async slugExists(slug, excludeId) {
      return items.some((n) => n.slug === slug && n.id !== excludeId);
    },
    async createNews(data) {
      const news = {
        id: randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...data,
      };
      items.push(news);
      return news;
    },
    async getById(id) {
      return items.find((n) => n.id === id) ?? null;
    },
    async getPublishedBySlug(slug) {
      return items.find((n) => n.slug === slug && n.status === 'published') ?? null;
    },
    async listPublished({ page, limit, category }) {
      let filtered = items.filter((n) => n.status === 'published');
      if (category) filtered = filtered.filter((n) => n.category === category);
      filtered = [...filtered].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      const total = filtered.length;
      const start = (page - 1) * limit;
      return { items: filtered.slice(start, start + limit), total };
    },
    async listAdmin({ page, limit, status }) {
      let filtered = status ? items.filter((n) => n.status === status) : items;
      filtered = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const total = filtered.length;
      const start = (page - 1) * limit;
      return { items: filtered.slice(start, start + limit), total };
    },
    async updateNews(id, patch) {
      const news = items.find((n) => n.id === id);
      if (!news) return null;
      Object.assign(news, patch, { updated_at: new Date().toISOString() });
      return news;
    },
    async archiveNews(id) {
      const news = items.find((n) => n.id === id);
      if (!news) return null;
      news.status = 'archived';
      news.updated_at = new Date().toISOString();
      return news;
    },
  };
}

function createFailingRepo() {
  const fail = async () => { throw new Error('Ошибка подключения к базе данных'); };
  return { ping: fail, slugExists: fail, createNews: fail, getById: fail, getPublishedBySlug: fail, listPublished: fail, listAdmin: fail, updateNews: fail, archiveNews: fail };
}

async function withApi(newsRepo, run) {
  const server = createApp({ newsRepo, newsToken: TOKEN }).listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const api = {
    get: (path) => fetch(`${base}${path}`),
    post: (path, body, token = TOKEN) => fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    }),
    patch: (path, body, token = TOKEN) => fetch(`${base}${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    }),
    del: (path, token = TOKEN) => fetch(`${base}${path}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  };
  try {
    await run(api);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

const validNews = {
  title: 'Microsoft превращает управление AI агентами в отдельный слой',
  excerpt: 'Microsoft развивает Agent 365 как единый контур управления агентами.',
  content: 'Полный текст новости про AI агентов и корпоративное управление ими.',
  category: 'Новости ИИ',
};

test('creates a news item with a valid token', async () => {
  await withApi(createFakeRepo(), async (api) => {
    const response = await api.post('/api/news', { ...validNews, status: 'published' });
    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.title, validNews.title);
    assert.ok(body.slug);
    assert.ok(body.published_at);
  });
});

test('rejects creation with an invalid token', async () => {
  await withApi(createFakeRepo(), async (api) => {
    const response = await api.post('/api/news', validNews, 'wrong-token');
    assert.equal(response.status, 401);
  });
});

test('rejects creation with a missing token', async () => {
  await withApi(createFakeRepo(), async (api) => {
    const response = await api.post('/api/news', validNews, null);
    assert.equal(response.status, 401);
  });
});

test('public list returns only published news, newest first', async () => {
  await withApi(createFakeRepo(), async (api) => {
    await api.post('/api/news', { ...validNews, slug: 'draft-item', status: 'draft' });
    await api.post('/api/news', { ...validNews, slug: 'published-item', status: 'published' });

    const response = await api.get('/api/news');
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.total, 1);
    assert.equal(body.items.length, 1);
    assert.equal(body.items[0].slug, 'published-item');
  });
});

test('draft is not accessible via public slug lookup', async () => {
  await withApi(createFakeRepo(), async (api) => {
    await api.post('/api/news', { ...validNews, slug: 'a-draft', status: 'draft' });
    const response = await api.get('/api/news/a-draft');
    assert.equal(response.status, 404);
  });
});

test('fetches a single published news item by slug, 404 when missing', async () => {
  await withApi(createFakeRepo(), async (api) => {
    await api.post('/api/news', { ...validNews, slug: 'found-item', status: 'published' });

    const found = await api.get('/api/news/found-item');
    assert.equal(found.status, 200);
    assert.equal((await found.json()).slug, 'found-item');

    const missing = await api.get('/api/news/does-not-exist');
    assert.equal(missing.status, 404);
  });
});

test('updates a news item', async () => {
  await withApi(createFakeRepo(), async (api) => {
    const created = await (await api.post('/api/news', validNews)).json();
    const response = await api.patch(`/api/news/${created.id}`, { title: 'Обновлённый заголовок' });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).title, 'Обновлённый заголовок');
  });
});

test('archives a news item instead of deleting it', async () => {
  await withApi(createFakeRepo(), async (api) => {
    const created = await (await api.post('/api/news', { ...validNews, status: 'published' })).json();
    const response = await api.del(`/api/news/${created.id}`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, 'archived');

    assert.equal((await api.get(`/api/news/${created.slug}`)).status, 404);
  });
});

test('rejects creation missing required fields', async () => {
  await withApi(createFakeRepo(), async (api) => {
    const response = await api.post('/api/news', { title: 'Только заголовок' });
    assert.equal(response.status, 400);
  });
});

test('rejects a duplicate slug', async () => {
  await withApi(createFakeRepo(), async (api) => {
    await api.post('/api/news', { ...validNews, slug: 'dup-slug' });
    const response = await api.post('/api/news', { ...validNews, slug: 'dup-slug' });
    assert.equal(response.status, 409);
  });
});

test('reports a database connection failure', async () => {
  await withApi(createFailingRepo(), async (api) => {
    const health = await api.get('/health');
    assert.equal(health.status, 503);
    assert.equal((await health.json()).database, 'error');

    const created = await api.post('/api/news', validNews);
    assert.equal(created.status, 500);
  });
});
