// backend/src/test-queue.js
import { addNotification, notificationQueue } from '../config/queue.js';

const testJobData = {
  type: 'vote_submitted',
  data: {
    userId: 'test-user-123',
    choice: 'Pizza',
  },
};

console.log('--- Queue Test Started ---');

// 監聽任務完成事件
notificationQueue.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed successfully!`);
  process.exit(0);
});

// 監聽任務失敗事件
notificationQueue.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed with error: ${err.message}`);
  process.exit(1);
});

// 監聽錯誤
notificationQueue.on('error', (err) => {
  console.error(`❌ Queue Error: ${err.message}`);
  process.exit(1);
});

try {
  console.log('Adding test job to queue...');
  await addNotification(testJobData);
  console.log('Test job added. Waiting for worker to process...');

  // 設定超時
  setTimeout(() => {
    console.error('❌ Timeout: Job was not processed within 10 seconds.');
    process.exit(1);
  }, 10000);
} catch (error) {
  console.error(`❌ Error adding job: ${error.message}`);
  process.exit(1);
}
