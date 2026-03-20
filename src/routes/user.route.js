const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth.middleware');
const { getMe, updateMe, getAllUsers, getUserById, updateUserById, deleteUserById, createUser } = require('../controllers/user.controller');

// 🔥 thêm dòng này
router.get('/', getAllUsers);
router.get("/:id", getUserById);
router.get('/me', verifyToken, getMe);
router.put('/me', verifyToken, updateMe);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.post("/", createUser);
module.exports = router;