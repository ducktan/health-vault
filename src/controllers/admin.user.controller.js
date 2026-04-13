const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// GET /admin/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /admin/users
const createUser = async (req, res) => {
  try {
    const { username, password, fullname, email, role, department } = req.body || {};

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // check duplicate
    const exist = await User.findOne({ $or: [{ username }, { email }] });
    if (exist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    // department chỉ hợp lệ với doctor/admin
    const userDepartment = (role === 'doctor' || role === 'admin') ? department || null : null;

    const user = await User.create({
      username,
      password: hashed,
      fullname,
      email,
      role,
      department: userDepartment
    });

    return res.status(201).json({
      message: 'User created',
      user: { ...user.toObject(), password: undefined }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /admin/users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, role, department } = req.body || {};

    // nếu role được update, kiểm tra department
    let updateData = {
      ...(fullname && { fullname }),
      ...(email && { email }),
      ...(role && { role })
    };

    if (role) {
      updateData.department = (role === 'doctor' || role === 'admin') ? department || null : null;
    } else if (department) {
      // nếu role không thay đổi, vẫn update department nếu hợp lệ
      const existingUser = await User.findById(id);
      if (!existingUser) return res.status(404).json({ message: 'User not found' });

      if (existingUser.role === 'doctor' || existingUser.role === 'admin') {
        updateData.department = department;
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'User updated', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};