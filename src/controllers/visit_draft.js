
const VisitRecord = require('../models/visitRecord.model');
const MedicalRecord = require('../models/medicalRecord.model');
const Patient = require('../models/patient.model');
const User = require('../models/user.model');


// POST /visit-records
const createVisitRecord = async (req, res) => {
  try {
    const {
      medical_record_id,
      symptoms,
      diagnosis,
      treatment,
      note
    } = req.body;

    if (!medical_record_id || !symptoms || !diagnosis || !treatment) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    const medicalRecord = await MedicalRecord.findById(medical_record_id);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // 🔥 lấy doctor từ DB
    const doctor = await User.findById(req.user.id);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(403).json({ message: 'Only doctor can create visit' });
    }

    const visit = await VisitRecord.create({
      medical_record_id,
      doctor_id: doctor._id,
      department: doctor.department || "Chưa xác định", // 🔥 FIX
      symptoms,
      diagnosis,
      treatment,
      note
    });

    res.status(201).json({
      message: 'Visit record created',
      data: visit
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getVisitRecordDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const visit = await VisitRecord.findById(id)
      .populate('doctor_id', 'fullname email')
      .populate({
        path: 'medical_record_id',
        populate: {
          path: 'patient_id',
          select: 'fullname user_id'
        }
      });

    if (!visit) {
      return res.status(404).json({ message: 'Visit record not found' });
    }

    // 🔒 patient chỉ xem của mình
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({
        user_id: req.user.id
      });

      if (
        !patient ||
        patient._id.toString() !==
          visit.medical_record_id.patient_id._id.toString()
      ) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    res.json(visit);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateVisitRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      symptoms,
      diagnosis,
      treatment,
      note
    } = req.body;

    const visit = await VisitRecord.findById(id);

    if (!visit) {
      return res.status(404).json({ message: 'Visit record not found' });
    }

    // 🔒 chỉ doctor tạo mới sửa được
    if (visit.doctor_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // update từng field
    if (symptoms) visit.symptoms = symptoms;
    if (diagnosis) visit.diagnosis = diagnosis;
    if (treatment) visit.treatment = treatment;
    if (note !== undefined) visit.note = note;

    await visit.save();

    res.json({
      message: 'Visit record updated',
      data: visit
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteVisitRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const visit = await VisitRecord.findById(id);

    if (!visit) {
      return res.status(404).json({ message: 'Visit record not found' });
    }

    if (visit.doctor_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await visit.deleteOne();

    res.json({
      message: 'Visit record deleted'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getVisitsByMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const medicalRecord = await MedicalRecord.findById(id)
      .populate({
        path: 'patient_id',
        select: 'user_id fullname'
      });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // 🔒 patient check
    if (req.user.role === 'patient') {
      if (
        !medicalRecord.patient_id.user_id ||
        medicalRecord.patient_id.user_id.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    const visits = await VisitRecord.find({
      medical_record_id: id
    })
      .populate('doctor_id', 'fullname')
      .sort({ createdAt: -1 });

    res.json(visits);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createVisitRecord,
  getVisitRecordDetail,
  updateVisitRecord,
  deleteVisitRecord,
  getVisitsByMedicalRecord
};