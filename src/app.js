const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.user.route');
const patientRoutes = require('./routes/patient.route');
const medicalRecordRoutes = require('./routes/medicalRecord.route');
const visitRecordRoutes = require('./routes/visitRecord.route');
const sanitize = require("mongo-sanitize");

const sanitizeMiddleware = (req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  next();
};




app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(sanitizeMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/medical', medicalRecordRoutes);
app.use('/api/visit', visitRecordRoutes);

module.exports = app;