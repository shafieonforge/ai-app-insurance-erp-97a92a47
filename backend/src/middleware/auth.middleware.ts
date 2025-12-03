import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from header or cookie
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.['auth-token'];

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'insurecore-secret-key') as any;
    
    // Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      permissions: decoded.permissions
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid or expired token'
      });
    }

    return res.status(500).json({
      error: 'Server error',
      message: 'Authentication verification failed'
    });
  }
};

export const requirePermission = (permission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'User not authenticated'
      });
    }

    if (req.user.permissions.includes('all') || req.user.permissions.includes(permission)) {
      return next();
    }

    return res.status(403).json({
      error: 'Insufficient permissions',
      message: `Permission '${permission}' required`
    });
  };
};

export const requireRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'User not authenticated'
      });
    }

    if (req.user.role === role || req.user.role === 'admin') {
      return next();
    }

    return res.status(403).json({
      error: 'Insufficient role',
      message: `Role '${role}' required`
    });
  };
};