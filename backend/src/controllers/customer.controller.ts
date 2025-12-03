import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
import { CustomerType, CustomerStatus, ContactType, AddressType } from '@prisma/client';

export class CustomerController {
  private customerService = new CustomerService();

  getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        type,
        status,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const result = await this.customerService.getCustomers({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        type: type as CustomerType,
        status: status as CustomerStatus,
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc'
      });

      res.json({
        success: true,
        data: result.customers,
        pagination: {
          total: result.total,
          pages: Math.ceil(result.total / Number(limit)),
          page: Number(page),
          limit: Number(limit)
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const customer = await this.customerService.getCustomerById(id);

      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      res.json({
        success: true,
        data: customer
      });
    } catch (error) {
      next(error);
    }
  };

  createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData = req.body;
      const customer = await this.customerService.createCustomer(customerData);

      res.status(201).json({
        success: true,
        data: customer,
        message: 'Customer created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const customerData = req.body;
      
      const customer = await this.customerService.updateCustomer(id, customerData);

      res.json({
        success: true,
        data: customer,
        message: 'Customer updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.customerService.deleteCustomer(id);

      res.json({
        success: true,
        message: 'Customer deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Contact management
  getCustomerContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const contacts = await this.customerService.getCustomerContacts(id);

      res.json({
        success: true,
        data: contacts
      });
    } catch (error) {
      next(error);
    }
  };

  addCustomerContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const contactData = req.body;
      
      const contact = await this.customerService.addCustomerContact(id, contactData);

      res.status(201).json({
        success: true,
        data: contact,
        message: 'Contact added successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  updateCustomerContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contactId } = req.params;
      const contactData = req.body;
      
      const contact = await this.customerService.updateCustomerContact(contactId, contactData);

      res.json({
        success: true,
        data: contact,
        message: 'Contact updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCustomerContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contactId } = req.params;
      await this.customerService.deleteCustomerContact(contactId);

      res.json({
        success: true,
        message: 'Contact deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Address management
  getCustomerAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const addresses = await this.customerService.getCustomerAddresses(id);

      res.json({
        success: true,
        data: addresses
      });
    } catch (error) {
      next(error);
    }
  };

  addCustomerAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const addressData = req.body;
      
      const address = await this.customerService.addCustomerAddress(id, addressData);

      res.status(201).json({
        success: true,
        data: address,
        message: 'Address added successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  updateCustomerAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { addressId } = req.params;
      const addressData = req.body;
      
      const address = await this.customerService.updateCustomerAddress(addressId, addressData);

      res.json({
        success: true,
        data: address,
        message: 'Address updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCustomerAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { addressId } = req.params;
      await this.customerService.deleteCustomerAddress(addressId);

      res.json({
        success: true,
        message: 'Address deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Document management
  getCustomerDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const documents = await this.customerService.getCustomerDocuments(id);

      res.json({
        success: true,
        data: documents
      });
    } catch (error) {
      next(error);
    }
  };

  uploadCustomerDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const { type } = req.body;

      if (!file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      const document = await this.customerService.uploadCustomerDocument(id, file, type);

      res.status(201).json({
        success: true,
        data: document,
        message: 'Document uploaded successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCustomerDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { documentId } = req.params;
      await this.customerService.deleteCustomerDocument(documentId);

      res.json({
        success: true,
        message: 'Document deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Bulk operations
  bulkImportCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      const result = await this.customerService.bulkImportCustomers(file);

      res.json({
        success: true,
        data: result,
        message: 'Customers imported successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  bulkExportCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { format = 'csv', filters } = req.body;
      const result = await this.customerService.bulkExportCustomers(format, filters);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=customers.${format}`);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  // Analytics
  getCustomerStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.customerService.getCustomerStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  };

  getCustomerDemographics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const demographics = await this.customerService.getCustomerDemographics();

      res.json({
        success: true,
        data: demographics
      });
    } catch (error) {
      next(error);
    }
  };
}