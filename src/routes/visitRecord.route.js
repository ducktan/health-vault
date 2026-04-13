const express = require('express');
const router = express.Router();

const visitController = require('../controllers/visitRecord.controller');
const verifyToken = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

router.post(
  '/',
  verifyToken,
  authorize('doctor'),
  visitController.createVisitRecord
);

router.get(
  '/:id',
  verifyToken,
  authorize('doctor', 'patient'),
  visitController.getVisitRecordDetail
);

router.put(
  '/:id',
  verifyToken,
  authorize('doctor'),
  visitController.updateVisitRecord
);

router.delete(
  '/:id',
  verifyToken,
  authorize('doctor'),
  visitController.deleteVisitRecord
);

// 🔥 thêm cái này
router.get(
  '/medical-record/:id',
  verifyToken,
  authorize('doctor', 'patient'),
  visitController.getVisitsByMedicalRecord
);

module.exports = router;