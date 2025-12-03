import { NextRequest, NextResponse } from 'next/server';
import { customerFiltersSchema, paginationSchema, customerFormSchema } from '@/lib/validations/customer';
import { Customer, CustomersResponse, CustomerStats } from '@/lib/types/customer';

// Mock database - In production, replace with actual database
let customers: Customer[] = [
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
    contacts: [
      {
        id: '1',
        customerId: '1',
        type: 'Primary',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1-555-0101',
        preferredContactMethod: 'Email',
        marketingOptIn: true,
        portalAccess: true,
        isActive: true,
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-10T08:00:00Z'
      }
    ],
    addresses: [
      {
        id: '1',
        customerId: '1',
        type: 'Registered',
        addressLine1: '123 Main Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
        riskZone: 'Low',
        floodZone: false,
        earthquakeZone: false,
        isPrimary: true,
        isBilling: true,
        isMailing: true,
        isActive: true,
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-10T08:00:00Z'
      }
    ],
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
    contacts: [
      {
        id: '2',
        customerId: '2',
        type: 'Primary',
        firstName: 'Robert',
        lastName: 'Smith',
        title: 'Mr',
        designation: 'CEO',
        department: 'Executive',
        email: 'robert.smith@techcorp.com',
        phone: '+1-555-0203',
        preferredContactMethod: 'Email',
        marketingOptIn: false,
        portalAccess: true,
        portalRole: 'Admin',
        isActive: true,
        createdAt: '2024-01-12T09:00:00Z',
        updatedAt: '2024-01-12T09:00:00Z'
      }
    ],
    addresses: [
      {
        id: '2',
        customerId: '2',
        type: 'Registered',
        label: 'Head Office',
        addressLine1: '456 Tech Park Avenue',
        addressLine2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States',
        riskZone: 'Medium',
        floodZone: false,
        earthquakeZone: true,
        isPrimary: true,
        isBilling: true,
        isMailing: true,
        isActive: true,
        createdAt: '2024-01-12T09:00:00Z',
        updatedAt: '2024-01-12T09:00:00Z'
      }
    ],
    documents: [],
    notes: [],
    activities: []
  }
];

// GET /api/customers - List customers with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const filters = customerFiltersSchema.parse({
      search: searchParams.get('search') || undefined,
      type: searchParams.get('type') || 'All',
      status: searchParams.get('status') || 'All',
      kycStatus: searchParams.get('kycStatus') || 'All',
      riskCategory: searchParams.get('riskCategory') || 'All',
      accountManager: searchParams.get('accountManager') || undefined,
      industry: searchParams.get('industry') || undefined,
      createdDateFrom: searchParams.get('createdDateFrom') || undefined,
      createdDateTo: searchParams.get('createdDateTo') || undefined,
    });

    const pagination = paginationSchema.parse({
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
    });

    // Apply filters
    let filteredCustomers = customers.filter(customer => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableFields = [
          customer.displayName,
          customer.primaryEmail,
          customer.primaryPhone,
          customer.customerNumber,
          customer.companyName || '',
          customer.firstName || '',
          customer.lastName || ''
        ];
        
        const matches = searchableFields.some(field => 
          field.toLowerCase().includes(searchTerm)
        );
        
        if (!matches) return false;
      }

      // Type filter
      if (filters.type !== 'All' && customer.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status !== 'All' && customer.status !== filters.status) {
        return false;
      }

      // KYC Status filter
      if (filters.kycStatus !== 'All' && customer.kycStatus !== filters.kycStatus) {
        return false;
      }

      // Risk Category filter
      if (filters.riskCategory !== 'All' && customer.riskProfile.riskCategory !== filters.riskCategory) {
        return false;
      }

      // Account Manager filter
      if (filters.accountManager && customer.accountManagerId !== filters.accountManager) {
        return false;
      }

      // Industry filter
      if (filters.industry && customer.type === 'Corporate' && customer.industry !== filters.industry) {
        return false;
      }

      // Date filters
      if (filters.createdDateFrom) {
        const createdDate = new Date(customer.createdAt);
        const fromDate = new Date(filters.createdDateFrom);
        if (createdDate < fromDate) return false;
      }

      if (filters.createdDateTo) {
        const createdDate = new Date(customer.createdAt);
        const toDate = new Date(filters.createdDateTo);
        toDate.setHours(23, 59, 59, 999);
        if (createdDate > toDate) return false;
      }

      return true;
    });

    // Apply sorting
    filteredCustomers.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (pagination.sortBy) {
        case 'displayName':
          aValue = a.displayName;
          bValue = b.displayName;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case 'totalPremium':
          aValue = a.totalPremium;
          bValue = b.totalPremium;
          break;
        default:
          aValue = a.customerNumber;
          bValue = b.customerNumber;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return pagination.sortOrder === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return pagination.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return pagination.sortOrder === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });

    // Apply pagination
    const total = filteredCustomers.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const offset = (pagination.page - 1) * pagination.limit;
    const paginatedCustomers = filteredCustomers.slice(offset, offset + pagination.limit);

    const response: CustomersResponse = {
      customers: paginatedCustomers,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
      filters,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

// POST /api/customers - Create a new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = customerFormSchema.parse(body);
    
    const newCustomer: Customer = {
      id: (customers.length + 1).toString(),
      customerNumber: `CUST-2024-${(customers.length + 1).toString().padStart(3, '0')}`,
      ...validatedData,
      displayName: validatedData.type === 'Individual' 
        ? `${validatedData.firstName} ${validatedData.lastName}` 
        : validatedData.companyName!,
      status: 'Pending_KYC',
      riskProfile: {
        id: (customers.length + 1).toString(),
        customerId: (customers.length + 1).toString(),
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
      totalPremium: 0,
      activePolicies: 0,
      totalClaims: 0,
      claimRatio: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
      updatedBy: 'current-user',
      contacts: body.contacts || [],
      addresses: body.addresses || [],
      documents: [],
      notes: [],
      activities: []
    };

    customers.push(newCustomer);

    return NextResponse.json(newCustomer, { status: 201 });

  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}