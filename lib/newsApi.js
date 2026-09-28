const origin = process.env.NEWS_API_ORIGIN || process.env.CONTACT_API_ORIGIN || 'http://127.0.0.1:4000';

async function request(path) {
  const response = await fetch(`${origin}${path}`, { cache: 'no-store' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`News API returned ${response.status}`);
  return response.json();
}

export function getNewsList({ page = 1, category = '' } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: '20' });
  if (category) params.set('category', category);
  return request(`/api/news?${params}`);
}

export function getNewsBySlug(slug) {
  return request(`/api/news/${encodeURIComponent(slug)}`);
}
