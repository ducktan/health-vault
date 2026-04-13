const mongoose = require('mongoose');

const visitRecordSchema = new mongoose.Schema(
  {
    medical_record_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalRecord', // ✅ FIX
      required: true,
      index: true
    },

    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    symptoms: {
      type: String,
      required: true
    },

    diagnosis: {
      type: String,
      required: true
    },

    treatment: {
      type: String,
      required: true
    },

    note: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// tối ưu query timeline
visitRecordSchema.index({ medical_record_id: 1, createdAt: -1 });

module.exports = mongoose.model('visit_records', visitRecordSchema);