const express = require('express');
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword, refreshToken } = require('../controllers/auth-secure.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/refresh', refreshToken);

module.exports = router;