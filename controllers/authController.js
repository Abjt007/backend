const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// User registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

// Reset password logic omitted for brevity


controllers/adminController.js
javascript
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
controllers/fieldWorkerController.js
javascript
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
controllers/donorController.js
javascript
const Donation = require('../models/Donation');

// View donations by the donor
exports.viewDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.id });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching donations' });
  }
};

// Make a new donation
exports.makeDonation = async (req, res) => {
  try {
    const { amount, cause } = req.body;
    const newDonation = await Donation.create({ donorId: req.user.id, amount, cause });
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(400).json({ error: 'Error making donation' });
  }
};

// Track donation status
exports.trackDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id);
    res.json(donation);
  } catch (error) {
    res.status(400).json({ error: 'Error tracking donation' });
  }
};
controllers/refugeeController.js
javascript
const Refugee = require('../models/Refugee');
const AidRecord = require('../models/AidRecord');

// Get refugee profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Refugee.findById(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// View aid received by the refugee
exports.viewAidReceived = async (req, res) => {
  try {
    const aidRecords = await AidRecord.find({ refugeeId: req.user.id });
    res.json(aidRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching aid records' });
  }
};

// Update refugee profile
exports.updateProfile = async (req, res) => {
  try {
    const { data } = req.body;
    const updatedProfile = await Refugee.findByIdAndUpdate(req.user.id, data, { new: true });
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: 'Error updating profile' });
  }
};
