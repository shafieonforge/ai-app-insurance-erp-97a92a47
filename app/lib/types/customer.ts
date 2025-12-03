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
  creditRating?: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C' | 'D';
  
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
  attachments: NoteAttachment[];
  mentionedUsers: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface NoteAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
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

export interface CustomersResponse {
  customers: Customer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: CustomerFilters;
}

export interface CustomerFilters {
  search?: string;
  type?: 'Individual' | 'Corporate' | 'All';
  status?: Customer['status'] | 'All';
  kycStatus?: Customer['kycStatus'] | 'All';
  riskCategory?: 'Low' | 'Medium' | 'High' | 'Critical' | 'All';
  accountManager?: string;
  industry?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  lastActivityFrom?: string;
  lastActivityTo?: string;
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