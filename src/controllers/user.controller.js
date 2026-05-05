const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const sanitize = require("mongo-sanitize");


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
// const updateMe = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const {
//       fullname,
//       email,
//       phone,
//       address
//     } = req.body || {};

//     // 1. update user
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         ...(fullname && { fullname }),
//         ...(email && { email })
//       },
//       { new: true }
//     ).select('-password');

//     // 2. nếu là patient → update thêm
//     let updatedPatient = null;

//     if (updatedUser.role === 'patient') {
//       updatedPatient = await Patient.findOneAndUpdate(
//         { user_id: userId },
//         {
//           ...(fullname && { fullname }),
//           ...(phone && { phone }),
//           ...(address && { address })
//         },
//         { new: true }
//       );
//     }

//     return res.json({
//       message: 'Update successful',
//       user: updatedUser,
//       patient: updatedPatient
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// Secure 
const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;

    let { fullname, email, phone, address } = req.body || {};

    // =========================
    // 1. TYPE VALIDATION
    // =========================
    if (
      (fullname && typeof fullname !== "string") ||
      (email && typeof email !== "string") ||
      (phone && typeof phone !== "string") ||
      (address && typeof address !== "string")
    ) {
      return res.status(400).json({
        message: "Invalid input type"
      });
    }

    // =========================
    // 2. NORMALIZE
    // =========================
    fullname = fullname?.trim();
    email = email?.trim().toLowerCase();
    phone = phone?.trim();
    address = address?.trim();

    // =========================
    // 3. EMPTY CHECK
    // =========================
    if (!fullname && !email && !phone && !address) {
      return res.status(400).json({
        message: "No data to update"
      });
    }

    // =========================
    // 4. FORMAT VALIDATION
    // =========================

    // fullname
    if (fullname && fullname.length < 2) {
      return res.status(400).json({
        message: "Invalid fullname"
      });
    }

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // phone (chỉ số, 9–11 ký tự)
    const phoneRegex = /^[0-9]{9,11}$/;
    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Invalid phone number"
      });
    }

    // =========================
    // 5. SANITIZE
    // =========================
    const cleanFullname = fullname ? sanitize(fullname) : undefined;
    const cleanEmail = email ? sanitize(email) : undefined;
    const cleanPhone = phone ? sanitize(phone) : undefined;
    const cleanAddress = address ? sanitize(address) : undefined;

    // =========================
    // 6. BUILD UPDATE OBJECT
    // =========================
    const userUpdate = {};
    if (cleanFullname) userUpdate.fullname = cleanFullname;
    if (cleanEmail) userUpdate.email = cleanEmail;

    const patientUpdate = {};
    if (cleanFullname) patientUpdate.fullname = cleanFullname;
    if (cleanPhone) patientUpdate.phone = cleanPhone;
    if (cleanAddress) patientUpdate.address = cleanAddress;

    // =========================
    // 7. UPDATE USER
    // =========================
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      userUpdate,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // =========================
    // 8. UPDATE PATIENT (IF NEEDED)
    // =========================
    let updatedPatient = null;

    if (updatedUser.role === "patient") {
      updatedPatient = await Patient.findOneAndUpdate(
        { user_id: userId },
        patientUpdate,
        { new: true, runValidators: true }
      );
    }

    // =========================
    // 9. RESPONSE
    // =========================
    return res.json({
      message: "Update successful",
      user: updatedUser,
      patient: updatedPatient
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err.message);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getMe,
  updateMe
};