const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Middleware to ensure only donors can access these routes
router.use(authMiddleware, roleMiddleware('donor'));

// Donor routes
router.get('/view-donations', donorController.viewDonations);
router.post('/make-donation', donorController.makeDonation);
router.get('/track-donation/:id', donorController.trackDonation);

module.exports = router;
