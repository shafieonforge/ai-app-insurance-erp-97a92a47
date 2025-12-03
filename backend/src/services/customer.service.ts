import { v4 as uuidv4 } from 'uuid';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';

export interface Customer {
  id: string;
  customerNumber: string;
  type: 'Individual' | 'Corporate';
  status: 'Active' | 'Inactive' | 'Pending_KYC' | 'Blacklisted' | 'Lead' | 'Prospect';
  
  // Basic Information
  firstName?: string;
  lastName?: string;
  companyName?: string;
  displayName: string;
  
  // Contact Information
  primaryEmail: string;
  primaryPhone: string;
  website?: string;
  
  // Identity & Registration
  taxId?: string;
  registrationNumber?: string;
  incorporationDate?: string;
  dateOfBirth?: string;
  nationality?: string;
  
  // Financial Information
  annualRevenue?: number;
  employeeCount?: number;
  creditRating?: string;
  
  // Risk & Compliance
  riskProfile: RiskProfile;
  kycStatus: 'Pending' | 'In_Review' | 'Verified' | 'Rejected' | 'Expired';
  kycCompletedAt?: string;
  kycExpiryDate?: string;
  kycNotes?: string;
  
  // Business Information
  industry?: string;
  businessDescription?: string;
  
  // Account Management
  accountManagerId?: string;
  accountManagerName?: string;
  
  // Portal Access
  portalAccess: boolean;
  lastLoginAt?: string;
  
  // Metrics
  totalPremium: number;
  activePolicies: number;
  totalClaims: number;
  claimRatio: number;
  
  // Audit Fields
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  
  // Relations
  contacts: CustomerContact[];
  addresses: CustomerAddress[];
  documents: CustomerDocument[];
  notes: CustomerNote[];
  activities: ActivityLog[];
}

export interface RiskProfile {
  id: string;
  customerId: string;
  overallRiskScore: number;
  riskCategory: 'Low' | 'Medium' | 'High' | 'Critical';
  industryRisk: number;
  geographicRisk: number;
  financialRisk: number;
  complianceRisk: number;
  claimsHistoryRisk: number;
  isHighRisk: boolean;
  requiresApproval: boolean;
  blacklisted: boolean;
  underwritingFlags: string[];
  riskNotes: string;
  lastAssessmentDate: string;
  nextReviewDate: string;
  assessedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerContact {
  id: string;
  customerId: string;
  type: 'Primary' | 'Secondary' | 'Emergency' | 'Billing' | 'Technical';
  firstName: string;
  lastName: string;
  title?: string;
  designation?: string;
  department?: string;
  email: string;
  phone: string;
  mobile?: string;
  extension?: string;
  preferredContactMethod: 'Email' | 'Phone' | 'SMS' | 'WhatsApp';
  marketingOptIn: boolean;
  portalAccess: boolean;
  portalRole?: 'Admin' | 'User' | 'Viewer';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  type: 'Registered' | 'Billing' | 'Mailing' | 'Risk_Location' | 'Branch';
  label?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  riskZone?: 'Low' | 'Medium' | 'High' | 'Critical';
  floodZone?: boolean;
  earthquakeZone?: boolean;
  criminalityIndex?: number;
  isPrimary: boolean;
  isBilling: boolean;
  isMailing: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDocument {
  id: string;
  customerId: string;
  category: 'KYC' | 'Identity' | 'Financial' | 'Legal' | 'Risk_Assessment' | 'Agreements' | 'Other';
  type: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  fileUrl: string;
  title: string;
  description?: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  version: number;
  parentDocumentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
}

export interface CustomerNote {
  id: string;
  customerId: string;
  title: string;
  content: string;
  type: 'General' | 'Risk' | 'Compliance' | 'Service' | 'Billing' | 'Claims';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  tags: string[];
  isInternal: boolean;
  visibleToCustomer: boolean;
  attachments: any[];
  mentionedUsers: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface ActivityLog {
  id: string;
  customerId: string;
  action: string;
  description: string;
  category: 'Customer' | 'Contact' | 'Address' | 'Document' | 'KYC' | 'Risk' | 'Portal' | 'System';
  oldValue?: any;
  newValue?: any;
  fieldChanged?: string;
  performedBy: string;
  performedByName: string;
  userRole: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface CustomerFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'Individual' | 'Corporate' | 'All';
  status?: 'Active' | 'Inactive' | 'Pending_KYC' | 'Blacklisted' | 'Lead' | 'Prospect' | 'All';
  kycStatus?: 'Pending' | 'In_Review' | 'Verified' | 'Rejected' | 'Expired' | 'All';
  riskCategory?: 'Low' | 'Medium' | 'High' | 'Critical' | 'All';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  corporateCustomers: number;
  individualCustomers: number;
  pendingKyc: number;
  highRiskCustomers: number;
  totalPremium: number;
  averagePremiumPerCustomer: number;
  newCustomersThisMonth: number;
  churnRate: number;
}

export class CustomerService {
  private customers: Customer[] = [];

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Initialize with sample data
    this.customers = [
      {
        id: '1',
        customerNumber: 'CUST-2024-001',
        type: 'Individual',
        status: 'Active',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        primaryEmail: 'john.doe@email.com',
        primaryPhone: '+1-555-0101',
        dateOfBirth: '1985-03-15',
        nationality: 'United States',
        taxId: '123-45-6789',
        riskProfile: {
          id: '1',
          customerId: '1',
          overallRiskScore: 25,
          riskCategory: 'Low',
          industryRisk: 20,
          geographicRisk: 30,
          financialRisk: 25,
          complianceRisk: 20,
          claimsHistoryRisk: 30,
          isHighRisk: false,
          requiresApproval: false,
          blacklisted: false,
          underwritingFlags: [],
          riskNotes: 'Low risk individual with good credit history',
          lastAssessmentDate: '2024-01-15T10:00:00Z',
          nextReviewDate: '2025-01-15T10:00:00Z',
          assessedBy: 'system',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        kycStatus: 'Verified',
        kycCompletedAt: '2024-01-15T10:00:00Z',
        kycExpiryDate: '2027-01-15',
        accountManagerId: 'am-001',
        accountManagerName: 'Sarah Johnson',
        portalAccess: true,
        lastLoginAt: '2024-01-20T09:30:00Z',
        totalPremium: 2400,
        activePolicies: 2,
        totalClaims: 1,
        claimRatio: 0.05,
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-20T09:30:00Z',
        createdBy: 'admin',
        updatedBy: 'admin',
        contacts: [],
        addresses: [],
        documents: [],
        notes: [],
        activities: []
      },
      {
        id: '2',
        customerNumber: 'CUST-2024-002',
        type: 'Corporate',
        status: 'Active',
        companyName: 'TechCorp Solutions Inc.',
        displayName: 'TechCorp Solutions Inc.',
        primaryEmail: 'admin@techcorp.com',
        primaryPhone: '+1-555-0202',
        website: 'https://www.techcorp.com',
        registrationNumber: 'TC-2020-12345',
        incorporationDate: '2020-05-15',
        industry: 'Information Technology',
        businessDescription: 'Software development and IT consulting services',
        annualRevenue: 5000000,
        employeeCount: 50,
        taxId: '12-3456789',
        riskProfile: {
          id: '2',
          customerId: '2',
          overallRiskScore: 35,
          riskCategory: 'Medium',
          industryRisk: 40,
          geographicRisk: 30,
          financialRisk: 35,
          complianceRisk: 30,
          claimsHistoryRisk: 40,
          isHighRisk: false,
          requiresApproval: false,
          blacklisted: false,
          underwritingFlags: ['tech-company'],
          riskNotes: 'Technology company with moderate risk profile',
          lastAssessmentDate: '2024-01-15T10:00:00Z',
          nextReviewDate: '2025-01-15T10:00:00Z',
          assessedBy: 'underwriter-001',
          createdAt: '2024-01-12T10:00:00Z',
          updatedAt: '2024-01-15T14:30:00Z'
        },
        kycStatus: 'Verified',
        kycCompletedAt: '2024-01-16T11:00:00Z',
        kycExpiryDate: '2027-01-16',
        accountManagerId: 'am-002',
        accountManagerName: 'Michael Chen',
        portalAccess: true,
        lastLoginAt: '2024-01-21T15:45:00Z',
        totalPremium: 25000,
        activePolicies: 5,
        totalClaims: 2,
        claimRatio: 0.08,
        createdAt: '2024-01-12T09:00:00Z',
        updatedAt: '2024-01-21T15:45:00Z',
        createdBy: 'admin',
        updatedBy: 'admin',
        contacts: [],
        addresses: [],
        documents: [],
        notes: [],
        activities: []
      }
    ];
  }

  async getCustomers(filters: CustomerFilters) {
    let filteredCustomers = [...this.customers];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(customer => {
        return (
          customer.displayName.toLowerCase().includes(searchTerm) ||
          customer.primaryEmail.toLowerCase().includes(searchTerm) ||
          customer.customerNumber.toLowerCase().includes(searchTerm) ||
          customer.primaryPhone.includes(searchTerm)
        );
      });
    }

    if (filters.type && filters.type !== 'All') {
      filteredCustomers = filteredCustomers.filter(customer => customer.type === filters.type);
    }

    if (filters.status && filters.status !== 'All') {
      filteredCustomers = filteredCustomers.filter(customer => customer.status === filters.status);
    }

    if (filters.kycStatus && filters.kycStatus !== 'All') {
      filteredCustomers = filteredCustomers.filter(customer => customer.kycStatus === filters.kycStatus);
    }

    if (filters.riskCategory && filters.riskCategory !== 'All') {
      filteredCustomers = filteredCustomers.filter(customer => customer.riskProfile.riskCategory === filters.riskCategory);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredCustomers.sort((a, b) => {
        let aValue: any = a[filters.sortBy as keyof Customer];
        let bValue: any = b[filters.sortBy as keyof Customer];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return filters.sortOrder === 'asc' ? comparison : -comparison;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return filters.sortOrder === 'asc' 
            ? aValue.getTime() - bValue.getTime() 
            : bValue.getTime() - aValue.getTime();
        }

        return 0;
      });
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const total = filteredCustomers.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedCustomers = filteredCustomers.slice(offset, offset + limit);

    return {
      customers: paginatedCustomers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      filters,
    };
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return this.customers.find(customer => customer.id === id) || null;
  }

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const newCustomer: Customer = {
      id: uuidv4(),
      customerNumber: `CUST-${new Date().getFullYear()}-${(this.customers.length + 1).toString().padStart(3, '0')}`,
      type: customerData.type || 'Individual',
      status: 'Pending_KYC',
      displayName: customerData.type === 'Individual' 
        ? `${customerData.firstName} ${customerData.lastName}` 
        : customerData.companyName || '',
      primaryEmail: customerData.primaryEmail || '',
      primaryPhone: customerData.primaryPhone || '',
      website: customerData.website,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      companyName: customerData.companyName,
      taxId: customerData.taxId,
      registrationNumber: customerData.registrationNumber,
      incorporationDate: customerData.incorporationDate,
      dateOfBirth: customerData.dateOfBirth,
      nationality: customerData.nationality,
      annualRevenue: customerData.annualRevenue,
      employeeCount: customerData.employeeCount,
      industry: customerData.industry,
      businessDescription: customerData.businessDescription,
      riskProfile: {
        id: uuidv4(),
        customerId: '',
        overallRiskScore: 30,
        riskCategory: 'Medium',
        industryRisk: 30,
        geographicRisk: 30,
        financialRisk: 30,
        complianceRisk: 30,
        claimsHistoryRisk: 30,
        isHighRisk: false,
        requiresApproval: false,
        blacklisted: false,
        underwritingFlags: [],
        riskNotes: 'Initial risk assessment pending',
        lastAssessmentDate: new Date().toISOString(),
        nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        assessedBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      kycStatus: 'Pending',
      kycCompletedAt: undefined,
      kycExpiryDate: undefined,
      kycNotes: undefined,
      accountManagerId: customerData.accountManagerId,
      accountManagerName: customerData.accountManagerName,
      portalAccess: customerData.portalAccess || false,
      lastLoginAt: undefined,
      totalPremium: 0,
      activePolicies: 0,
      totalClaims: 0,
      claimRatio: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: customerData.createdBy || 'system',
      updatedBy: customerData.updatedBy || 'system',
      contacts: customerData.contacts || [],
      addresses: customerData.addresses || [],
      documents: [],
      notes: [],
      activities: []
    };

    // Set the customerId in riskProfile
    newCustomer.riskProfile.customerId = newCustomer.id;

    this.customers.push(newCustomer);
    return newCustomer;
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    
    if (customerIndex === -1) {
      return null;
    }

    // Update display name if relevant fields changed
    if (updates.firstName || updates.lastName || updates.companyName) {
      const customer = this.customers[customerIndex];
      updates.displayName = customer.type === 'Individual' 
        ? `${updates.firstName || customer.firstName} ${updates.lastName || customer.lastName}`
        : updates.companyName || customer.companyName;
    }

    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.customers[customerIndex];
  }

  async deleteCustomer(id: string, deletedBy: string): Promise<boolean> {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    
    if (customerIndex === -1) {
      return false;
    }

    // Soft delete by changing status
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      status: 'Inactive',
      updatedAt: new Date().toISOString(),
      updatedBy: deletedBy
    };

    return true;
  }

  async getCustomerStats(): Promise<CustomerStats> {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalCustomers = this.customers.length;
    const activeCustomers = this.customers.filter(c => c.status === 'Active').length;
    const inactiveCustomers = this.customers.filter(c => c.status === 'Inactive').length;
    const corporateCustomers = this.customers.filter(c => c.type === 'Corporate').length;
    const individualCustomers = this.customers.filter(c => c.type === 'Individual').length;
    const pendingKyc = this.customers.filter(c => c.kycStatus === 'Pending').length;
    const highRiskCustomers = this.customers.filter(c => 
      c.riskProfile.riskCategory === 'High' || c.riskProfile.riskCategory === 'Critical'
    ).length;
    const totalPremium = this.customers.reduce((sum, c) => sum + c.totalPremium, 0);
    const averagePremiumPerCustomer = totalCustomers > 0 ? totalPremium / totalCustomers : 0;
    const newCustomersThisMonth = this.customers.filter(c => 
      new Date(c.createdAt) >= thisMonth
    ).length;

    return {
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
      corporateCustomers,
      individualCustomers,
      pendingKyc,
      highRiskCustomers,
      totalPremium,
      averagePremiumPerCustomer,
      newCustomersThisMonth,
      churnRate: 2.3 // Mock value
    };
  }

  async bulkAction(action: string, customerIds: string[], performedBy: string, parameters?: any) {
    let processedCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const customerId of customerIds) {
      try {
        switch (action) {
          case 'activate':
            await this.updateCustomer(customerId, { status: 'Active', updatedBy: performedBy });
            break;
          case 'deactivate':
            await this.updateCustomer(customerId, { status: 'Inactive', updatedBy: performedBy });
            break;
          case 'delete':
            await this.deleteCustomer(customerId, performedBy);
            break;
          default:
            throw new Error(`Unknown action: ${action}`);
        }
        processedCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Error processing customer ${customerId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return {
      processedCount,
      errorCount,
      errors
    };
  }

  async exportCustomers(format: string, filters?: any): Promise<string> {
    const customers = await this.getCustomers(filters || {});
    
    if (format === 'csv') {
      const csvData = customers.customers.map(customer => ({
        'Customer Number': customer.customerNumber,
        'Name': customer.displayName,
        'Type': customer.type,
        'Email': customer.primaryEmail,
        'Phone': customer.primaryPhone,
        'Status': customer.status,
        'KYC Status': customer.kycStatus,
        'Risk Category': customer.riskProfile.riskCategory,
        'Total Premium': customer.totalPremium,
        'Active Policies': customer.activePolicies,
        'Created Date': customer.createdAt
      }));

      // Convert to CSV string
      const headers = Object.keys(csvData[0] || {});
      const csvRows = [
        headers.join(','),
        ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row] || ''}"`).join(','))
      ];

      return csvRows.join('\n');
    }

    // For Excel format, return CSV for now (would need xlsx library for proper Excel)
    return await this.exportCustomers('csv', filters);
  }

  async uploadDocument(customerId: string, documentData: any): Promise<CustomerDocument> {
    const customer = await this.getCustomerById(customerId);
    
    if (!customer) {
      throw new Error('Customer not found');
    }

    const newDocument: CustomerDocument = {
      id: uuidv4(),
      customerId,
      ...documentData,
      verificationStatus: 'Pending' as const,
      version: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    customer.documents.push(newDocument);
    return newDocument;
  }
}