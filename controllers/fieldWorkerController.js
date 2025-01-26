const Refugee = require('../models/Refugee');
const AidRecord = require('../models/AidRecord');

// Get assigned tasks for the field worker
exports.getAssignedTasks = async (req, res) => {
  try {
    const tasks = await AidRecord.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching assigned tasks' });
  }
};

// Update refugee information
exports.updateRefugeeInfo = async (req, res) => {
  try {
    const { id, data } = req.body;
    const updatedRefugee = await Refugee.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedRefugee);
  } catch (error) {
    res.status(400).json({ error: 'Error updating refugee info' });
  }
};

// Submit an aid report
exports.submitAidReport = async (req, res) => {
  try {
    const { aidDetails } = req.body;
    const newAidRecord = await AidRecord.create({ ...aidDetails, assignedTo: req.user.id });
    res.status(201).json(newAidRecord);
  } catch (error) {
    res.status(400).json({ error: 'Error submitting aid report' });
  }
};
