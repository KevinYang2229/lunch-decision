import db from '../config/db.js';

export const upsertVote = async (voteData) => {
  const { userId, menuId } = voteData;
  const today = new Date();
  
  try {
    // 檢查今天是否已經投過票
    const existingResult = await db.query(
      'SELECT id FROM votes WHERE user_id = $1 AND date::date = $2::date',
      [userId, today],
    );

    if (existingResult.rows.length > 0) {
      // 如果已投過，則更新
      const updateResult = await db.query(
        'UPDATE votes SET menu_id = $1 WHERE id = $2 RETURNING *',
        [menuId, existingResult.rows[0].id],
      );
      return updateResult.rows[0];
    } else {
      // 否則新增
      const insertResult = await db.query(
        'INSERT INTO votes(user_id, menu_id, date) VALUES($1, $2, $3) RETURNING *',
        [userId, menuId, today],
      );
      return insertResult.rows[0];
    }
  } catch (error) {
    console.error('🔴 Database Error in upsertVote:', error);
    throw error;
  }
};

export const getVoteByUserAndDay = async (userId, date) => {
  try {
    const result = await db.query(
      'SELECT * FROM votes WHERE user_id = $1 AND date::date = $2::date',
      [userId, date],
    );
    return result.rows[0];
  } catch (error) {
    console.error('🔴 Database Error in getVoteByUserAndDay:', error);
    throw error;
  }
};

export const getVotesByDay = async (date) => {
  try {
    const result = await db.query('SELECT * FROM votes WHERE date::date = $1', [
      date,
    ]);
    return result.rows;
  } catch (error) {
    console.error('🔴 Database Error in getVotesByDay:', error);
    throw error;
  }
};
