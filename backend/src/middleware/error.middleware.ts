import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  if (error.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: 'Duplicate entry',
      details: error.meta
    });
  }

  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: 'Record not found'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
};

export default errorHandler;