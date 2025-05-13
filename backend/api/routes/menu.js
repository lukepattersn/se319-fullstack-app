const express = require('express');
const router = express.Router();
// We'll add auth middleware later
// const { protect, admin } = require('../middleware/auth');
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

// Admin only routes (we'll add auth middleware later)
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;