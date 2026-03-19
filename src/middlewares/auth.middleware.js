const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist.model'); // nếu bạn chưa làm logout blacklist thì có thể comment dòng này

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // 2. Check blacklist (nếu có dùng logout)
    if (TokenBlacklist) {
      const isBlacklisted = await TokenBlacklist.findOne({ token });
      if (isBlacklisted) {
        return res.status(401).json({ message: 'Token revoked' });
      }
    }

    // 3. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Gắn user vào request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (err) {
    console.error(err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;