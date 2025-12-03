'use client';

import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CustomersModule from './components/customers/CustomersModule';
import PoliciesPage from './components/policies/PoliciesPage';
import NewPolicyPage from './components/policies/NewPolicyPage';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleModuleChange = (module: string) => {
    setCurrentModule(module);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
      case 'customers-new':
      case 'customers-groups':
        return <CustomersModule currentView={currentModule} />;
      case 'policies':
        return <PoliciesPage />;
      case 'policies-new':
        return <NewPolicyPage />;
      case 'claims':
        return <ClaimsModule />;
      case 'underwriting':
        return <UnderwritingModule />;
      case 'billing':
        return <BillingModule />;
      case 'commission':
        return <CommissionModule />;
      case 'products':
        return <ProductsModule />;
      case 'documents':
        return <DocumentsModule />;
      case 'finance':
        return <FinanceModule />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar currentModule={currentModule} onModuleChange={handleModuleChange} />
      
      <div className="flex flex-col flex-1 lg:pl-72">
        <main className="flex-1 overflow-y-auto">
          {renderCurrentModule()}
        </main>
      </div>
    </div>
  );
}

// Module Components
function ClaimsModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Claims Management</h1>
        <p className="text-gray-600 mt-1">Process and manage insurance claims</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Total Claims</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">387</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Pending Claims</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
          <p className="text-sm text-gray-500 mt-1">Requires attention</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Settled Claims</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">364</p>
          <p className="text-sm text-gray-500 mt-1">94% resolution rate</p>
        </div>
      </div>
    </div>
  );
}

function UnderwritingModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Underwriting</h1>
        <p className="text-gray-600 mt-1">Risk assessment and policy approval</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">45</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">38</p>
          <p className="text-sm text-gray-500 mt-1">84% approval rate</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Under Review</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">7</p>
          <p className="text-sm text-gray-500 mt-1">Pending review</p>
        </div>
      </div>
    </div>
  );
}

function BillingModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Premium billing and payment processing</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">$2.4M</p>
          <p className="text-sm text-gray-500 mt-1">+18% from last month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Outstanding</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">$156K</p>
          <p className="text-sm text-gray-500 mt-1">Overdue payments</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Collection Rate</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">94%</p>
          <p className="text-sm text-gray-500 mt-1">Industry leading</p>
        </div>
      </div>
    </div>
  );
}

function CommissionModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Commission Management</h1>
        <p className="text-gray-600 mt-1">Agent commission tracking and payouts</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Total Commissions</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">$234K</p>
          <p className="text-sm text-gray-500 mt-1">This quarter</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Pending Payouts</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">$45K</p>
          <p className="text-sm text-gray-500 mt-1">Due this month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Active Agents</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">28</p>
          <p className="text-sm text-gray-500 mt-1">Licensed agents</p>
        </div>
      </div>
    </div>
  );
}

function ProductsModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-1">Insurance products and plan configuration</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Active Products</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          <p className="text-sm text-gray-500 mt-1">Available products</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Plans</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">47</p>
          <p className="text-sm text-gray-500 mt-1">Coverage plans</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Coverage Types</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">156</p>
          <p className="text-sm text-gray-500 mt-1">Coverage options</p>
        </div>
      </div>
    </div>
  );
}

function DocumentsModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <p className="text-gray-600 mt-1">Policy documents, certificates, and file storage</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Total Documents</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">8,453</p>
          <p className="text-sm text-gray-500 mt-1">Stored documents</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Storage Used</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">2.4 GB</p>
          <p className="text-sm text-gray-500 mt-1">Cloud storage</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">15</p>
          <p className="text-sm text-gray-500 mt-1">Document types</p>
        </div>
      </div>
    </div>
  );
}

function FinanceModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Finance Integration</h1>
        <p className="text-gray-600 mt-1">Accounting system integration and financial reports</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">GL Entries</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
          <p className="text-sm text-gray-500 mt-1">This period</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Reconciled</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">98%</p>
          <p className="text-sm text-gray-500 mt-1">Reconciliation rate</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Outstanding</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">$12K</p>
          <p className="text-sm text-gray-500 mt-1">Unreconciled</p>
        </div>
      </div>
    </div>
  );
}

function ReportsModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Business Intelligence</h1>
        <p className="text-gray-600 mt-1">Analytics, reports, and business insights</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Standard Reports</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
          <p className="text-sm text-gray-500 mt-1">Pre-built reports</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
          <p className="text-sm text-gray-500 mt-1">User-created</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Dashboards</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">6</p>
          <p className="text-sm text-gray-500 mt-1">Interactive dashboards</p>
        </div>
      </div>
    </div>
  );
}

function SettingsModule() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-1">Application configuration and user management</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">47</p>
          <p className="text-sm text-gray-500 mt-1">System users</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">User Roles</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
          <p className="text-sm text-gray-500 mt-1">Permission roles</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">99%</p>
          <p className="text-sm text-gray-500 mt-1">Uptime</p>
        </div>
      </div>
    </div>
  );
}