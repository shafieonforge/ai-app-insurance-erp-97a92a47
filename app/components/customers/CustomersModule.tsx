'use client';

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Edit,
  Eye,
  Trash2,
  UserPlus,
  UsersIcon,
  ArrowLeft,
  Building2,
  Star,
  Save,
  X
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Individual' | 'Corporate';
  location: string;
  policies: number;
  premiumTotal: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  lastActivity: string;
}

interface CustomerGroup {
  id: string;
  name: string;
  description: string;
  type: 'manual' | 'auto';
  customerCount: number;
  totalPremium: number;
  avgPremium: number;
  createdDate: string;
  criteria?: string;
  tags: string[];
  isActive: boolean;
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    type: 'Individual',
    location: 'New York, NY',
    policies: 3,
    premiumTotal: 4500,
    status: 'Active',
    joinDate: '2023-03-15',
    lastActivity: '2024-01-10'
  },
  {
    id: 'CUST-002',
    name: 'TechCorp Solutions Inc.',
    email: 'admin@techcorp.com',
    phone: '+1 (555) 987-6543',
    type: 'Corporate',
    location: 'San Francisco, CA',
    policies: 12,
    premiumTotal: 45000,
    status: 'Active',
    joinDate: '2022-11-08',
    lastActivity: '2024-01-12'
  },
  {
    id: 'CUST-003',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 456-7890',
    type: 'Individual',
    location: 'Los Angeles, CA',
    policies: 2,
    premiumTotal: 2800,
    status: 'Active',
    joinDate: '2023-07-22',
    lastActivity: '2024-01-08'
  },
  {
    id: 'CUST-004',
    name: 'Global Manufacturing Ltd.',
    email: 'insurance@globalmanuf.com',
    phone: '+1 (555) 234-5678',
    type: 'Corporate',
    location: 'Chicago, IL',
    policies: 8,
    premiumTotal: 28500,
    status: 'Suspended',
    joinDate: '2023-01-30',
    lastActivity: '2023-12-15'
  },
  {
    id: 'CUST-005',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    type: 'Individual',
    location: 'Miami, FL',
    policies: 1,
    premiumTotal: 1200,
    status: 'Inactive',
    joinDate: '2023-09-14',
    lastActivity: '2023-11-20'
  }
];

const mockGroups: CustomerGroup[] = [
  {
    id: 'GRP-001',
    name: 'High-Value Customers',
    description: 'Customers with premium over $10,000 annually',
    type: 'auto',
    customerCount: 143,
    totalPremium: 2350000,
    avgPremium: 16434,
    createdDate: '2024-01-15',
    criteria: 'Annual Premium >= $10,000',
    tags: ['premium', 'vip'],
    isActive: true
  },
  {
    id: 'GRP-002',
    name: 'Corporate Clients',
    description: 'All business insurance customers',
    type: 'auto',
    customerCount: 89,
    totalPremium: 1850000,
    avgPremium: 20787,
    createdDate: '2024-01-12',
    criteria: 'Customer Type = Corporate',
    tags: ['business', 'corporate'],
    isActive: true
  },
  {
    id: 'GRP-003',
    name: 'New York Metro Area',
    description: 'Customers in NY, NJ, CT region',
    type: 'auto',
    customerCount: 256,
    totalPremium: 1200000,
    avgPremium: 4687,
    createdDate: '2024-01-10',
    criteria: 'State IN (NY, NJ, CT)',
    tags: ['geographic', 'metro'],
    isActive: true
  },
  {
    id: 'GRP-004',
    name: 'Young Professionals',
    description: 'Manually curated group of young professionals',
    type: 'manual',
    customerCount: 78,
    totalPremium: 234000,
    avgPremium: 3000,
    createdDate: '2024-01-08',
    tags: ['age-group', 'manual'],
    isActive: true
  }
];

interface CustomersModuleProps {
  currentView: string;
}

export default function CustomersModule({ currentView }: CustomersModuleProps) {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [groups] = useState<CustomerGroup[]>(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');

  // Add New Customer View
  if (currentView === 'customers-new') {
    const [customerType, setCustomerType] = useState<'Individual' | 'Corporate'>('Individual');
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Customer created successfully!');
      setIsSubmitting(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
          <p className="text-gray-600 mt-1">Create a new customer profile</p>
        </div>

        <div className="max-w-2xl">
          {/* Customer Type Selection */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  customerType === 'Individual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setCustomerType('Individual')}
              >
                <Users className="h-8 w-8 mb-3 text-blue-600" />
                <h4 className="text-lg font-semibold mb-2">Individual Customer</h4>
                <p className="text-sm text-gray-600">Personal insurance for individuals</p>
              </button>

              <button
                type="button"
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  customerType === 'Corporate'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setCustomerType('Corporate')}
              >
                <Building2 className="h-8 w-8 mb-3 text-purple-600" />
                <h4 className="text-lg font-semibold mb-2">Corporate Customer</h4>
                <p className="text-sm text-gray-600">Business insurance for companies</p>
              </button>
            </div>
          </div>

          {/* Customer Form */}
          <form onSubmit={handleSubmit}>
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {customerType === 'Individual' ? 'Personal Information' : 'Company Information'}
              </h3>
              
              <div className="space-y-4">
                {customerType === 'Individual' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="input-field w-full"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="input-field w-full"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      className="input-field w-full"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="TechCorp Solutions Inc."
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="input-field w-full"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="input-field w-full"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="input-field w-full"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="input-field w-full"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="input-field w-full"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      className="input-field w-full"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" className="btn-secondary">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Customer...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Customer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Customer Groups View  
  if (currentView === 'customers-groups') {
    const filteredGroups = groups.filter(group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Groups</h1>
            <p className="text-gray-600 mt-1">Organize and segment your customers</p>
          </div>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Groups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{groups.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Groups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {groups.filter(g => g.isActive).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Auto Groups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {groups.filter(g => g.type === 'auto').length}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {groups.reduce((sum, g) => sum + g.customerCount, 0).toLocaleString()}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              className="input-field pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  group.type === 'auto' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {group.type === 'auto' ? 'Auto' : 'Manual'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{group.customerCount}</p>
                  <p className="text-xs text-gray-500">Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">
                    ${(group.totalPremium / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500">Total Premium</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">
                    ${group.avgPremium.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Avg Premium</p>
                </div>
              </div>

              {group.criteria && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Criteria:</p>
                  <p className="text-sm text-gray-700 bg-gray-100 rounded p-2 font-mono">
                    {group.criteria}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {group.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: All Customers View
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage individual and corporate customers</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <UsersIcon className="h-4 w-4 mr-2" />
            Customer Groups
          </button>
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
            </div>
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Corporate Clients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.filter(c => c.type === 'Corporate').length}
              </p>
            </div>
            <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Premium</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${customers.reduce((sum, c) => sum + c.premiumTotal, 0).toLocaleString()}
              </p>
            </div>
            <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="input-field pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        {customer.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.type === 'Corporate' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {customer.policies}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${customer.premiumTotal.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}