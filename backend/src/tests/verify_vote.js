import { submitVote } from './src/services/vote.service.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    console.log('Testing vote with "Kevin"...');
    await submitVote({ userId: 'Kevin', menuId: 1 });
    console.log('✅ Vote with "Kevin" successful!');

    try {
      console.log('Testing vote with non-existent user "NoSuchUser"...');
      await submitVote({ userId: 'NoSuchUser', menuId: 1 });
    } catch (err) {
      console.log('✅ Expected error for non-existent user:', err.message);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

test();
