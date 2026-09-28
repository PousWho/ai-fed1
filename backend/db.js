import pg from 'pg';

const { Pool } = pg;

// Пул создаётся лениво — само подключение открывается при первом запросе,
// поэтому импорт этого модуля безопасен даже без DATABASE_URL (юнит-тесты).
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function ping() {
  await pool.query('SELECT 1');
}
