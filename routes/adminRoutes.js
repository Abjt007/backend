const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Middleware to ensure only admins can access these routes
router.use(authMiddleware, roleMiddleware('admin'));

// Admin routes
router.get('/dashboard', adminController.getDashboardStats);
router.post('/create-fieldworker', adminController.createFieldWorker);
router.delete('/delete-fieldworker/:id', adminController.deleteFieldWorker);
router.get('/logs', adminController.getActivityLogs);

module.exports = router;
