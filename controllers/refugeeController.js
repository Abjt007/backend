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
