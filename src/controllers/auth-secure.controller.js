const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const TokenBlacklist = require('../models/tokenBlacklist.model');
const PasswordResetToken = require('../models/PasswordResetToken');
const mongoose = require('mongoose');
const sanitize = require("mongo-sanitize");


// optional: regex kiểm tra email cơ bản
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { username, password, fullname, email } = req.body || {};

    // ===== 1. TYPE VALIDATION =====
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof fullname !== "string" ||
      typeof email !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input type" });
    }

    // ===== 2. NORMALIZE =====
    username = username.trim();
    password = password.trim();
    fullname = fullname.trim();
    email = email.trim().toLowerCase();

    if (!username || !password || !fullname || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ===== 3. FORMAT VALIDATION =====
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: "Invalid username format" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    // ===== 4. SANITIZE =====
    const cleanUsername = String(sanitize(username));
    const cleanEmail = String(sanitize(email));

    // ===== 5. CHECK DUPLICATE =====
    const existUser = await User.findOne({ username: cleanUsername }).session(session);
    if (existUser) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Username already exists" });
    }

    const existEmail = await User.findOne({ email: cleanEmail }).session(session);
    if (existEmail) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Email already exists" });
    }

    // ===== 6. HASH PASSWORD =====
    const hashedPassword = await bcrypt.hash(password, 10);

    // ===== 7. CREATE USER =====
    const newUser = await User.create([{
      username: cleanUsername,
      password: hashedPassword,
      fullname,
      email: cleanEmail,
      role: "patient" // hardcode tránh privilege escalation
    }], { session });

    const userId = newUser[0]._id;

    await session.commitTransaction();

    return res.status(201).json({
      message: "Register success",
      userId
    });

  } catch (err) {
    await session.abortTransaction();

    console.error("REGISTER ERROR:", err.message); // không log full stack

    return res.status(500).json({
      message: "Server error"
    });
  } finally {
    session.endSession();
  }
};

const login = async (req, res) => {
  try {
    let { identifier, password } = req.body || {};

    // 1) Validate presence + type (chặn object/array)
    if (
      typeof identifier !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // 2) Normalize input
    identifier = identifier.trim();
    password = password.trim();

    if (!identifier || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    // 3) Sanitize để loại bỏ $ và . (NoSQL operator injection)
    const cleanIdentifier = sanitize(identifier);

    // 4) Tạo query an toàn (KHÔNG cho object đi vào)
    // Chỉ dùng string đã sanitize
    let query;
    if (isEmail(cleanIdentifier)) {
      query = { email: cleanIdentifier.toLowerCase() };
    } else {
      query = { username: cleanIdentifier };
    }

    // 5) Query DB
    const user = await User.findOne(query).select("+password");

    // 6) Trả lỗi giống nhau để tránh user enumeration
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 7) So khớp password (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 8) Tạo token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" }
    );

    // 9) Cookie bảo mật hơn (prod nên secure=true)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 10) Response
    return res.json({
      message: "Login success",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        department: user.department || null
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");

    return res.json({
      message: "Logout success"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // không tiết lộ user tồn tại hay không
      return res.json({ message: 'If email exists, reset link sent' });
    }

    // tạo token random
    const resetToken = crypto.randomBytes(32).toString('hex');

    // hash token trước khi lưu (security)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // lưu DB (expire 15 phút)
    await PasswordResetToken.create({
      user_id: user._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    });

    // link gửi mail
    const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;

    console.log('RESET LINK:', resetLink); // demo (thay bằng gửi email)

    return res.json({ message: 'If email exists, reset link sent' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body || {};

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // hash token để match DB
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const resetDoc = await PasswordResetToken.findOne({
      token: hashedToken
    });

    if (!resetDoc) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // tìm user
    const user = await User.findById(resetDoc.user_id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // xóa token sau khi dùng
    await PasswordResetToken.deleteOne({ _id: resetDoc._id });

    return res.json({ message: 'Password reset successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Lấy role từ DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },  // ✅ thêm role
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" }
    );

    return res.json({
      accessToken: newAccessToken
    });

  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};


module.exports = { register, login, logout, forgotPassword, resetPassword, refreshToken };