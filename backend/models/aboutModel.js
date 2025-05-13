// backend/models/aboutModel.js
const { getDB } = require('../config/database');

/**
 * Get about page data from the database
 * @returns {Promise<Object|null>} About page data or null if not found
 */
exports.getAboutData = async () => {
  try {
    const db = getDB();
    return await db.collection('about').findOne({});
  } catch (error) {
    console.error('Error finding about data:', error);
    throw error;
  }
};

/**
 * Update about page data
 * @param {Object} aboutData - The about page data
 * @returns {Promise<Object>} The updated about data
 */
exports.updateAboutData = async (aboutData) => {
  try {
    const db = getDB();
    
    // Check if about data already exists
    const existingData = await db.collection('about').findOne({});
    
    if (existingData) {
      // Update existing document
      await db.collection('about').updateOne(
        { _id: existingData._id },
        { $set: { ...aboutData, updatedAt: new Date() } }
      );
      return { ...aboutData, _id: existingData._id };
    } else {
      // Create new document
      const result = await db.collection('about').insertOne({
        ...aboutData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { ...aboutData, _id: result.insertedId };
    }
  } catch (error) {
    console.error('Error updating about data:', error);
    throw error;
  }
};