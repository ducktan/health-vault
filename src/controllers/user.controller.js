const User = require('../models/user.model');
const Patient = require('../models/patient.model');


// GET /users/me
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // nếu là patient → lấy thêm info
    let patient = null;
    if (user.role === 'patient') {
      patient = await Patient.findOne({ user_id: userId });
    }

    return res.json({
      user,
      patient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// PUT /users/me
const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullname,
      email,
      phone,
      address
    } = req.body || {};

    // 1. update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(fullname && { fullname }),
        ...(email && { email })
      },
      { new: true }
    ).select('-password');

    // 2. nếu là patient → update thêm
    let updatedPatient = null;

    if (updatedUser.role === 'patient') {
      updatedPatient = await Patient.findOneAndUpdate(
        { user_id: userId },
        {
          ...(fullname && { fullname }),
          ...(phone && { phone }),
          ...(address && { address })
        },
        { new: true }
      );
    }

    return res.json({
      message: 'Update successful',
      user: updatedUser,
      patient: updatedPatient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let patient = null;

    // 👇 lấy thêm bảng patient nếu có
    patient = await Patient.findOne({ user_id: userId });

    res.json({
      user,
      patient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const {
      fullname,
      email,
      phone,
      address,
      gender
    } = req.body;

    // 🔹 update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(fullname && { fullname }),
        ...(email && { email })
      },
      { new: true }
    ).select("-password");

    // 🔹 update patient
    let updatedPatient = null;

    const patient = await Patient.findOne({ user_id: userId });

    if (patient) {
      updatedPatient = await Patient.findOneAndUpdate(
        { user_id: userId },
        {
          ...(fullname && { fullname }),
          ...(phone && { phone }),
          ...(address && { address }),
          ...(gender && { gender })
        },
        { new: true }
      );
    }

    res.json({
      message: "Update thành công",
      user: updatedUser,
      patient: updatedPatient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // 🔥 xóa patient trước
    await Patient.findOneAndDelete({ user_id: userId });

    // 🔥 xóa user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    res.json({ message: "Xóa thành công" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,

      // patient fields
      cccd,
      dob,
      gender,
      phone,
      address
    } = req.body;

    // 🔥 validate cơ bản
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    // 🔥 check email tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // 🔥 HASH PASSWORD (quan trọng)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 tạo user
    const newUser = await User.create({
      username: email.split("@")[0], // đẹp hơn
      fullname: name,
      email,
      password: hashedPassword, // 👈 đã băm
      role
    });

    // 🔹 tạo patient nếu cần
    let patient = null;

    if (role === "patient") {
      patient = await Patient.create({
        user_id: newUser._id,
        fullname: name,
        cccd,
        dob,
        gender,
        phone,
        address
      });
    }

    res.status(201).json({
      message: "Tạo user thành công",
      user: newUser,
      patient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMe,
  updateMe,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser
};