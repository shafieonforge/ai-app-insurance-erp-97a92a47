'use client';

import { useState, useEffect } from 'react';
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
  Building2,
  Star,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Bell
} from 'lucide-react';

// Global state to persist customers across navigation
let globalCustomers: Customer[] = [
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
];

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
  }
];

interface CustomersModuleProps {
  currentView: string;
}

export default function CustomersModule({ currentView }: CustomersModuleProps) {
  // ALL HOOKS MUST BE DECLARED AT THE TOP - NO CONDITIONALS BEFORE THESE!
  const [customers, setCustomers] = useState<Customer[]>(globalCustomers);
  const [groups] = useState<CustomerGroup[]>(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete'>('view');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // New customer form hooks - ALWAYS DECLARED
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

  // Update global state whenever customers change
  useEffect(() => {
    globalCustomers = customers;
  }, [customers]);

  // Show notification with auto-hide
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Generate next customer ID
  const generateNextId = () => {
    const maxId = customers.reduce((max, customer) => {
      const num = parseInt(customer.id.split('-')[1]);
      return num > max ? num : max;
    }, 0);
    return `CUST-${String(maxId + 1).padStart(3, '0')}`;
  };

  // Handle form submission for new customers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create new customer
    const newCustomer: Customer = {
      id: generateNextId(),
      name: customerType === 'Individual' 
        ? `${formData.firstName} ${formData.lastName}`.trim()
        : formData.companyName,
      email: formData.email,
      phone: formData.phone,
      type: customerType,
      location: `${formData.city}, ${formData.state}`.trim().replace(/^,\s*|,\s*$/g, '') || 'Not specified',
      policies: 0,
      premiumTotal: 0,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    };

    // Add to customers list
    setCustomers(prev => [...prev, newCustomer]);
    globalCustomers = [...globalCustomers, newCustomer];
    
    showNotification('success', `Customer "${newCustomer.name}" created successfully!`);
    
    // Reset form
    setFormData({
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
    
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Customer Actions
  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType('view');
    setShowModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType('delete');
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      const newCustomers = customers.filter(c => c.id !== selectedCustomer.id);
      setCustomers(newCustomers);
      globalCustomers = newCustomers;
      showNotification('success', `Customer "${selectedCustomer.name}" has been deleted.`);
      setShowModal(false);
      setSelectedCustomer(null);
    }
  };

  const handleSaveEdit = (updatedCustomer: Customer) => {
    const newCustomers = customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c);
    setCustomers(newCustomers);
    globalCustomers = newCustomers;
    showNotification('success', `Customer "${updatedCustomer.name}" has been updated.`);
    setShowModal(false);
    setSelectedCustomer(null);
  };

  // Filter data
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // NOW ALL CONDITIONAL RENDERING - NO MORE HOOKS AFTER THIS POINT!
  
  // Add New Customer View
  if (currentView === 'customers-new') {
    return (
      <div className="p-6">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-800 border-green-500' 
              : 'bg-red-50 text-red-800 border-red-500'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              )}
              <div>
                <p className="font-medium">{notification.type === 'success' ? 'Success!' : 'Error!'}</p>
                <p className="text-sm">{notification.message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
          <p className="text-gray-600 mt-1">Create a new customer profile</p>
        </div>

        <div className="max-w-2xl">
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

          <form onSubmit={handleSubmit}>
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {customerType === 'Individual' ? 'Personal Information' : 'Company Information'}
              </h3>
              
              <div className="space-y-4">
                {customerType === 'Individual' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      className="input-field w-full"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" className="btn-secondary">Cancel</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
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
    return (
      <div className="p-6 space-y-6">
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
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Auto
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{group.customerCount}</p>
                  <p className="text-xs text-gray-500">Customers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: All Customers View
  return (
    <div className="p-6 space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
          notification.type === 'success' 
            ? 'bg-green-50 text-green-800 border-green-500' 
            : 'bg-red-50 text-red-800 border-red-500'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
            )}
            <div>
              <p className="font-medium">{notification.type === 'success' ? 'Success!' : 'Error!'}</p>
              <p className="text-sm">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Customers</h1>
          <p className="text-gray-600 mt-1">Manage individual and corporate customers</p>
        </div>
        <div className="flex space-x-3">
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
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={() => handleView(customer)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        onClick={() => handleDelete(customer)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for View/Edit/Delete */}
      {showModal && selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          type={modalType}
          onClose={() => {
            setShowModal(false);
            setSelectedCustomer(null);
          }}
          onSave={handleSaveEdit}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}

// Customer Modal Component
interface CustomerModalProps {
  customer: Customer;
  type: 'view' | 'edit' | 'delete';
  onClose: () => void;
  onSave: (customer: Customer) => void;
  onDelete: () => void;
}

function CustomerModal({ customer, type, onClose, onSave, onDelete }: CustomerModalProps) {
  const [editData, setEditData] = useState(customer);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editData);
  };

  if (type === 'delete') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Delete Customer</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-semibold">"{customer.name}"</span>?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button onClick={onDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {type === 'view' ? 'Customer Details' : 'Edit Customer'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {type === 'view' ? (
                  <p className="text-gray-900 py-2">{customer.name}</p>
                ) : (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  />
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {type === 'view' ? (
                  <p className="text-gray-900 py-2">{customer.email}</p>
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
            <button onClick={onClose} className="btn-secondary">
              {type === 'view' ? 'Close' : 'Cancel'}
            </button>
            {type === 'edit' && (
              <button onClick={handleSave} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}