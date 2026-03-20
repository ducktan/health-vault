const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const apiRoutes = require('./routes/api');
// Route kiểm tra server
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server Health Vault (bản JS) đang chạy ngon lành!' });
});
app.use('/api', apiRoutes);
module.exports = app;