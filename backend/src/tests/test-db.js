import 'dotenv/config';
import pool from '../config/db.js';

async function testConnection() {
  console.log('Attempting to connect to the database...');
  console.log(
    'DATABASE_URL:',
    process.env.DATABASE_URL ? 'Defined' : 'Not Defined',
  );

  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!');

    const res = await client.query('SELECT NOW() as current_time');
    console.log('Database time:', res.rows[0].current_time);

    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
}

testConnection();
