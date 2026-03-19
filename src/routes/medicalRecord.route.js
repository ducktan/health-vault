const express = require('express');
const router = express.Router();

const medicalRecordController = require('../controllers/medicalRecord.controller');
const visitController = require('../controllers/visitRecord.controller');
const verifyToken = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

router.post('/', verifyToken, authorize('doctor'), medicalRecordController.createMedicalRecord);

router.get('/', verifyToken, authorize('doctor'), medicalRecordController.getMedicalRecords);

router.get('/:id', verifyToken, authorize('doctor', 'patient'), medicalRecordController.getMedicalRecordDetail);

router.delete('/:id', verifyToken, authorize('admin'), medicalRecordController.deleteMedicalRecord);

router.get('/:id/visits', verifyToken, authorize('doctor', 'patient'), visitController.getVisitsByMedicalRecord);

module.exports = router;