const { getDB } = require('../../config/database');
const { ObjectId } = require('mongodb');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    const db = getDB();
    
    // Filter by category if provided in query
    const filter = { available: true };
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    
    const menuItems = await db.collection('menuitems').find(filter).toArray();
    
    // Format for frontend compatibility
    const formattedItems = menuItems.map(item => ({
      id: item._id,
      product_id: item.product_id,
      product_name: item.product_name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      available: item.available
    }));

    res.status(200).json({
      success: true,
      count: formattedItems.length,
      data: { menu: formattedItems }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message
    });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItem = async (req, res) => {
  try {
    const db = getDB();
    
    // Check if we're looking up by product_id or ObjectId
    let query;
    if (!isNaN(req.params.id)) {
      // It's a number, use product_id
      query = { product_id: parseInt(req.params.id) };
    } else {
      // Try to use it as an ObjectId
      try {
        query = { _id: new ObjectId(req.params.id) };
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID format'
        });
      }
    }
    
    const menuItem = await db.collection('menuitems').findOne(query);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu item',
      error: error.message
    });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    const db = getDB();
    
    // Get the highest product_id and increment
    const lastItem = await db.collection('menuitems').findOne({}, { sort: { product_id: -1 } });
    const nextProductId = lastItem ? lastItem.product_id + 1 : 1;
    
    const newItem = {
      ...req.body,
      product_id: nextProductId,
      available: req.body.available !== undefined ? req.body.available : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('menuitems').insertOne(newItem);
    
    res.status(201).json({
      success: true,
      data: { ...newItem, _id: result.insertedId }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating menu item',
      error: error.message
    });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    const db = getDB();
    
    const updatedItem = {
      ...req.body,
      updatedAt: new Date()
    };
    
    let query;
    if (!isNaN(req.params.id)) {
      // It's a number, use product_id
      query = { product_id: parseInt(req.params.id) };
    } else {
      // Try to use it as an ObjectId
      try {
        query = { _id: new ObjectId(req.params.id) };
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID format'
        });
      }
    }
    
    console.log("Update query:", query);
    console.log("Update data:", updatedItem);
    
    // Change how we update the document
    // First, check if the document exists
    const existingDoc = await db.collection('menuitems').findOne(query);
    
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    // Then update it
    await db.collection('menuitems').updateOne(
      query,
      { $set: updatedItem }
    );
    
    // Finally, get the updated document
    const updatedDoc = await db.collection('menuitems').findOne(query);

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updatedDoc
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating menu item',
      error: error.message
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const db = getDB();
    
    // Check if we're deleting by product_id or ObjectId
    let query;
    if (!isNaN(req.params.id)) {
      // It's a number, use product_id
      query = { product_id: parseInt(req.params.id) };
    } else {
      // Try to use it as an ObjectId
      try {
        query = { _id: new ObjectId(req.params.id) };
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID format'
        });
      }
    }
    
    console.log("Delete query:", query);
    
    const result = await db.collection('menuitems').deleteOne(query);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(400).json({
      success: false,
      message: 'Error deleting menu item',
      error: error.message
    });
  }
};