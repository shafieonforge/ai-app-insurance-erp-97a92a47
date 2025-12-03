import express from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { 
  createCustomerSchema, 
  updateCustomerSchema, 
  customerQuerySchema 
} from '../schemas/customer.schema';
import upload from '../middleware/upload.middleware';

const router = express.Router();
const customerController = new CustomerController();

// Apply authentication to all routes
router.use(authMiddleware);

// Customer CRUD operations
router.get('/', 
  validateRequest({ query: customerQuerySchema }), 
  customerController.getCustomers
);

router.get('/:id', customerController.getCustomerById);

router.post('/', 
  validateRequest({ body: createCustomerSchema }), 
  customerController.createCustomer
);

router.put('/:id', 
  validateRequest({ body: updateCustomerSchema }), 
  customerController.updateCustomer
);

router.delete('/:id', customerController.deleteCustomer);

// Customer contacts
router.get('/:id/contacts', customerController.getCustomerContacts);
router.post('/:id/contacts', customerController.addCustomerContact);
router.put('/:id/contacts/:contactId', customerController.updateCustomerContact);
router.delete('/:id/contacts/:contactId', customerController.deleteCustomerContact);

// Customer addresses
router.get('/:id/addresses', customerController.getCustomerAddresses);
router.post('/:id/addresses', customerController.addCustomerAddress);
router.put('/:id/addresses/:addressId', customerController.updateCustomerAddress);
router.delete('/:id/addresses/:addressId', customerController.deleteCustomerAddress);

// Customer documents
router.get('/:id/documents', customerController.getCustomerDocuments);
router.post('/:id/documents', 
  upload.single('file'), 
  customerController.uploadCustomerDocument
);
router.delete('/:id/documents/:documentId', customerController.deleteCustomerDocument);

// Bulk operations
router.post('/bulk/import', 
  upload.single('file'), 
  customerController.bulkImportCustomers
);

router.post('/bulk/export', customerController.bulkExportCustomers);

// Statistics and analytics
router.get('/stats/overview', customerController.getCustomerStats);
router.get('/stats/demographics', customerController.getCustomerDemographics);

export default router;