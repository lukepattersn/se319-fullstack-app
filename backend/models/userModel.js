// User model for authentication
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

/**
 * Find a user by their username
 * @param {string} username - The username to search for
 * @returns {Promise<Object|null>} User object or null if not found
 */
exports.findByUsername = async (username) => {
  try {
    const db = getDB();
    return await db.collection('users').findOne({ username });
  } catch (error) {
    console.error('Error finding user by username:', error);
    throw error;
  }
};

/**
 * Find a user by their email
 * @param {string} email - The email to search for
 * @returns {Promise<Object|null>} User object or null if not found
 */
exports.findByEmail = async (email) => {
  try {
    const db = getDB();
    return await db.collection('users').findOne({ email });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

/**
 * Find a user by their ID
 * @param {string} id - The user ID to search for
 * @returns {Promise<Object|null>} User object or null if not found
 */
exports.findById = async (id) => {
  try {
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

/**
 * Create a new user
 * @param {Object} userData - The user data to create
 * @returns {Promise<Object>} The created user
 */
exports.createUser = async (userData) => {
  try {
    const db = getDB();
    const result = await db.collection('users').insertOne({
      ...userData,
      role: userData.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { ...userData, _id: result.insertedId };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};