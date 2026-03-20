const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const adminController = require('../controllers/admin.controller'); // MỚI THÊM
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware'); // SỬA LẠI DÒNG NÀY

// --- AUTHENTICATION ROUTES ---
router.post('/auth/sign-up', authController.signUp);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password', authController.resetPassword);
router.get('/auth/me', verifyToken, authController.getMe);

// --- USER ROUTES ---
router.get('/users/me', verifyToken, userController.getProfile);
router.put('/users/me', verifyToken, userController.updateProfile);
// ================= ADMIN ROUTES =================
// Dùng mảng [verifyToken, isAdmin] để yêu cầu người dùng: 1. Đã đăng nhập -> 2. Phải là Admin

// Quản lý Users (API 24, 25, 26, 27)
router.get('/admin/users', [verifyToken, isAdmin], adminController.getAllUsers);
router.post('/admin/users', [verifyToken, isAdmin], adminController.createUser);
router.put('/admin/users/:id', [verifyToken, isAdmin], adminController.updateUser);
router.delete('/admin/users/:id', [verifyToken, isAdmin], adminController.deleteUser);

// Quản lý Bệnh án (API 28, 29)
router.get('/admin/medical-records', [verifyToken, isAdmin], adminController.getAllMedicalRecords);
router.delete('/admin/medical-records/:id', [verifyToken, isAdmin], adminController.deleteMedicalRecord);

// Quản lý Khóa (API 30, 31)
router.post('/admin/keys', [verifyToken, isAdmin], adminController.createSystemKey);
router.get('/admin/keys', [verifyToken, isAdmin], adminController.getAllSystemKeys);
module.exports = router;