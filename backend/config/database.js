const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;
let client;

const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    // Get database instance
    db = client.db();
    
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Export both the connection function and the db instance
module.exports = {
  connectDB,
  getDB: () => {
    if (!db) {
      throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
  },
  closeConnection: async () => {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
};