const FieldWorker = require('../models/User');
const ActivityLog = require('../models/ActivityLog');

// Get dashboard statistics for admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalFieldWorkers = await FieldWorker.countDocuments({ role: 'fieldWorker' });
    const totalLogs = await ActivityLog.countDocuments();
    res.json({ totalFieldWorkers, totalLogs });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
};

// Create a new field worker
exports.createFieldWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newFieldWorker = await FieldWorker.create({ name, email, password, role: 'fieldWorker' });
    res.status(201).json(newFieldWorker);
  } catch (error) {
    res.status(400).json({ error: 'Error creating field worker' });
  }
};

// Delete a field worker
exports.deleteFieldWorker = async (req, res) => {
  try {
    const { id } = req.params;
    await FieldWorker.findByIdAndDelete(id);
    res.json({ message: 'Field worker deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting field worker' });
  }
};

// Get activity logs
exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching activity logs' });
  }
};
