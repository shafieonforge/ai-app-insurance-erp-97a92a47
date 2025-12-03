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

// Simple module components
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