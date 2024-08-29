const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
// Import other route files as needed

// Use the routes
router.use('/auth', authRoutes);
// Add other routes here

module.exports = router;
