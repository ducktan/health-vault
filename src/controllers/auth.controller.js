const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// [API 2] Đăng ký
exports.signUp = async (req, res) => {
  try {
    const { username, password, fullname, email, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: 'Tên đăng nhập hoặc email đã tồn tại!' });

    const newUser = new User({ username, password, fullname, email, role });
    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [API 1] Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại!' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Sai mật khẩu!' });

    // Tạo token (lưu id và role)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [API 3] Quên mật khẩu (Demo logic cơ bản)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email không tồn tại!' });
  
  // Thực tế ở đây sẽ gửi Email chứa mã OTP hoặc Link reset.
  // Ở đây mình trả về luôn 1 token tạm thời để bạn test API 4.
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.status(200).json({ message: 'Gửi yêu cầu thành công', resetToken });
};

// [API 4] Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    user.password = newPassword; // Mongoose sẽ tự động băm lại nhờ pre('save')
    await user.save();
    
    res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
  } catch (error) {
    res.status(400).json({ message: 'Token hết hạn hoặc không hợp lệ!' });
  }
};

// [API 5] Lấy thông tin Auth (Thường trùng với API 6)
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json(user);
};