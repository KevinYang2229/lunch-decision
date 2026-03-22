import 'dotenv/config';
import db from '../config/db.js';
import { createVote } from '../repositories/vote.repository.js';

console.log('--- Database Error Log Test ---');

try {
  console.log('Attempting to insert into (potentially) non-existent table or with invalid data...');
  // 故意傳入不完整的資料或觸發錯誤
  await createVote({ userId: null, choice: 'Pizza' }); 
} catch (err) {
  console.log('✅ Caught error in test script (this is expected)');
}

process.exit(0);
