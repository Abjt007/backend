const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  cause: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
