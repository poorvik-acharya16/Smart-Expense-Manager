import dotenv from 'dotenv';
dotenv.config();
import connectDB, { getDbStatus } from './config/db.js';
import mongoose from 'mongoose';

async function test() {
  console.log('[Test] Initiating connection test...');
  await connectDB();
  const status = getDbStatus();
  console.log('[Test] Resulting DB State:', status.state);
  console.log('[Test] Is Connected:', status.isConnected);
  await mongoose.disconnect();
  process.exit(0);
}

test();
