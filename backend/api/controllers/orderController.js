const orderModel = require('../../models/orderModel');
const { ObjectId } = require('mongodb');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingDetails, totalAmount } = req.body;

    // Validate request
    if (!items || !items.length || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide order items and total amount'
      });
    }

    // Create order with the authenticated user's ID
    const orderData = {
      userId: new ObjectId(req.user.id),
      items,
      shippingDetails,
      totalAmount,
      status: 'completed', // Since we're simulating payment, set to completed
      paymentMethod: 'Credit Card', // Dummy payment method
      paymentStatus: 'paid'  // Dummy payment status
    };

    const order = await orderModel.createOrder(orderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// @desc    Get user's order history
// @route   GET /api/orders
// @access  Private
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await orderModel.findByUser(req.user.id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error getting order history:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting order history',
      error: error.message
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure user is accessing their own order (unless they're an admin)
    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting order',
      error: error.message
    });
  }
};