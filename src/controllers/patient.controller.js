const Patient = require('../models/patient.model');
const MedicalRecord = require('../models/medicalRecord.model');

const mongoose = require('mongoose');

const User = require('../models/user.model');


const createPatient = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      fullname,
      email,
      cccd,
      dob,
      gender,
      phone,
      address
    } = req.body || {};

    if (!fullname) {
      return res.status(400).json({ message: 'Fullname required' });
    }

    let userId = null;

    // tìm user theo email
    if (email) {
      const user = await User.findOne({ email }).session(session);
      if (user) {
        userId = user._id;
      }
    }

    const existingPatient = await Patient.findOne({ cccd }).session(session);

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient with this CCCD already exists"
      });
    }

    // tạo patient
    const patient = await Patient.create([{
      user_id: userId,
      fullname,
      cccd,
      dob,
      gender,
      phone,
      address
    }], { session });

    // tạo medical record
    const medicalRecord = await MedicalRecord.create([{
      patient_id: patient[0]._id,
      assigned_doctor_id: req.user.id, // 🔥 lấy từ token
      department: req.user.department || "Chưa xác định"
    }], { session });

    await session.commitTransaction();

    return res.status(201).json({
      message: 'Patient created',
      patient: patient[0],
      medicalRecord: medicalRecord[0]
    });

  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    session.endSession();
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ created_at: -1 });

    return res.json(patients);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPatientDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const medicalRecord = await MedicalRecord.findOne({
      patient_id: id
    });

    return res.json({
      patient,
      medicalRecord
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      fullname,
      cccd,
      dob,
      gender,
      phone,
      address
    } = req.body || {};

    const patient = await Patient.findByIdAndUpdate(
      id,
      {
        ...(fullname && { fullname }),
        ...(cccd && { cccd }),
        ...(dob && { dob }),
        ...(gender && { gender }),
        ...(phone && { phone }),
        ...(address && { address })
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.json({
      message: 'Patient updated',
      patient
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const linkPatientByCCCD = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { cccd } = req.body;
    const userId = req.user.id; // lấy từ middleware verifyToken

    if (!cccd) {
      return res.status(400).json({
        message: 'CCCD required'
      });
    }

    // tìm patient theo CCCD
    const patient = await Patient.findOne({ cccd }).session(session);

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    // nếu đã link user khác rồi
    if (patient.user_id && patient.user_id.toString() !== userId) {
      return res.status(400).json({
        message: 'Patient already linked to another account'
      });
    }

    // link user
    patient.user_id = userId;
    await patient.save({ session });

    // lấy medical record
    const medicalRecord = await MedicalRecord.findOne({
      patient_id: patient._id
    }).session(session);

    await session.commitTransaction();

    return res.json({
      message: 'Patient linked successfully',
      patient,
      medicalRecord
    });

  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    session.endSession();
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientDetail,
  updatePatient,
  linkPatientByCCCD
};