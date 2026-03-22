import cron from 'node-cron';
import { calculateTodayResult } from '../services/result.service.js';

/**
 * 啟動排程任務
 * 使用 node-cron (無需 Redis)
 */
export const startResultScheduler = () => {
  // 每分鐘執行一次 (供測試用)
  // const schedule = '* * * * *';
  // 若正式環境則使用 '30 11 * * 1-5' (週一至週五 11:30)
  const schedule = '30 11 * * 1-5';

  cron.schedule(schedule, async () => {
    console.log('🤖 Cron: Starting automatic result calculation...');
    try {
      const result = await calculateTodayResult();
      console.log(
        `✅ Cron: Result calculated successfully: ${result.menu_name}`,
      );
    } catch (err) {
      if (err.message === '今天沒有投票') {
        console.log('ℹ️ Cron: 今天尚無投票，跳過計算。');
      } else {
        console.error('❌ Cron: Result calculation failed:', err.message);
      }
    }
  });

  console.log(`📅 node-cron Scheduler started: ${schedule}`);
};
