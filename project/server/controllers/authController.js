import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../utils/error.js';
import { validationResult } from 'express-validator';

// Token blacklist (in memory - should use Redis in production)
const tokenBlacklist = new Set();

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const sanitizeUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    addresses: user.addresses,
  };
};

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role = 'customer' } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, 'Email already registered'));
    }
    
    const user = new User({
      email,
      password,
      name,
      role,
    });
    
    await user.save();
    
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return next(createError(401, 'Invalid credentials'));
    }
    
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    const token = generateToken(user._id);
    
    res.json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      tokenBlacklist.add(token);
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
};

export const validateSession = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session'
      });
    }

    res.json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Session validation failed'
    });
  }
};