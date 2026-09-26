import mongoose from 'mongoose';
import dns from 'dns';

// Ensure SRV records resolve cleanly on Windows environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Fall back to default system resolver if setting custom servers fails
}

/**
 * Sanitizes connection strings and error messages to ensure database
 * passwords and sensitive credentials are never exposed in terminal logs.
 * @param {string} text
 * @returns {string}
 */
export const sanitizeCredentials = (text) => {
  if (!text || typeof text !== 'string') return text;
  // Replaces :password@ in connection URIs with :*****@
  return text.replace(/(:\/\/[^:]+:)[^@]+(@)/g, '$1*****$2');
};

let lastConnectionError = null;

/**
 * Returns current database connection status
 */
export const getDbStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    isConnected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
    error: lastConnectionError ? sanitizeCredentials(lastConnectionError) : null
  };
};

/**
 * Connects to MongoDB Atlas using Mongoose ODM
 */
const connectDB = async () => {
  const connectionUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!connectionUri || connectionUri.trim() === '') {
    lastConnectionError = 'MONGODB_URI is not defined in server/.env';
    console.warn('\n[MongoDB] WARNING: MONGODB_URI is not defined in server/.env');
    console.warn('[MongoDB] Please paste your MongoDB Atlas connection string into server/.env to enable database connectivity.\n');
    return null;
  }

  // Pre-flight check for unreplaced placeholder
  if (connectionUri.includes('<db_password>') || connectionUri.includes('<password>')) {
    lastConnectionError = 'Placeholder "<db_password>" found in MONGODB_URI. Replace with actual MongoDB Atlas user password in server/.env.';
    console.warn('\n[MongoDB] WARNING: The placeholder "<db_password>" is still present in server/.env!');
    console.warn('[MongoDB] Please replace "<db_password>" with your actual MongoDB user password in server/.env.\n');
  }

  try {
    // Configure event listeners once
    if (mongoose.connection.listenerCount('disconnected') === 0) {
      mongoose.connection.on('disconnected', () => {
        console.warn('[MongoDB] Database connection lost. Attempting reconnection...');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('[MongoDB] Database reconnected successfully.');
      });
    }

    const conn = await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 8000
    });

    lastConnectionError = null;
    console.log('\n==================================================');
    console.log('[MongoDB] Connected successfully to MongoDB Atlas!');
    console.log(`[MongoDB] Cluster Host: ${conn.connection.host}`);
    console.log(`[MongoDB] Database Name: ${conn.connection.name}`);
    console.log('==================================================\n');

    return conn;
  } catch (error) {
    const safeError = sanitizeCredentials(error.message);
    lastConnectionError = safeError;
    console.error('\n==================================================');
    console.error('[MongoDB] Connection to MongoDB Atlas failed:');
    console.error(`[MongoDB] Error: ${safeError}`);

    if (connectionUri.includes('<db_password>') || connectionUri.includes('<password>')) {
      console.error('[MongoDB] ACTION REQUIRED: The placeholder "<db_password>" was found in server/.env.');
      console.error('[MongoDB] Please replace "<db_password>" with your actual MongoDB Atlas database password.');
    }

    if (safeError.includes('alert number 80') || safeError.includes('tlsv1 alert') || safeError.includes('SSL routines')) {
      console.error('[MongoDB] ACTION REQUIRED: Atlas TLS Handshake Rejected (SSL alert 80).');
      console.error('[MongoDB] Your current IP address is not whitelisted in MongoDB Atlas Network Access.');
      console.error('[MongoDB] 1. Go to https://cloud.mongodb.com -> Network Access');
      console.error('[MongoDB] 2. Click "Add IP Address" -> Select "Add Current IP Address" (or 0.0.0.0/0 for development)');
      console.error('[MongoDB] 3. Save and wait 1-2 minutes for changes to deploy.');
    } else if (safeError.includes('bad auth') || safeError.includes('AuthenticationFailed')) {
      console.error('[MongoDB] ACTION REQUIRED: Authentication failed. Verify your Atlas database username & password in server/.env.');
    } else if (safeError.includes('querySrv') || safeError.includes('ENOTFOUND')) {
      console.error('[MongoDB] ACTION REQUIRED: DNS lookup failed. Verify your cluster hostname in server/.env.');
    } else if (safeError.includes('whitelist') || safeError.includes('Could not connect') || safeError.includes('ETIMEDOUT') || safeError.includes('timed out')) {
      console.error('[MongoDB] ACTION REQUIRED: Connection timed out. Make sure your IP is whitelisted in MongoDB Atlas under Network Access.');
    }
    console.error('==================================================\n');
    return null;
  }
};

export default connectDB;
