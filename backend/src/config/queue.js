// backend/src/config/queue.js
import Queue from 'bull';

// 建立一個通知 queue (需要 Redis 啟動)
export const notificationQueue = new Queue('notification', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});
// 注意：如果本地沒有啟動 Redis，Bull 將無法成功加入任務。
// 已在 service 層級加入 try-catch 處理。

/**
 * 封裝加入任務的 function
 * @param {Object} jobData - 任務資料，例如 { type: 'vote_submitted', data: {...} }
 */
export const addNotification = async (jobData) => {
  // 建立一個 timeout promise，如果超過 1 秒沒連上 Redis 就放棄
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Queue operation timed out')), 1000);
  });

  try {
    await Promise.race([
      notificationQueue.add(jobData, {
        attempts: 3,
        backoff: 5000,
        removeOnComplete: true,
        removeOnFail: false,
      }),
      timeoutPromise,
    ]);
  } catch (err) {
    // 拋出錯誤讓呼叫端處理 (在 service 層級已有 try-catch)
    throw err;
  }
};

// 匯出 Queue 本身方便 worker 監聽
export default notificationQueue;
