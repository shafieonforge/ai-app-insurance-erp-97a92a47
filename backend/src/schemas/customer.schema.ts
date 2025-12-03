import { z } from 'zod';

export const createCustomerSchema = z.object({
  type: z.enum(['INDIVIDUAL', 'CORPORATE']),
  legalName: z.string().min(1, 'Legal name is required'),
  displayName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  occupation: z.string().optional(),
  businessType: z.string().optional(),
  industry: z.string().optional(),
  registrationNumber: z.string().optional(),
  employeesCount: z.number().optional(),
  contacts: z.array(z.object({
    type: z.enum(['EMAIL', 'PHONE', 'MOBILE', 'FAX']),
    value: z.string().min(1, 'Contact value is required'),
    isPrimary: z.boolean().optional()
  })).optional(),
  addresses: z.array(z.object({
    type: z.enum(['HOME', 'BUSINESS', 'MAILING', 'BILLING']),
    addressLine1: z.string().min(1, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    isPrimary: z.boolean().optional()
  })).optional()
});

export const updateCustomerSchema = createCustomerSchema.partial();

export const customerQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  type: z.enum(['INDIVIDUAL', 'CORPORATE']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED']).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});