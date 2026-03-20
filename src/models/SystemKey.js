const mongoose = require('mongoose');

const systemKeySchema = new mongoose.Schema({
  keyName: { type: String, required: true, unique: true },
  keyValue: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SystemKey', systemKeySchema);