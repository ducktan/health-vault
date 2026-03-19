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
    context: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

visitRecordSchema.index({ medical_record_id: 1, createdAt: -1 });

module.exports = mongoose.model('visit_records', visitRecordSchema);