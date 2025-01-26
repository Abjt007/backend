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
