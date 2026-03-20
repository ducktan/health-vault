const User = require('../models/User');
const MedicalRecord = require('../models/MedicalRecord');
const SystemKey = require('../models/SystemKey');

// ================= PHẦN QUẢN LÝ USER =================

// [API 24] Xem danh sách User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Bỏ qua mật khẩu cho an toàn
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [API 25] Tạo User mới (Admin tạo)
exports.createUser = async (req, res) => {
  try {
    const { username, password, fullname, email, role } = req.body;
    const newUser = new User({ username, password, fullname, email, role });
    await newUser.save(); // Mật khẩu sẽ tự động được băm nhờ pre('save') trong Model
    res.status(201).json({ message: 'Tạo user thành công!', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// [API 26] Cập nhật User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Nếu admin update password, nó sẽ không tự băm qua Model.findByIdAndUpdate. 
    // Tạm thời ở mức cơ bản, ta cho update các thông tin khác (trừ mật khẩu).
    delete updateData.password; 

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// [API 27] Xóa User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Đã xóa user thành công!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= PHẦN QUẢN LÝ BỆNH ÁN =================

// [API 28] Xem tất cả bệnh án
exports.getAllMedicalRecords = async (req, res) => {
  try {
    // Dùng populate để kéo luôn thông tin tên Bệnh nhân và Bác sĩ từ bảng User sang
    const records = await MedicalRecord.find()
      .populate('patientId', 'fullname email')
      .populate('doctorId', 'fullname email');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [API 29] Xóa bệnh án
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicalRecord.findByIdAndDelete(id);
    res.status(200).json({ message: 'Đã xóa bệnh án thành công!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= PHẦN QUẢN LÝ KHÓA HỆ THỐNG =================

// [API 30] Cấp khóa hệ thống
exports.createSystemKey = async (req, res) => {
  try {
    const { keyName, keyValue } = req.body;
    const newKey = new SystemKey({ keyName, keyValue });
    await newKey.save();
    res.status(201).json({ message: 'Cấp khóa thành công!', key: newKey });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// [API 31] Xem danh sách khóa
exports.getAllSystemKeys = async (req, res) => {
  try {
    const keys = await SystemKey.find();
    res.status(200).json(keys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};