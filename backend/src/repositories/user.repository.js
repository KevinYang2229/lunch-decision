import db from '../config/db.js';

/**
 * 透過姓名查找員工
 * @param {string} name 員工姓名
 * @returns {Promise<Object|null>} 員工資料
 */
export const findUserByName = async (name) => {
  try {
    const result = await db.query(
      'SELECT id, name FROM employees WHERE name ILIKE $1',
      [name]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('🔴 Database Error in findUserByName:', error);
    throw error;
  }
};
