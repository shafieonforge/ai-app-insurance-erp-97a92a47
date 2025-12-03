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
  X,
  Save
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

export default function CustomersModule() {
  const [customers, setCustomers] = useState<Customer[]>([
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
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Individual' | 'Corporate'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive' | 'Suspended'>('All');
  
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Individual' as 'Individual' | 'Corporate',
    location: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Suspended'
  });

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

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customer: Customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      type: newCustomer.type,
      location: newCustomer.location,
      policies: 0,
      premiumTotal: 0,
      status: newCustomer.status,
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      type: 'Individual',
      location: '',
      status: 'Active'
    });
    setShowAddForm(false);
    
    // Show success message
    alert('Customer added successfully!');
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
      alert('Customer deleted successfully!');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage individual and corporate customers</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button 
            className="btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  className="input-field w-full"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="input-field w-full"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="input-field w-full"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Type
                </label>
                <select
                  className="input-field w-full"
                  value={newCustomer.type}
                  onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value as 'Individual' | 'Corporate'})}
                >
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  className="input-field w-full"
                  value={newCustomer.location}
                  onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="input-field w-full"
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value as 'Active' | 'Inactive' | 'Suspended'})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                      <button 
                        className="text-gray-400 hover:text-red-600"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
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

      {filteredCustomers.length === 0 && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No customers found matching your criteria</p>
        </div>
      )}

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
  );
}