const orderModel = require('../../models/orderModel');
const userModel = require('../../models/userModel');
const { getDB } = require('../../config/database');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const db = getDB();
    
    // Get counts from collections
    const userCount = await db.collection('users').countDocuments();
    const orderCount = await db.collection('orders').countDocuments();
    const menuItemCount = await db.collection('menuitems').countDocuments();
    
    // Get total revenue
    const orders = await db.collection('orders').find().toArray();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    // Get recent orders
    const recentOrders = await db.collection('orders')
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    res.status(200).json({
      success: true,
      data: {
        userCount,
        orderCount,
        menuItemCount,
        totalRevenue,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin statistics',
      error: error.message
    });
  }
};