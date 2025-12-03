import { z } from 'zod';

const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const emailSchema = z.string().email('Please enter a valid email address').min(5).max(100);
const phoneSchema = z.string().regex(phoneRegex, 'Please enter a valid phone number').min(10).max(20);

const baseCustomerSchema = z.object({
  type: z.enum(['Individual', 'Corporate']),
  primaryEmail: emailSchema,
  primaryPhone: phoneSchema,
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  accountManagerId: z.string().optional(),
  portalAccess: z.boolean().default(false),
});

const individualCustomerSchema = baseCustomerSchema.extend({
  type: z.literal('Individual'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  dateOfBirth: z.string().optional(),
  nationality: z.string().min(2).max(50).optional(),
  taxId: z.string().max(50).optional(),
});

const corporateCustomerSchema = baseCustomerSchema.extend({
  type: z.literal('Corporate'),
  companyName: z.string().min(1, 'Company name is required').max(200),
  registrationNumber: z.string().min(1, 'Registration number is required').max(50),
  incorporationDate: z.string().optional(),
  industry: z.string().min(1, 'Industry is required').max(100),
  businessDescription: z.string().max(1000).optional(),
  annualRevenue: z.number().min(0).optional(),
  employeeCount: z.number().min(1).optional(),
  taxId: z.string().min(1, 'Tax ID is required').max(50),
});

export const customerFormSchema = z.discriminatedUnion('type', [
  individualCustomerSchema,
  corporateCustomerSchema,
]);

export const customerContactSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['Primary', 'Secondary', 'Emergency', 'Billing', 'Technical']),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  title: z.string().max(20).optional(),
  designation: z.string().max(100).optional(),
  department: z.string().max(100).optional(),
  email: emailSchema,
  phone: phoneSchema,
  mobile: phoneSchema.optional(),
  extension: z.string().max(10).optional(),
  preferredContactMethod: z.enum(['Email', 'Phone', 'SMS', 'WhatsApp']).default('Email'),
  marketingOptIn: z.boolean().default(false),
  portalAccess: z.boolean().default(false),
  portalRole: z.enum(['Admin', 'User', 'Viewer']).optional(),
  isActive: z.boolean().default(true),
});

export const customerAddressSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['Registered', 'Billing', 'Mailing', 'Risk_Location', 'Branch']),
  label: z.string().max(100).optional(),
  addressLine1: z.string().min(1, 'Address line 1 is required').max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  postalCode: z.string().min(1, 'Postal code is required').max(20),
  country: z.string().min(1, 'Country is required').max(100),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  riskZone: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  floodZone: z.boolean().default(false),
  earthquakeZone: z.boolean().default(false),
  criminalityIndex: z.number().min(0).max(100).optional(),
  isPrimary: z.boolean().default(false),
  isBilling: z.boolean().default(false),
  isMailing: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;
export type CustomerContactFormData = z.infer<typeof customerContactSchema>;
export type CustomerAddressFormData = z.infer<typeof customerAddressSchema>;