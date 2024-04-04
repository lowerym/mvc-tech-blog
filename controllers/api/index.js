// Imports
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');

// Middleware
router.use('/users', userRoutes);
router.use('/blogPost', blogRoutes);
router.use('/comment', commentRoutes);

// Exports
module.exports = router;
