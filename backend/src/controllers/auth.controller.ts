import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginSchema = z.object({
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        rememberMe: z.boolean().optional().default(false)
      });

      const { email, password, rememberMe } = loginSchema.parse(req.body);

      // Demo authentication - replace with real user lookup
      const validCredentials = [
        {
          id: '1',
          email: 'admin@insurecore.com',
          password: 'admin123',
          role: 'admin',
          name: 'System Administrator',
          permissions: ['all']
        },
        {
          id: '2',
          email: 'demo@insurecore.com',
          password: 'demo123',
          role: 'user',
          name: 'Demo User',
          permissions: ['read', 'write']
        }
      ];

      const user = validCredentials.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user || user.password !== password) {
        return res.status(401).json({
          error: 'Authentication failed',
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      };

      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || 'insurecore-secret-key',
        { 
          expiresIn: rememberMe ? '30d' : '24h',
          issuer: 'insurecore-api',
          audience: 'insurecore-frontend'
        }
      );

      // Set secure HTTP-only cookie
      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 30 days or 24 hours
      });

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions
        },
        token // Also return token for frontend storage if needed
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors
        });
      }
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Clear the auth cookie
      res.clearCookie('auth-token');
      
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      // The user is already attached to req by authMiddleware
      const user = (req as any).user;
      
      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          permissions: user.permissions
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      
      // Generate new token
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      };

      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || 'insurecore-secret-key',
        { 
          expiresIn: '24h',
          issuer: 'insurecore-api',
          audience: 'insurecore-frontend'
        }
      );

      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({
        success: true,
        message: 'Token refreshed successfully',
        token
      });
    } catch (error) {
      next(error);
    }
  }
}