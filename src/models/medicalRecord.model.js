const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  assigned_doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('medical_records', medicalRecordSchema);