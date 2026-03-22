import {
  upsertVote,
  getVoteByUserAndDay,
} from '../repositories/vote.repository.js';
import { addNotification } from '../config/queue.js';
import { getUserIdByName } from './user.service.js';

const isVotingOpen = () => {
  // 這裡可以實作投票時間限制，例如只在週一至週五 10:00 - 11:30 開放
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // 範例：週一至週五 09:00 - 12:00
  if (day === 0 || day === 6) return false;
  if (hour < 9 || hour >= 12) return false;

  return true;
};

export const submitVote = async (voteData) => {
  const { userId: username, menuId } = voteData;

  // 1. 驗證投票時間
  if (!isVotingOpen()) throw new Error('Voting is closed');

  // 2. 轉換姓名為 UserID
  const userId = await getUserIdByName(username);

  // 3. 寫入或更新 DB (支援隨時更改選擇)
  await upsertVote({ userId, menuId });

  // 4. 丟 queue 發通知
  try {
    await addNotification({
      type: 'vote_submitted',
      data: { userId, username, menuId },
    });
  } catch (queueError) {
    console.warn('⚠️ Could not add notification to queue:', queueError.message);
    // 即使通知失敗，投票也已經成功寫入 DB，所以不拋錯
  }
};
