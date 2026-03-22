// backend/src/repositories/result.repository.js
import db from '../config/db.js';

export const createResult = async ({ date, menu_id }) => {
  const query = `
    INSERT INTO results(date, menu_id) 
    VALUES($1, $2) 
    ON CONFLICT (date) DO UPDATE SET menu_id = EXCLUDED.menu_id 
    RETURNING *
  `;
  const result = await db.query(query, [date, menu_id]);
  return result.rows[0];
};

export const getResultByDate = async (date) => {
  const query = `
    SELECT r.id, r.date, m.name AS menu_name, m.category
    FROM results r
    JOIN menu m ON r.menu_id = m.id
    WHERE r.date = $1
  `;
  const result = await db.query(query, [date]);
  return result.rows[0] || null;
};
