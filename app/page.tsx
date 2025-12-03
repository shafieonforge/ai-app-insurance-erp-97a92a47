'use client';

import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CustomersModule from './components/customers/CustomersModule';
import PoliciesPage from './components/policies/PoliciesPage';
import NewPolicyPage from './components/policies/NewPolicyPage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigation = (module: string, view?: string) => {
    setCurrentModule(module);
    setCurrentView(view || module);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (currentModule === 'customers') {
      return <CustomersModule currentView={currentView} />;
    }
    
    if (currentModule === 'policies') {
      if (currentView === 'policies-new') {
        return <NewPolicyPage />;
      }
      return <PoliciesPage />;
    }
    
    return <Dashboard />;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar 
        currentPath={currentModule}
        onNavigate={handleNavigation}
      />
      
      <div className="flex flex-col flex-1 lg:pl-72">
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}