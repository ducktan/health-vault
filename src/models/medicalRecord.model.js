const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
}, { timestamps: true });

module.exports = mongoose.model('medical_records', schema);