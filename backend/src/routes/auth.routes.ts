import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { authSchema } from '../schemas/auth.schema';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const authController = new AuthController();

// POST /api/auth/login - User login
router.post('/login', 
  validateRequest({ body: authSchema.loginSchema }), 
  asyncHandler(authController.login.bind(authController))
);

// POST /api/auth/logout - User logout
router.post('/logout', 
  asyncHandler(authController.logout.bind(authController))
);

// GET /api/auth/me - Get current user info
router.get('/me', 
  authMiddleware, 
  asyncHandler(authController.me.bind(authController))
);

// POST /api/auth/refresh - Refresh token
router.post('/refresh', 
  authMiddleware, 
  asyncHandler(authController.refreshToken.bind(authController))
);

export default router;