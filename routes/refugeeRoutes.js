const express = require('express');
const router = express.Router();
const refugeeController = require('../controllers/refugeeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Middleware to ensure only refugees can access these routes
router.use(authMiddleware, roleMiddleware('refugee'));

// Refugee routes
router.get('/my-profile', refugeeController.getProfile);
router.get('/aid-received', refugeeController.viewAidReceived);
router.post('/update-profile', refugeeController.updateProfile);

module.exports = router;
