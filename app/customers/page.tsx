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
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function CustomersPage() {
  const router = useRouter();
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Individual' | 'Corporate'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive' | 'Suspended'>('All');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || customer.type === filterType;
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600 mt-1">Manage individual and corporate customers</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
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
                <Users className="h-5 w-5 text-purple-600" />
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

        {/* Filters and Search */}
        <div className="card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="input-field pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="input-field"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="All">All Types</option>
                <option value="Individual">Individual</option>
                <option value="Corporate">Corporate</option>
              </select>
              
              <select
                className="input-field"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
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

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of{' '}
            <span className="font-medium">{customers.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary">Previous</button>
            <button className="btn-secondary bg-blue-50 text-blue-600">1</button>
            <button className="btn-secondary">2</button>
            <button className="btn-secondary">3</button>
            <button className="btn-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}