const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

// Public routes
router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

// Admin only routes
router.post('/', protect, admin, createMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;