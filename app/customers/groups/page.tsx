'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  UserPlus,
  Building2,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  },
  {
    id: 'GRP-005',
    name: 'At-Risk Customers',
    description: 'Customers with multiple claims or payment issues',
    type: 'auto',
    customerCount: 34,
    totalPremium: 125000,
    avgPremium: 3676,
    createdDate: '2024-01-05',
    criteria: 'Claims Count >= 3 OR Payment Delays >= 2',
    tags: ['risk', 'attention'],
    isActive: false
  }
];

export default function CustomerGroupsPage() {
  const router = useRouter();
  const [groups] = useState<CustomerGroup[]>(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'manual' | 'auto'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || group.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && group.isActive) ||
                         (filterStatus === 'inactive' && !group.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    return type === 'auto' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/customers')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Groups</h1>
            <p className="text-gray-600 mt-1">Organize and segment your customers</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </button>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <Users className="h-4 w-4 mr-2" />
              Bulk Actions
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Groups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{groups.length}</p>
              </div>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
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
              <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-green-600" />
              </div>
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
              <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
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
              <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-yellow-600" />
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
                  placeholder="Search groups..."
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
                <option value="all">All Types</option>
                <option value="auto">Auto Groups</option>
                <option value="manual">Manual Groups</option>
              </select>
              
              <select
                className="input-field"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{group.description}</p>

              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(group.type)}`}>
                  {group.type === 'auto' ? 'Auto' : 'Manual'}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.isActive)}`}>
                  {group.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {group.criteria && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Criteria:</p>
                  <p className="text-sm text-gray-700 bg-gray-100 rounded p-2 font-mono">
                    {group.criteria}
                  </p>
                </div>
              )}

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

              <div className="flex flex-wrap gap-1 mb-4">
                {group.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Created: {new Date(group.createdDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 btn-secondary text-sm py-2">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </button>
                <button className="flex-1 btn-secondary text-sm py-2">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 p-2">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No customer groups found matching your criteria</p>
            <button className="btn-primary mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}