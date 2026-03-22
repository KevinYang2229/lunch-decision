// backend/src/workers/notification.worker.js
import { notificationQueue } from '../config/queue.js';

notificationQueue.process(async (job) => {
  const { type, data } = job.data;

  try {
    if (type === 'vote_submitted') {
      // 這裡可以放 Email / Slack 發送邏輯
      await sendEmail(data.userId, data.choice);
      await sendSlack(data.userId, data.choice);
    }

    if (type === 'daily_result') {
      // 發送今天最終決策通知
      await sendEmailToAll(data.menu);
      await sendSlackToAll(data.menu);
    }

    return Promise.resolve();
  } catch (err) {
    console.error('Notification failed:', err);
    throw err; // Bull 會自動重試
  }
});

// Worker 可以單獨啟動
// node backend/src/workers/notification.worker.js
