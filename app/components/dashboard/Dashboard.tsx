'use client';

import { useState } from 'react';
import { 
  Users, 
  Shield, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell, 
  Search, 
  User,
  Menu,
  X
} from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import CustomersModule from '../customers/CustomersModule';

export default function Dashboard() {
  const [currentModule, setCurrentModule] = useState('dashboard');

  const renderModule = () => {
    switch (currentModule) {
      case 'customers':
        return <CustomersModule />;
      case 'dashboard':
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      
      <div className="flex flex-col flex-1 lg:pl-72">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center flex-1 max-w-2xl">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="input-field pl-10 pr-4 py-2 w-full"
                  placeholder="Search policies, customers, claims..."
                  type="search"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-3 text-sm focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}

function DashboardHome() {
  const stats = [
    {
      title: 'Total Policies',
      value: '12,847',
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: Shield
    },
    {
      title: 'Active Claims',
      value: '387',
      change: '-5% from last month',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Premium Revenue',
      value: '$2.4M',
      change: '+18% from last month',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Customer Satisfaction',
      value: '94%',
      change: '+2% from last month',
      changeType: 'positive' as const,
      icon: Users
    }
  ];

  const recentClaims = [
    { id: 'CL-2024-001', customer: 'Sarah Johnson', type: 'Auto', amount: '$8,500', status: 'Pending', date: '2024-01-15' },
    { id: 'CL-2024-002', customer: 'Michael Chen', type: 'Home', amount: '$15,200', status: 'Approved', date: '2024-01-14' },
    { id: 'CL-2024-003', customer: 'Emily Davis', type: 'Life', amount: '$125,000', status: 'Under Review', date: '2024-01-13' },
    { id: 'CL-2024-004', customer: 'Robert Wilson', type: 'Health', amount: '$3,750', status: 'Settled', date: '2024-01-12' }
  ];

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Approved': 'bg-green-100 text-green-800',
    'Under Review': 'bg-blue-100 text-blue-800',
    'Settled': 'bg-gray-100 text-gray-800'
  };

  const statusIcons = {
    'Pending': Clock,
    'Approved': CheckCircle,
    'Under Review': AlertTriangle,
    'Settled': CheckCircle
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, John. Here's what's happening with your insurance operations.</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">New Policy</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm mt-2 text-green-600">{stat.change}</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Claims</h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">View all →</a>
          </div>
          
          <div className="space-y-4">
            {recentClaims.map((claim) => {
              const StatusIcon = statusIcons[claim.status as keyof typeof statusIcons];
              return (
                <div key={claim.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{claim.id}</div>
                      <div className="text-sm text-gray-500">{claim.customer} • {claim.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{claim.amount}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[claim.status as keyof typeof statusColors]}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {claim.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">New Policy</div>
                  <div className="text-sm text-gray-500">Create a new insurance policy</div>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">File Claim</div>
                  <div className="text-sm text-gray-500">Submit a new insurance claim</div>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Add Customer</div>
                  <div className="text-sm text-gray-500">Register a new customer</div>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">View Reports</div>
                  <div className="text-sm text-gray-500">Access business insights</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Premium Revenue Trends</h3>
          <select className="input-field w-32 py-2">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
          </select>
        </div>
        
        <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-600">Revenue chart will be implemented here</p>
            <p className="text-sm text-gray-500">Integration with chart library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}