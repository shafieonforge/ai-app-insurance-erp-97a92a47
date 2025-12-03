"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { Customer } from '@/lib/types/customer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatCurrency, formatDate, formatPhone, getStatusColor, getRiskColor } from '@/lib/utils';

export default function CustomerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) {
        throw new Error('Customer not found');
      }
      const data = await response.json();
      setCustomer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customer');
    } finally {
      setLoading(false);
    }
  };

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

  if (error || !customer) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Not Found</h3>
          <p className="text-gray-600 mb-4">{error || 'The requested customer could not be found.'}</p>
          <Button onClick={() => router.push('/customers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  const mockPolicies = [
    {
      id: '1',
      policyNumber: 'POL-2024-001',
      type: 'Auto Insurance',
      status: 'Active',
      premium: 1200,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverageAmount: 50000
    },
    {
      id: '2',
      policyNumber: 'POL-2024-002',
      type: 'Home Insurance',
      status: 'Active',
      premium: 1200,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverageAmount: 250000
    }
  ];

  const mockClaims = [
    {
      id: '1',
      claimNumber: 'CLM-2024-001',
      policyId: '1',
      type: 'Auto Accident',
      status: 'Settled',
      claimAmount: 8500,
      settledAmount: 8000,
      incidentDate: '2024-01-15',
      reportedDate: '2024-01-16'
    }
  ];

  const mockInvoices = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 1200,
      dueDate: '2024-01-31',
      status: 'Paid',
      paidDate: '2024-01-25'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      amount: 1200,
      dueDate: '2024-02-28',
      status: 'Pending',
      paidDate: null
    }
  ];

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
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customer Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Premium</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(customer.totalPremium)}</div>
            <p className="text-xs text-muted-foreground">
              Across {customer.activePolicies} policies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.activePolicies}</div>
            <p className="text-xs text-muted-foreground">
              {customer.totalClaims} total claims
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claim Ratio</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(customer.claimRatio * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Industry avg: 15%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Registration Number</label>
                        <p className="text-sm text-gray-900">{customer.registrationNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Industry</label>
                        <p className="text-sm text-gray-900">{customer.industry}</p>
                      </div>
                    </div>
                    {customer.incorporationDate && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Incorporation Date</label>
                        <p className="text-sm text-gray-900">{formatDate(customer.incorporationDate)}</p>
                      </div>
                    )}
                    {customer.annualRevenue && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Annual Revenue</label>
                          <p className="text-sm text-gray-900">{formatCurrency(customer.annualRevenue)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Employees</label>
                          <p className="text-sm text-gray-900">{customer.employeeCount?.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
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

                {customer.website && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Website</label>
                    <a 
                      href={customer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {customer.website}
                    </a>
                  </div>
                )}

                {customer.taxId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tax ID</label>
                    <p className="text-sm text-gray-900">{customer.taxId}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Since</label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-900">{formatDate(customer.createdAt)}</p>
                    </div>
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
                  
                  {customer.kycNotes && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">KYC Notes</label>
                      <p className="text-sm text-gray-900">{customer.kycNotes}</p>
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
                      <span>Geographic Risk</span>
                      <span>{customer.riskProfile.geographicRisk}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${customer.riskProfile.geographicRisk}%` }}
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
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Claims History Risk</span>
                      <span>{customer.riskProfile.claimsHistoryRisk}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${customer.riskProfile.claimsHistoryRisk}%` }}
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
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Policies</h3>
              <p className="text-gray-600">Active insurance policies for this customer</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Policy
            </Button>
          </div>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.policyNumber}</TableCell>
                    <TableCell>{policy.type}</TableCell>
                    <TableCell>
                      <Badge variant={policy.status === 'Active' ? 'success' : 'secondary'}>
                        {policy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(policy.premium)}</TableCell>
                    <TableCell>{formatCurrency(policy.coverageAmount)}</TableCell>
                    <TableCell>{formatDate(policy.startDate, 'short')} - {formatDate(policy.endDate, 'short')}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Claims</h3>
              <p className="text-gray-600">Insurance claims filed by this customer</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              File Claim
            </Button>
          </div>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Claim Amount</TableHead>
                  <TableHead>Settled Amount</TableHead>
                  <TableHead>Incident Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.claimNumber}</TableCell>
                    <TableCell>{claim.type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        claim.status === 'Settled' ? 'success' : 
                        claim.status === 'Open' ? 'warning' : 'secondary'
                      }>
                        {claim.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(claim.claimAmount)}</TableCell>
                    <TableCell>{claim.settledAmount ? formatCurrency(claim.settledAmount) : '-'}</TableCell>
                    <TableCell>{formatDate(claim.incidentDate, 'short')}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Billing & Invoices</h3>
              <p className="text-gray-600">Payment history and invoices</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate, 'short')}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === 'Paid' ? 'success' : 'warning'}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.paidDate ? formatDate(invoice.paidDate, 'short') : '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Contacts</h3>
              <p className="text-gray-600">Contact persons for this customer</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {contact.firstName} {contact.lastName}
                    </CardTitle>
                    <Badge variant="outline">{contact.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {contact.designation && (
                    <p className="text-sm text-gray-600">{contact.designation}</p>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{contact.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formatPhone(contact.phone)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      {contact.portalAccess && (
                        <Badge variant="success" className="text-xs">Portal</Badge>
                      )}
                      {contact.marketingOptIn && (
                        <Badge variant="secondary" className="text-xs">Marketing</Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Addresses</h3>
              <p className="text-gray-600">Physical addresses for this customer</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {address.label || address.type}
                    </CardTitle>
                    <Badge variant="outline">{address.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.postalCode}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      {address.isPrimary && (
                        <Badge variant="success" className="text-xs">Primary</Badge>
                      )}
                      {address.isBilling && (
                        <Badge variant="secondary" className="text-xs">Billing</Badge>
                      )}
                      {address.isMailing && (
                        <Badge variant="secondary" className="text-xs">Mailing</Badge>
                      )}
                      {address.riskZone && (
                        <Badge variant={
                          address.riskZone === 'Low' ? 'success' :
                          address.riskZone === 'Medium' ? 'warning' : 'error'
                        } className="text-xs">
                          {address.riskZone} Risk
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Documents</h3>
              <p className="text-gray-600">Uploaded documents and files</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {customer.documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                  <p className="text-gray-600 mb-4">Upload KYC documents, agreements, and other files</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload First Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{document.title}</p>
                          <p className="text-sm text-gray-500">{document.category} • {document.type}</p>
                          <p className="text-xs text-gray-400">
                            Uploaded {formatDate(document.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(document.verificationStatus)}>
                          {document.verificationStatus}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Notes & Comments</h3>
              <p className="text-gray-600">Internal notes and customer communications</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {customer.notes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notes added</h3>
                  <p className="text-gray-600 mb-4">Add internal notes, customer communications, and reminders</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Note
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.notes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{note.title}</h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(note.createdAt)} by {note.createdBy}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            note.priority === 'Critical' ? 'error' :
                            note.priority === 'High' ? 'warning' :
                            'secondary'
                          }>
                            {note.priority}
                          </Badge>
                          <Badge variant="outline">{note.type}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                      {note.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {note.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Activity Log</h3>
            <p className="text-gray-600">Complete audit trail of customer changes and interactions</p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {customer.activities.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No activity recorded</h3>
                  <p className="text-gray-600">Customer activity and system changes will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(activity.createdAt)} by {activity.performedByName}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {activity.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}