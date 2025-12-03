'use client';

import { useState } from 'react';
import { 
  Shield, 
  Search, 
  Plus, 
  Filter, 
  Download,
  MoreHorizontal,
  User,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface Policy {
  id: string;
  policyNumber: string;
  customerName: string;
  productType: 'Auto' | 'Home' | 'Life' | 'Health' | 'Commercial' | 'Marine';
  status: 'Active' | 'Expired' | 'Cancelled' | 'Pending' | 'Suspended';
  premium: number;
  sumInsured: number;
  startDate: string;
  endDate: string;
  agent: string;
  createdDate: string;
  renewalDate: string;
  lastModified: string;
}

const mockPolicies: Policy[] = [
  {
    id: 'POL-001',
    policyNumber: 'AUTO-2024-001234',
    customerName: 'Sarah Johnson',
    productType: 'Auto',
    status: 'Active',
    premium: 1200,
    sumInsured: 25000,
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    agent: 'Mike Thompson',
    createdDate: '2024-01-10',
    renewalDate: '2025-01-14',
    lastModified: '2024-01-15'
  },
  {
    id: 'POL-002',
    policyNumber: 'HOME-2024-001567',
    customerName: 'Michael Chen',
    productType: 'Home',
    status: 'Active',
    premium: 2400,
    sumInsured: 350000,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    agent: 'Lisa Rodriguez',
    createdDate: '2024-01-25',
    renewalDate: '2025-01-31',
    lastModified: '2024-02-01'
  },
  {
    id: 'POL-003',
    policyNumber: 'LIFE-2024-001890',
    customerName: 'Emily Rodriguez',
    productType: 'Life',
    status: 'Active',
    premium: 3600,
    sumInsured: 500000,
    startDate: '2024-01-20',
    endDate: '2044-01-19',
    agent: 'David Wilson',
    createdDate: '2024-01-15',
    renewalDate: '2025-01-20',
    lastModified: '2024-01-20'
  },
  {
    id: 'POL-004',
    policyNumber: 'COMM-2024-002123',
    customerName: 'TechCorp Solutions Inc.',
    productType: 'Commercial',
    status: 'Pending',
    premium: 15000,
    sumInsured: 2000000,
    startDate: '2024-02-15',
    endDate: '2025-02-14',
    agent: 'Jennifer Lee',
    createdDate: '2024-02-10',
    renewalDate: '2025-02-14',
    lastModified: '2024-02-12'
  },
  {
    id: 'POL-005',
    policyNumber: 'HEALTH-2024-001456',
    customerName: 'Robert Wilson',
    productType: 'Health',
    status: 'Expired',
    premium: 1800,
    sumInsured: 100000,
    startDate: '2023-03-01',
    endDate: '2024-02-29',
    agent: 'Amanda Garcia',
    createdDate: '2023-02-20',
    renewalDate: '2024-03-01',
    lastModified: '2024-01-15'
  },
  {
    id: 'POL-006',
    policyNumber: 'MARINE-2024-001789',
    customerName: 'Global Shipping Ltd.',
    productType: 'Marine',
    status: 'Active',
    premium: 25000,
    sumInsured: 5000000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    agent: 'Carlos Martinez',
    createdDate: '2023-12-15',
    renewalDate: '2025-01-01',
    lastModified: '2024-01-01'
  }
];

export default function PoliciesPage() {
  const [policies] = useState<Policy[]>(mockPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Auto' | 'Home' | 'Life' | 'Health' | 'Commercial' | 'Marine'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Expired' | 'Cancelled' | 'Pending' | 'Suspended'>('All');

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || policy.productType === filterType;
    const matchesStatus = filterStatus === 'All' || policy.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return CheckCircle;
      case 'Expired':
        return XCircle;
      case 'Cancelled':
        return XCircle;
      case 'Pending':
        return Clock;
      case 'Suspended':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getProductTypeColor = (type: string) => {
    switch (type) {
      case 'Auto':
        return 'bg-blue-100 text-blue-800';
      case 'Home':
        return 'bg-green-100 text-green-800';
      case 'Life':
        return 'bg-purple-100 text-purple-800';
      case 'Health':
        return 'bg-pink-100 text-pink-800';
      case 'Commercial':
        return 'bg-indigo-100 text-indigo-800';
      case 'Marine':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
          <p className="text-gray-600 mt-1">Manage insurance policies and coverage</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Policy
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{policies.length}</p>
            </div>
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {policies.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {policies.filter(p => p.status === 'Pending').length}
              </p>
            </div>
            <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {policies.filter(p => p.status === 'Expired').length}
              </p>
            </div>
            <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Premium</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${policies.reduce((sum, p) => sum + p.premium, 0).toLocaleString()}
              </p>
            </div>
            <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sum Insured</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${(policies.reduce((sum, p) => sum + p.sumInsured, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search policies..."
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
              <option value="All">All Products</option>
              <option value="Auto">Auto</option>
              <option value="Home">Home</option>
              <option value="Life">Life</option>
              <option value="Health">Health</option>
              <option value="Commercial">Commercial</option>
              <option value="Marine">Marine</option>
            </select>
            
            <select
              className="input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>
      </div>

      {/* Policy Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policy Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coverage Period
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
              {filteredPolicies.map((policy) => {
                const StatusIcon = getStatusIcon(policy.status);
                
                return (
                  <tr key={policy.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{policy.policyNumber}</div>
                          <div className="text-sm text-gray-500">Agent: {policy.agent}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        {policy.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(policy.productType)}`}>
                        {policy.productType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">${policy.premium.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          Sum: ${policy.sumInsured.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(policy.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        to {new Date(policy.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-600" title="View Policy">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600" title="Edit Policy">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-green-600" title="Renew Policy">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600" title="Documents">
                          <FileText className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600" title="Cancel Policy">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}