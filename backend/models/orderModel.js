const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

/**
 * Find all orders for a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of order objects
 */
exports.findByUser = async (userId) => {
  try {
    const db = getDB();
    return await db.collection('orders')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error('Error finding orders by user:', error);
    throw error;
  }
};

/**
 * Find an order by its ID
 * @param {string} orderId - The order ID
 * @returns {Promise<Object|null>} Order object or null if not found
 */
exports.findById = async (orderId) => {
  try {
    const db = getDB();
    return await db.collection('orders').findOne({ _id: new ObjectId(orderId) });
  } catch (error) {
    console.error('Error finding order by ID:', error);
    throw error;
  }
};

/**
 * Create a new order
 * @param {Object} orderData - The order data
 * @returns {Promise<Object>} The created order
 */
exports.createOrder = async (orderData) => {
  try {
    const db = getDB();
    const result = await db.collection('orders').insertOne({
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: orderData.status || 'completed' // Default status is 'completed' since we're simulating payment
    });
    return { ...orderData, _id: result.insertedId };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Update an order
 * @param {string} orderId - The order ID
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object>} The updated order
 */
exports.updateOrder = async (orderId, updateData) => {
  try {
    const db = getDB();
    const result = await db.collection('orders').findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );
    return result.value;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};