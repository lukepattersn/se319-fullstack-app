const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { initializeCollections } = require('./models/collections');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database connection
const startServer = async () => {
  try {
    console.log('Starting server...');
    
    // Connect to database first
    await connectDB();
    console.log('Database connected');
    
    // Initialize collections
    await initializeCollections();
    console.log('Collections initialized');
    
    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes - register after database is connected
    app.use('/api/menu', require('./api/routes/menu'));
    app.use('/api/static', require('./api/routes/static'));
    
    // New routes for authentication, orders, and checkout
    app.use('/api/auth', require('./api/routes/auth'));
    app.use('/api/orders', require('./api/routes/orders'));
    app.use('/api/checkout', require('./api/routes/checkout'));

    // Basic route
    app.get('/', (req, res) => {
      res.send('Street Food Fighter API is running!');
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  const { closeConnection } = require('./config/database');
  await closeConnection();
  process.exit(0);
});