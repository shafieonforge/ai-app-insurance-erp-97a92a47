'use client';

import { useState } from 'react';
import LoginForm from './auth/LoginForm';
import Sidebar from './layout/Sidebar';
import Dashboard from './dashboard/Dashboard';
import CustomersModule from './customers/CustomersModule';

// Import policy components
import PoliciesPage from '../policies/page';
import NewPolicyPage from '../policies/new/page';

export default function Component() {
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

// Quick Module Components
function ClaimsModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Claims Management</h2>
        <p className="text-gray-600">Claims management module coming soon...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Total Claims</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">387</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Pending Claims</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Settled Claims</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">364</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnderwritingModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Underwriting</h2>
        <p className="text-gray-600">Risk assessment and underwriting module...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">45</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">38</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Under Review</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing & Payments</h2>
        <p className="text-gray-600">Premium billing and payment processing...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">$2.4M</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Outstanding</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">$156K</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Collection Rate</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">94%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommissionModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Commission Management</h2>
        <p className="text-gray-600">Agent commission tracking and payouts...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Total Commissions</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">$234K</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Pending Payouts</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">$45K</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Active Agents</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">28</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Management</h2>
        <p className="text-gray-600">Insurance products and plan configuration...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Active Products</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Plans</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">47</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Coverage Types</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">156</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Management</h2>
        <p className="text-gray-600">Policy documents, certificates, and file storage...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Total Documents</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">8,453</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Storage Used</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">2.4 GB</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">15</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinanceModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Finance Integration</h2>
        <p className="text-gray-600">Accounting system integration and financial reports...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">GL Entries</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Reconciled</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">98%</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Outstanding</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">$12K</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Business Intelligence</h2>
        <p className="text-gray-600">Analytics, reports, and business insights...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Standard Reports</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">8</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Dashboards</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsModule() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
        <p className="text-gray-600">Application configuration and user management...</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">47</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">User Roles</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">8</p>
          </div>
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">99%</p>
          </div>
        </div>
      </div>
    </div>
  );
}