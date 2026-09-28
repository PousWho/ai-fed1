import { pool, ping } from './db.js';

const UPDATABLE_FIELDS = [
  'slug', 'title', 'excerpt', 'content', 'category', 'image_url',
  'source_name', 'source_url', 'telegram_url', 'author',
  'seo_title', 'seo_description', 'status', 'published_at',
];

export function createNewsRepository() {
  return {
    ping,

    async slugExists(slug, excludeId) {
      const { rows } = excludeId
        ? await pool.query('SELECT 1 FROM news WHERE slug = $1 AND id <> $2', [slug, excludeId])
        : await pool.query('SELECT 1 FROM news WHERE slug = $1', [slug]);
      return rows.length > 0;
    },

    async createNews(data) {
      const columns = Object.keys(data);
      const placeholders = columns.map((_, i) => `$${i + 1}`);
      const values = columns.map((c) => data[c]);
      const { rows } = await pool.query(
        `INSERT INTO news (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
        values
      );
      return rows[0];
    },

    async getById(id) {
      const { rows } = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
      return rows[0] ?? null;
    },

    async getPublishedBySlug(slug) {
      const { rows } = await pool.query(
        "SELECT * FROM news WHERE slug = $1 AND status = 'published'",
        [slug]
      );
      return rows[0] ?? null;
    },

    async listPublished({ page, limit, category }) {
      const conditions = ["status = 'published'"];
      const params = [];
      if (category) {
        params.push(category);
        conditions.push(`category = $${params.length}`);
      }
      const where = `WHERE ${conditions.join(' AND ')}`;

      const countResult = await pool.query(`SELECT COUNT(*) FROM news ${where}`, params);
      const total = Number.parseInt(countResult.rows[0].count, 10);

      const listParams = [...params, limit, (page - 1) * limit];
      const { rows } = await pool.query(
        `SELECT * FROM news ${where} ORDER BY published_at DESC NULLS LAST LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
        listParams
      );
      return { items: rows, total };
    },

    async listAdmin({ page, limit, status }) {
      const conditions = [];
      const params = [];
      if (status) {
        params.push(status);
        conditions.push(`status = $${params.length}`);
      }
      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

      const countResult = await pool.query(`SELECT COUNT(*) FROM news ${where}`, params);
      const total = Number.parseInt(countResult.rows[0].count, 10);

      const listParams = [...params, limit, (page - 1) * limit];
      const { rows } = await pool.query(
        `SELECT * FROM news ${where} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
        listParams
      );
      return { items: rows, total };
    },

    async updateNews(id, patch) {
      const fields = Object.keys(patch).filter((key) => UPDATABLE_FIELDS.includes(key));
      if (fields.length === 0) {
        return this.getById(id);
      }
      const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
      const values = fields.map((field) => patch[field]);
      const { rows } = await pool.query(
        `UPDATE news SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
        [...values, id]
      );
      return rows[0] ?? null;
    },

    async archiveNews(id) {
      const { rows } = await pool.query(
        "UPDATE news SET status = 'archived' WHERE id = $1 RETURNING *",
        [id]
      );
      return rows[0] ?? null;
    },
  };
}
