const User = require('../models/user.model');
const Patient = require('../models/patient.model');


// GET /users/me
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // nếu là patient → lấy thêm info
    let patient = null;
    if (user.role === 'patient') {
      patient = await Patient.findOne({ user_id: userId });
    }

    return res.json({
      user,
      patient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// PUT /users/me
const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullname,
      email,
      phone,
      address
    } = req.body || {};

    // 1. update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(fullname && { fullname }),
        ...(email && { email })
      },
      { new: true }
    ).select('-password');

    // 2. nếu là patient → update thêm
    let updatedPatient = null;

    if (updatedUser.role === 'patient') {
      updatedPatient = await Patient.findOneAndUpdate(
        { user_id: userId },
        {
          ...(fullname && { fullname }),
          ...(phone && { phone }),
          ...(address && { address })
        },
        { new: true }
      );
    }

    return res.json({
      message: 'Update successful',
      user: updatedUser,
      patient: updatedPatient
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMe,
  updateMe
};