const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/adminController');

// All routes are protected with admin authentication
router.use(protect);
router.use(admin);

// Routes
router.get('/stats', getDashboardStats);

module.exports = router;