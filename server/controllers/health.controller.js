import { getDbStatus } from '../config/db.js';

/**
 * Health check controller
 * @route GET /api/health
 */
export const getHealth = (req, res) => {
  const dbStatus = getDbStatus();

  res.status(200).json({
    success: true,
    message: 'Smart Expense Manager API is running',
    timestamp: new Date().toISOString(),
    database: {
      driver: 'Mongoose / MongoDB Atlas',
      connected: dbStatus.isConnected,
      status: dbStatus.state,
      host: dbStatus.host,
      name: dbStatus.name,
      error: dbStatus.error || null
    }
  });
};
