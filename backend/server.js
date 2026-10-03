const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const { requestLogger, errorHandler } = require('./middleware/middleware');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_freelancing_platform';

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Root Health/Welcome API
app.get('/', (req, res) => {
  res.json({
    message: 'Student Freelancing Platform API is running'
  });
});

// Register API Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB: student_freelancing_platform');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
