const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    unique: true // 🔥 tránh duplicate luôn ở DB level
  }
}, { timestamps: true });

module.exports = mongoose.model('medical_records', medicalRecordSchema);