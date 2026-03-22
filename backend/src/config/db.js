import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 加入全域錯誤監聽
pool.on('error', (err) => {
  console.error('🔴 Unexpected error on idle database client', err);
});

export default pool;
