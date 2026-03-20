const User = require('../models/User');

// [API 6] Xem thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Bỏ field password
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [API 7] Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    // Không cho phép đổi password, username hay role ở API này
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { fullname, email }, 
      { new: true }
    ).select('-password');
    
    res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};