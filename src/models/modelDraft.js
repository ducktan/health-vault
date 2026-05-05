const mongoose = require('mongoose');

const visitRecordSchema = new mongoose.Schema(
  {
    medical_record_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'medical_records',
      required: true,
      index: true
    },

    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    department: {               // 🔥 thêm vào
      type: String,
      required: true
    },

    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },

    note: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model('visit_records', visitRecordSchema);