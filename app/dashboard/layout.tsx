'use client';

import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [currentPath] = useState('/dashboard');

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar currentPath={currentPath} />
      
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
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              
              {/* Profile Dropdown */}
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
          {children || <DefaultDashboard />}
        </main>
      </div>
    </div>
  );
}

// Import the dashboard component
import Dashboard from './page';

function DefaultDashboard() {
  return <Dashboard />;
}