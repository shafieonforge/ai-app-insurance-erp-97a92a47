import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { validateRequest, idSchema } from '../middleware/validation.middleware';
import { uploadSingle, handleUploadError } from '../middleware/upload.middleware';
import { requirePermission } from '../middleware/auth.middleware';
import { customerSchema } from '../schemas/customer.schema';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const customerController = new CustomerController();

// GET /api/customers - List customers with filtering and pagination
router.get('/', 
  requirePermission('read'),
  asyncHandler(customerController.getCustomers.bind(customerController))
);

// GET /api/customers/stats - Get customer statistics
router.get('/stats', 
  requirePermission('read'),
  asyncHandler(customerController.getCustomerStats.bind(customerController))
);

// GET /api/customers/export - Export customers
router.get('/export', 
  requirePermission('read'),
  asyncHandler(customerController.exportCustomers.bind(customerController))
);

// POST /api/customers - Create new customer
router.post('/', 
  requirePermission('write'),
  validateRequest({ body: customerSchema.createSchema }),
  asyncHandler(customerController.createCustomer.bind(customerController))
);

// POST /api/customers/bulk - Bulk operations on customers
router.post('/bulk', 
  requirePermission('write'),
  asyncHandler(customerController.bulkAction.bind(customerController))
);

// GET /api/customers/:id - Get specific customer
router.get('/:id', 
  requirePermission('read'),
  validateRequest({ params: idSchema }),
  asyncHandler(customerController.getCustomer.bind(customerController))
);

// PUT /api/customers/:id - Update customer
router.put('/:id', 
  requirePermission('write'),
  validateRequest({ 
    params: idSchema,
    body: customerSchema.updateSchema 
  }),
  asyncHandler(customerController.updateCustomer.bind(customerController))
);

// DELETE /api/customers/:id - Delete customer
router.delete('/:id', 
  requirePermission('write'),
  validateRequest({ params: idSchema }),
  asyncHandler(customerController.deleteCustomer.bind(customerController))
);

// POST /api/customers/:id/documents - Upload document for customer
router.post('/:id/documents', 
  requirePermission('write'),
  validateRequest({ params: idSchema }),
  uploadSingle('file'),
  handleUploadError,
  asyncHandler(customerController.uploadDocument.bind(customerController))
);

export default router;