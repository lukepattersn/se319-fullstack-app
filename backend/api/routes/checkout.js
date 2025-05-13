const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { processCheckout } = require('../controllers/checkoutController');

// Protect checkout route
router.post('/', protect, processCheckout);

module.exports = router;