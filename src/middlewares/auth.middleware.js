const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Từ chối truy cập. Không tìm thấy token!' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

// Phân quyền: Phải là Admin mới được đi tiếp
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Truy cập bị từ chối. Chỉ Admin mới có quyền thực hiện!' });
  }
};

module.exports = { verifyToken, isAdmin };