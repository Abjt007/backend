const express = require('express');
const router = express.Router();
const fieldWorkerController = require('../controllers/fieldWorkerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Middleware to ensure only field workers can access these routes
router.use(authMiddleware, roleMiddleware('fieldWorker'));

// Field worker routes
router.get('/assigned-tasks', fieldWorkerController.getAssignedTasks);
router.post('/update-refugee-info', fieldWorkerController.updateRefugeeInfo);
router.post('/submit-aid-report', fieldWorkerController.submitAidReport);

module.exports = router;
