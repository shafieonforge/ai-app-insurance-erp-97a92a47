"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Building2,
  User,
  DollarSign,
  Shield,
  FileText,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Customer } from '@/lib/types/customer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { formatCurrency, formatDate, formatPhone, getStatusColor } from '@/lib/utils';

export default function CustomerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock customer data for demonstration
  const mockCustomer: Customer = {
    id: customerId,
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
      customerId: customerId,
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
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCustomer(mockCustomer);
      setLoading(false);
    }, 1000);
  }, [customerId]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Not Found</h3>
          <p className="text-gray-600 mb-4">The requested customer could not be found.</p>
          <Button onClick={() => router.push('/customers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/customers')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.displayName}</h1>
            <p className="text-gray-600">{customer.customerNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/customers/${customer.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Customer
          </Button>
        </div>
      </div>

      {/* Customer Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Premium</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(customer.totalPremium)}</div>
            <p className="text-xs text-gray-500">
              Across {customer.activePolicies} policies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.activePolicies}</div>
            <p className="text-xs text-gray-500">
              {customer.totalClaims} total claims
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claim Ratio</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(customer.claimRatio * 100).toFixed(1)}%</div>
            <p className="text-xs text-gray-500">
              Industry avg: 15%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.riskProfile.overallRiskScore}</div>
            <Badge variant={
              customer.riskProfile.riskCategory === 'Low' ? 'success' :
              customer.riskProfile.riskCategory === 'Medium' ? 'warning' : 'error'
            }>
              {customer.riskProfile.riskCategory} Risk
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {customer.type === 'Corporate' ? (
                    <Building2 className="h-5 w-5 mr-2" />
                  ) : (
                    <User className="h-5 w-5 mr-2" />
                  )}
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <p className="text-sm text-gray-900">{customer.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                {customer.type === 'Individual' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">First Name</label>
                        <p className="text-sm text-gray-900">{customer.firstName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Name</label>
                        <p className="text-sm text-gray-900">{customer.lastName}</p>
                      </div>
                    </div>
                    {customer.dateOfBirth && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                        <p className="text-sm text-gray-900">{formatDate(customer.dateOfBirth)}</p>
                      </div>
                    )}
                    {customer.nationality && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nationality</label>
                        <p className="text-sm text-gray-900">{customer.nationality}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Company Name</label>
                      <p className="text-sm text-gray-900">{customer.companyName}</p>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Primary Email</label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-900">{customer.primaryEmail}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Primary Phone</label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-900">{formatPhone(customer.primaryPhone)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Since</label>
                    <p className="text-sm text-gray-900">{formatDate(customer.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-sm text-gray-900">{formatDate(customer.updatedAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KYC & Risk Information */}
            <div className="space-y-6">
              {/* KYC Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    KYC & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">KYC Status</label>
                      <Badge className={getStatusColor(customer.kycStatus)}>
                        {customer.kycStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Portal Access</label>
                      <Badge variant={customer.portalAccess ? 'success' : 'secondary'}>
                        {customer.portalAccess ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </div>
                  
                  {customer.kycCompletedAt && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">KYC Completed</label>
                        <p className="text-sm text-gray-900">{formatDate(customer.kycCompletedAt)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">KYC Expires</label>
                        <p className="text-sm text-gray-900">{customer.kycExpiryDate ? formatDate(customer.kycExpiryDate) : 'N/A'}</p>
                      </div>
                    </div>
                  )}
                  
                  {customer.lastLoginAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Portal Login</label>
                      <p className="text-sm text-gray-900">{formatDate(customer.lastLoginAt)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Risk Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Overall Risk Score</label>
                      <p className="text-2xl font-bold text-gray-900">{customer.riskProfile.overallRiskScore}/100</p>
                    </div>
                    <Badge variant={
                      customer.riskProfile.riskCategory === 'Low' ? 'success' :
                      customer.riskProfile.riskCategory === 'Medium' ? 'warning' : 'error'
                    }>
                      {customer.riskProfile.riskCategory} Risk
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Industry Risk</span>
                      <span>{customer.riskProfile.industryRisk}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${customer.riskProfile.industryRisk}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Financial Risk</span>
                      <span>{customer.riskProfile.financialRisk}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${customer.riskProfile.financialRisk}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label className="text-sm font-medium text-gray-500">Next Review</label>
                    <p className="text-sm text-gray-900">{formatDate(customer.riskProfile.nextReviewDate)}</p>
                  </div>
                  
                  {customer.riskProfile.riskNotes && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Risk Notes</label>
                      <p className="text-sm text-gray-900">{customer.riskProfile.riskNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
                <p className="text-gray-600 mb-4">This customer doesn't have any policies yet</p>
                <Button>Add Policy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
                <p className="text-gray-600">This customer hasn't filed any claims</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No billing records</h3>
                <p className="text-gray-600">Billing information will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No additional contacts</h3>
                <p className="text-gray-600">Add contacts for this customer</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses found</h3>
                <p className="text-gray-600">Add addresses for this customer</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                <p className="text-gray-600">Upload KYC documents and other files</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notes added</h3>
                <p className="text-gray-600">Add internal notes and communications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activity recorded</h3>
                <p className="text-gray-600">Customer activity will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}