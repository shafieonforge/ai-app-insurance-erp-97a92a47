'use client';

import { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import { 
  BarChart3, 
  Users, 
  Shield, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

export default function Dashboard() {
  const [currentModule, setCurrentModule] = useState('dashboard');

  const handleNavigation = (module: string, view?: string) => {
    setCurrentModule(view || module);
    
    // Navigate to actual routes for different modules
    if (module === 'customers' || module.startsWith('customers-')) {
      window.location.href = '/customers';
    } else if (module === 'policies' || module.startsWith('policies-')) {
      window.location.href = '/policies';
    }
  };

  const stats = [
    {
      name: 'Total Customers',
      value: '2,543',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Active Policies',
      value: '1,847',
      change: '+8%',
      icon: Shield,
      color: 'green'
    },
    {
      name: 'Open Claims',
      value: '73',
      change: '-5%',
      icon: FileText,
      color: 'yellow'
    },
    {
      name: 'Monthly Revenue',
      value: '$284K',
      change: '+15%',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const recentClaims = [
    {
      id: 'CLM-001',
      customer: 'Sarah Johnson',
      type: 'Auto Insurance',
      amount: '$8,500',
      status: 'In Review',
      date: '2024-01-15'
    },
    {
      id: 'CLM-002',
      customer: 'TechCorp Solutions',
      type: 'Property Insurance',
      amount: '$45,000',
      status: 'Approved',
      date: '2024-01-14'
    },
    {
      id: 'CLM-003',
      customer: 'Michael Chen',
      type: 'Health Insurance',
      amount: '$2,300',
      status: 'Pending',
      date: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return CheckCircle;
      case 'In Review': return AlertCircle;
      case 'Pending': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar 
        currentPath={currentModule}
        onNavigate={handleNavigation}
      />
      
      <div className="flex flex-col flex-1 lg:pl-72">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your insurance business.</p>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="stat-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      stat.color === 'blue' ? 'bg-blue-50' :
                      stat.color === 'green' ? 'bg-green-50' :
                      stat.color === 'yellow' ? 'bg-yellow-50' :
                      'bg-purple-50'
                    }`}>
                      <stat.icon className={`h-5 w-5 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'yellow' ? 'text-yellow-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleNavigation('customers-new')}
                    className="btn-primary text-left justify-start"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Add Customer
                  </button>
                  <button 
                    onClick={() => handleNavigation('policies-new')}
                    className="btn-secondary text-left justify-start"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    New Policy
                  </button>
                  <button className="btn-secondary text-left justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Process Claim
                  </button>
                  <button className="btn-secondary text-left justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Reports
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Claims</h3>
                <div className="space-y-3">
                  {recentClaims.map((claim) => {
                    const StatusIcon = getStatusIcon(claim.status);
                    return (
                      <div key={claim.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {claim.customer.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{claim.customer}</p>
                            <p className="text-xs text-gray-500">{claim.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{claim.amount}</p>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {claim.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all claims →
                </button>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Connect to analytics service for detailed charts</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}