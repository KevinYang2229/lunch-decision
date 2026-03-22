// backend/src/repositories/menu.repository.js
import db from '../config/db.js';

export const createMenu = async ({ name, category, date }) => {
  const query =
    'INSERT INTO menu(name, category, date) VALUES($1, $2, $3) RETURNING *';
  const result = await db.query(query, [name, category, date]);
  return result.rows[0];
};

export const getMenuByDate = async (date) => {
  try {
    const query = 'SELECT * FROM menu WHERE date=$1';
    const result = await db.query(query, [date]);
    return result.rows;
  } catch (error) {
    console.error('🔴 Database Error in getMenuByDate:', error);
    throw error;
  }
};
