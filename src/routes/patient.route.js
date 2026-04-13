const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const {
  createPatient,
  getPatients,
  getPatientDetail,
  updatePatient, 
  linkPatientByCCCD
} = require('../controllers/patient.controller');

// chỉ doctor mới truy cập được
router.post('/', verifyToken, authorize('doctor'), createPatient);
router.get('/', verifyToken, authorize('doctor'), getPatients);
router.get('/:id', verifyToken, authorize('doctor'), getPatientDetail);
router.put('/:id', verifyToken, authorize('doctor'), updatePatient);
router.post('/link-by-cccd', verifyToken, authorize('patient'), linkPatientByCCCD);


module.exports = router;