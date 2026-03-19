const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.user.route');
const patientRoutes = require('./routes/patient.route');
const medicalRecordRoutes = require('./routes/medicalRecord.route');
const visitRecordRoutes = require('./routes/visitRecord.route');


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/medical', medicalRecordRoutes);
app.use('/api/visit', visitRecordRoutes);

module.exports = app;