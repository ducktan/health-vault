const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  department: { type: String, default: null } // chỉ dùng khi role là doctor/admin
}, { 
  timestamps: true // tự động tạo createdAt, updatedAt
});

module.exports = mongoose.model('User', userSchema);