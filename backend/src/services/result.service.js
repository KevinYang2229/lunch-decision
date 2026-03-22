import { getVotesByDay } from '../repositories/vote.repository.js';
import {
  createResult,
  getResultByDate,
} from '../repositories/result.repository.js';
import { addNotification } from '../config/queue.js';

export const calculateTodayResult = async () => {
  const today = new Date().toISOString().split('T')[0];

  // 1️⃣ 取得今天所有投票
  const votes = await getVotesByDay(today);
  if (!votes.length) throw new Error('今天沒有投票');

  // 2️⃣ 統計票數
  const tally = {};
  votes.forEach((v) => {
    tally[v.menu_id] = (tally[v.menu_id] || 0) + 1;
  });

  // 3️⃣ 找最多票數
  const maxVotes = Math.max(...Object.values(tally));
  const topMenus = Object.keys(tally).filter((id) => tally[id] === maxVotes);

  // 4️⃣ 若平票，隨機挑一個
  const chosenMenuId = parseInt(
    topMenus[Math.floor(Math.random() * topMenus.length)],
  );

  // 5️⃣ 寫入結果表
  const result = await createResult({ date: today, menu_id: chosenMenuId });

  // 6️⃣ 丟 queue 發通知
  try {
    await addNotification({
      type: 'daily_result',
      data: { menuId: chosenMenuId, date: today },
    });
  } catch (queueError) {
    console.warn('⚠️ Could not add daily result notification to queue:', queueError.message);
  }

  return result;
};

export const fetchTodayResult = async () => {
  const today = new Date().toISOString().split('T')[0];
  return getResultByDate(today);
};
