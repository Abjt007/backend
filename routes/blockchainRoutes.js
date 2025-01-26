const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Blockchain-related routes
router.use(authMiddleware);

// Admin-specific blockchain operations
router.post('/add-record', roleMiddleware('admin'), blockchainController.addAidRecord);
router.get('/query-record/:id', blockchainController.queryAidRecord);
router.get('/events', blockchainController.getBlockchainEvents);

module.exports = router;
