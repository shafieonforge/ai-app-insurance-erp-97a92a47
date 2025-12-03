import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = express.Router();
const authController = new AuthController();

router.post('/login', 
  validateRequest({ body: loginSchema }), 
  authController.login
);

router.post('/register', 
  validateRequest({ body: registerSchema }), 
  authController.register
);

router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;