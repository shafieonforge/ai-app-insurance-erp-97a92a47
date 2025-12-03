'use client';

import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import CustomersModule from './components/customers/CustomersModule';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentModule, setCurrentModule] = useState('customers');

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
      case 'customers':
      case 'customers-new':
      case 'customers-groups':
        return <CustomersModule currentView={currentModule} />;
      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Coming Soon</h2>
              <p className="text-gray-600">This module is under development</p>
            </div>
          </div>
        );
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