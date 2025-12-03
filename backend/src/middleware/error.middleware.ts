import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error details
  console.error(`[${new Date().toISOString()}] Error ${statusCode}:`, {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Prepare error response
  const errorResponse: any = {
    error: true,
    message: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  };

  // Include stack trace in development
  if (!isProduction && error.stack) {
    errorResponse.stack = error.stack;
  }

  // Handle specific error types
  if (error.name === 'ValidationError') {
    errorResponse.statusCode = 400;
    errorResponse.type = 'Validation Error';
  } else if (error.name === 'UnauthorizedError') {
    errorResponse.statusCode = 401;
    errorResponse.type = 'Authentication Error';
  } else if (error.name === 'ForbiddenError') {
    errorResponse.statusCode = 403;
    errorResponse.type = 'Authorization Error';
  } else if (error.name === 'NotFoundError') {
    errorResponse.statusCode = 404;
    errorResponse.type = 'Not Found Error';
  }

  res.status(statusCode).json(errorResponse);
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = createError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};