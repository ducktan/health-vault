const Patient = require('../models/patient.model');
const MedicalRecord = require('../models/medicalRecord.model');

const createPatient = async (req, res) => {
  try {
    const {
      fullname,
      cccd,
      dob,
      gender,
      phone,
      address
    } = req.body || {};

    if (!fullname) {
      return res.status(400).json({ message: 'Fullname required' });
    }

    // tạo patient
    const patient = await Patient.create({
      fullname,
      cccd,
      dob,
      gender,
      phone,
      address
    });

    // tạo medical record
    const medicalRecord = await MedicalRecord.create({
      patient_id: patient._id
    });

    return res.status(201).json({
      message: 'Patient created',
      patient,
      medicalRecord
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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

module.exports = {
  createPatient,
  getPatients,
  getPatientDetail,
  updatePatient
};