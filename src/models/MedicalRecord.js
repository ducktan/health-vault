const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  diagnosis: { type: String, required: true }, // Chẩn đoán
  treatment: { type: String, required: true }, // Điều trị
  notes: { type: String } // Ghi chú thêm
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);