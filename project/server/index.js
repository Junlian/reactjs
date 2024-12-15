import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Enhanced Middleware Setup
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Limit payload size

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling
app.use(errorHandler);

// Improved MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  mongoose.connection.close();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});