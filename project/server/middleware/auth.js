import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import User from '../models/User.js';

// Import the tokenBlacklist from a shared location in production
const tokenBlacklist = new Set();

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createError(401, 'No token provided'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(createError(401, 'Invalid token format'));
    }

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      return next(createError(401, 'Token has been invalidated'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.token = token; // Store token for potential blacklisting
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(createError(401, 'Token has expired'));
    }
    return next(createError(401, 'Invalid token'));
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return next(createError(403, 'Access denied'));
    }
    next();
  } catch (error) {
    next(error);
  }
};