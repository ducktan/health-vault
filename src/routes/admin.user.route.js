const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/admin.user.controller');

// 👇 bắt buộc admin
router.use(verifyToken, authorize('admin'));
// router.use(verifyToken);

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;