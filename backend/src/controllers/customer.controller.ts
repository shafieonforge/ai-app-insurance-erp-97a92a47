import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CustomerService } from '../services/customer.service';
import { customerSchema, customerFiltersSchema } from '../schemas/customer.schema';

const customerService = new CustomerService();

export class CustomerController {
  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const filtersSchema = z.object({
        page: z.string().optional().transform(val => val ? parseInt(val) : 1),
        limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
        search: z.string().optional(),
        type: z.enum(['Individual', 'Corporate', 'All']).optional().default('All'),
        status: z.enum(['Active', 'Inactive', 'Pending_KYC', 'Blacklisted', 'Lead', 'Prospect', 'All']).optional().default('All'),
        kycStatus: z.enum(['Pending', 'In_Review', 'Verified', 'Rejected', 'Expired', 'All']).optional().default('All'),
        riskCategory: z.enum(['Low', 'Medium', 'High', 'Critical', 'All']).optional().default('All'),
        sortBy: z.string().optional().default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
      });

      const filters = filtersSchema.parse(req.query);
      const result = await customerService.getCustomers(filters);

      res.json({
        success: true,
        data: result
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Invalid query parameters',
          details: error.errors
        });
      }
      next(error);
    }
  }

  async getCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await customerService.getCustomerById(id);

      if (!customer) {
        return res.status(404).json({
          error: 'Customer not found',
          message: `Customer with ID ${id} does not exist`
        });
      }

      res.json({
        success: true,
        data: customer
      });

    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = customerSchema.parse(req.body);
      const user = (req as any).user;

      const customer = await customerService.createCustomer({
        ...validatedData,
        createdBy: user.id,
        updatedBy: user.id
      });

      res.status(201).json({
        success: true,
        message: 'Customer created successfully',
        data: customer
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

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = customerSchema.partial().parse(req.body);
      const user = (req as any).user;

      const customer = await customerService.updateCustomer(id, {
        ...validatedData,
        updatedBy: user.id
      });

      if (!customer) {
        return res.status(404).json({
          error: 'Customer not found',
          message: `Customer with ID ${id} does not exist`
        });
      }

      res.json({
        success: true,
        message: 'Customer updated successfully',
        data: customer
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

  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = (req as any).user;

      const success = await customerService.deleteCustomer(id, user.id);

      if (!success) {
        return res.status(404).json({
          error: 'Customer not found',
          message: `Customer with ID ${id} does not exist`
        });
      }

      res.json({
        success: true,
        message: 'Customer deleted successfully'
      });

    } catch (error) {
      next(error);
    }
  }

  async getCustomerStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await customerService.getCustomerStats();

      res.json({
        success: true,
        data: stats
      });

    } catch (error) {
      next(error);
    }
  }

  async bulkAction(req: Request, res: Response, next: NextFunction) {
    try {
      const bulkSchema = z.object({
        action: z.enum(['activate', 'deactivate', 'delete', 'export']),
        customerIds: z.array(z.string()).min(1, 'At least one customer ID is required'),
        parameters: z.record(z.any()).optional()
      });

      const { action, customerIds, parameters } = bulkSchema.parse(req.body);
      const user = (req as any).user;

      const result = await customerService.bulkAction(action, customerIds, user.id, parameters);

      res.json({
        success: true,
        message: `Bulk ${action} completed`,
        data: result
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

  async exportCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const exportSchema = z.object({
        format: z.enum(['csv', 'excel']).default('csv'),
        filters: z.record(z.any()).optional()
      });

      const { format, filters } = exportSchema.parse(req.query);
      const result = await customerService.exportCustomers(format, filters);

      res.setHeader('Content-Type', format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="customers.${format}"`);
      res.send(result);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Invalid export parameters',
          details: error.errors
        });
      }
      next(error);
    }
  }

  async uploadDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          error: 'No file uploaded',
          message: 'Please select a file to upload'
        });
      }

      const documentSchema = z.object({
        category: z.enum(['KYC', 'Identity', 'Financial', 'Legal', 'Risk_Assessment', 'Agreements', 'Other']),
        type: z.string().min(1, 'Document type is required'),
        title: z.string().min(1, 'Document title is required'),
        description: z.string().optional()
      });

      const documentData = documentSchema.parse(req.body);
      const user = (req as any).user;

      const document = await customerService.uploadDocument(customerId, {
        ...documentData,
        fileName: file.filename,
        originalName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        fileUrl: `/uploads/${file.filename}`,
        uploadedBy: user.id
      });

      res.status(201).json({
        success: true,
        message: 'Document uploaded successfully',
        data: document
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
}