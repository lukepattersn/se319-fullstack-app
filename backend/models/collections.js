const { getDB } = require('../config/database');

const initializeCollections = async () => {
  try {
    const db = getDB();
    
    // Create indexes for better performance
    await db.collection('menuitems').createIndex({ product_id: 1 }, { unique: true });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    
    console.log('Collections and indexes initialized');
  } catch (error) {
    console.error('Error initializing collections:', error);
  }
};

module.exports = { initializeCollections };