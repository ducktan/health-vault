const VisitRecord = require('../models/visitRecord.model');
const MedicalRecord = require('../models/medicalRecord.model');
const Patient = require('../models/patient.model');
const User = require('../models/user.model');

const { encryptData, decryptData, exportSignedPdf } = require('../services/crypto.service');
const { Readable } = require("stream");


// =======================
// CREATE
// =======================
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

    // 🔥 lấy medical record + patient
    const medicalRecord = await MedicalRecord.findById(medical_record_id)
      .populate({
        path: 'patient_id',
        select: 'user_id'
      });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // 🔥 lấy doctor
    const doctor = await User.findById(req.user.id);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(403).json({ message: 'Only doctor can create visit' });
    }

    // 🔥 lấy patient_id để build policy
    const patientUserId = medicalRecord.patient_id?.user_id?.toString();

    if (!patientUserId) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    // 🔐 encrypt (THÊM patient_id)
    const sensitiveData = {
      symptoms,
      diagnosis,
      treatment,
      note,
      patient_id: patientUserId   // 🔥 QUAN TRỌNG
    };
    const encrypted = await encryptData(
      doctor.department,
      sensitiveData
    );


    // 🔥 lưu DB (KHÔNG lưu patient_id plaintext)
    const visit = await VisitRecord.create({
      medical_record_id,
      doctor_id: doctor._id,
      department: doctor.department,

      ciphertext: encrypted.ciphertext,
      nonce: encrypted.nonce,
      tag: encrypted.tag,
      abe_key: encrypted.abe_key
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


// =======================
// GET DETAIL
// =======================
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

    // 🔐 decrypt
    const result = await decryptData(req.user, {
      ciphertext: visit.ciphertext,
      nonce: visit.nonce,
      tag: visit.tag,
      abe_key: visit.abe_key
    });

    if (!result.success) {
      return res.status(403).json({ message: 'Access denied (ABE)' });
    }

    res.json({
      ...visit.toObject(),

      // trả plaintext cho FE
      symptoms: result.data.symptoms,
      diagnosis: result.data.diagnosis,
      treatment: result.data.treatment,
      note: result.data.note
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// =======================
// UPDATE
// =======================
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

    if (visit.doctor_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // 🔐 encrypt lại
    const sensitiveData = {
      symptoms,
      diagnosis,
      treatment,
      note
    };

    const encrypted = await encryptData(
      visit.department,
      sensitiveData
    );

    visit.ciphertext = encrypted.ciphertext;
    visit.nonce = encrypted.nonce;
    visit.tag = encrypted.tag;
    visit.abe_key = encrypted.abe_key;

    await visit.save();

    res.json({
      message: 'Visit record updated'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// =======================
// DELETE
// =======================
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


// =======================
// LIST BY MEDICAL RECORD
// =======================
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

    const results = [];

    const doctor = await User.findById(req.user.id);
   


    for (const visit of visits) {
      const result = await decryptData({
        ...req.user,
        department: doctor.department
      }, {
        ciphertext: visit.ciphertext,
        nonce: visit.nonce,
        tag: visit.tag,
        abe_key: visit.abe_key
      });

      const obj = visit.toObject();

      // ❌ không trả encrypted data
      delete obj.ciphertext;
      delete obj.nonce;
      delete obj.tag;
      delete obj.abe_key;

      if (result.success) {
        results.push({
          ...obj,
          symptoms: result.data.symptoms,
          diagnosis: result.data.diagnosis,
          treatment: result.data.treatment,
          note: result.data.note,
          accessible: true
        });
      } else {
        // 🔥 UX thân thiện
        results.push({
          ...obj,
          symptoms: "Bạn không có quyền xem thông tin khám bệnh theo chính sách bảo mật của bệnh viện",
          diagnosis: null,
          treatment: null,
          note: null,
          accessible: false
        });
      }
    }

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DSA
// =======================
// EXPORT SIGNED PDF
// =======================
const exportVisitRecordPDF = async (req, res) => {
  try {
    const data = req.body;
    console.log("Export PDF data:", req.body);

    if (!data) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 🔥 call service
    const response = await exportSignedPdf(req.user, data);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=benh_an_signed.pdf"
    );

    if (response.body) {
      const stream = Readable.fromWeb(response.body);
      stream.pipe(res);
    } else {
      return res.status(500).json({ message: "Stream error" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Export PDF failed" });
  }
};


module.exports = {
  createVisitRecord,
  getVisitRecordDetail,
  updateVisitRecord,
  deleteVisitRecord,
  getVisitsByMedicalRecord, 
  exportVisitRecordPDF
};