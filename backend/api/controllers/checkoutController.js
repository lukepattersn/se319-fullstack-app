const orderModel = require('../../models/orderModel');
const { ObjectId } = require('mongodb');

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Private
exports.processCheckout = async (req, res) => {
  try {
    const { cartItems, shippingDetails, paymentDetails, totalAmount } = req.body;

    // Validate request
    if (!cartItems || !cartItems.length || !shippingDetails || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide cart items, shipping details, and total amount'
      });
    }

    // Create order items from cart items
    const items = cartItems.map(item => ({
      productId: item.product_id || item.id,
      name: item.product_name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image
    }));

    // Create order
    const orderData = {
      userId: new ObjectId(req.user.id),
      items,
      shippingDetails,
      totalAmount,
      status: 'completed', // Since we're simulating payment, set to completed
      paymentMethod: paymentDetails.method || 'Credit Card',
      paymentStatus: 'paid',  // Since we're simulating payment, set to paid
      paymentDetails: {
        // Only store last 4 digits of card number for security
        cardLastFour: paymentDetails.cardNumber 
          ? paymentDetails.cardNumber.slice(-4) 
          : '****'
      }
    };

    const order = await orderModel.createOrder(orderData);

    res.status(200).json({
      success: true,
      message: 'Checkout successful',
      data: {
        orderId: order._id,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing checkout',
      error: error.message
    });
  }
};