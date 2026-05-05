const MedicalRecord = require('../models/medicalRecord.model');
const Patient = require('../models/patient.model');


// POST /medical-records
const createMedicalRecord = async (req, res) => {
  try {
    const { patient_id } = req.body;

    if (!patient_id) {
      console.log('Missing patient_id in request body');
      return res.status(400).json({ message: 'patient_id is required' });
    }

    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const existed = await MedicalRecord.findOne({ patient_id });
    if (existed) {
      return res.status(400).json({
        message: 'Medical record already exists for this patient'
      });
    }
    const record = await MedicalRecord.create({
      patient_id
    });

    return res.status(201).json({
      message: 'Medical record created',
      data: record
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET /medical-records
const getMedicalRecords = async (req, res) => {
  try {
    let records;

    // 👨‍⚕️ doctor → xem tất cả
    if (req.user.role === "doctor") {
      records = await MedicalRecord.find()
        .populate({
          path: "patient_id",
          select: "fullname phone gender cccd dob"
        })
        .sort({ createdAt: -1 });
    }

    // 🧑‍🤝‍🧑 patient → chỉ xem của mình
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({
        user_id: req.user.id
      });

      if (!patient) {
        return res.status(404).json({
          message: "Patient not found"
        });
      }

      records = await MedicalRecord.find({
        patient_id: patient._id
      })
        .populate({
          path: "patient_id",
          select: "fullname phone gender cccd dob"
        })
        .sort({ createdAt: -1 });
    }

    return res.json(records);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /medical-records/:id
const getMedicalRecordDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await MedicalRecord.findById(id)
      .populate({
        path: 'patient_id',
        select: 'fullname dob gender phone address cccd'
      });

    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // nếu role patient → chỉ xem hồ sơ của mình
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({
        user_id: req.user.id
      });

      if (!patient) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      if (patient._id.toString() !== record.patient_id._id.toString()) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    return res.json(record);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// DELETE /medical-records/:id
const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await MedicalRecord.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    return res.json({
      message: 'Medical record deleted'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecordDetail,
  deleteMedicalRecord
};