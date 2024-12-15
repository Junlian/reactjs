import express from 'express';
import { register, login, logout, validateSession } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../middleware/validators.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.post('/logout', verifyToken, logout);
router.get('/validate', verifyToken, validateSession);

export default router;