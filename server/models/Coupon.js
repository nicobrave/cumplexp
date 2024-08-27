const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: String,
  experienceType: { type: String, required: true },
  benefit: { type: String, required: true },
  qrCode: String,
  availableQuantity: { type: Number, required: true },
  redeemedQuantity: { type: Number, default: 0 }, // Cantidad redimida
  expirationDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);
