const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullname: String,
  cccd: String,
  dob: Date,
  gender: String,
  phone: String,
  address: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
