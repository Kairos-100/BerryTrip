// Database configuration - switch between in-memory and MongoDB
import { db as inMemoryDb } from './database'
import { db as mongoDb } from './database-mongodb'

// Check if MongoDB URI is available
const useMongoDB = !!process.env.MONGODB_URI || !!process.env.DATABASE_URL

// Export the appropriate database based on environment
export const db = useMongoDB ? mongoDb : inMemoryDb

// Export database type for type checking
export type DatabaseType = typeof db

// Log which database is being used
if (process.env.NODE_ENV === 'development') {
  console.log(`🗄️  Using ${useMongoDB ? 'MongoDB' : 'In-Memory'} database`)
}

// Helper function to check if MongoDB is connected
export const isMongoDBConnected = () => useMongoDB

// Helper function to get database info
export const getDatabaseInfo = () => ({
  type: useMongoDB ? 'MongoDB' : 'In-Memory',
  uri: useMongoDB ? (process.env.MONGODB_URI || process.env.DATABASE_URL) : 'In-Memory',
  connected: useMongoDB
})
