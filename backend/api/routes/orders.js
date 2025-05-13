const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createOrder,
  getOrderHistory,
  getOrderById
} = require('../controllers/orderController');

// All routes are protected with authentication
router.use(protect);

// Routes
router.route('/')
  .get(getOrderHistory)
  .post(createOrder);

router.route('/:id')
  .get(getOrderById);

module.exports = router;