'use client';

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  DollarSign, 
  Shield, 
  BarChart3, 
  Settings, 
  UserCheck, 
  Building2, 
  CreditCard,
  Calculator,
  TrendingUp,
  Archive,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import Logo from '../ui/Logo';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const navigation = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    icon: BarChart3
  },
  {
    name: 'Customer Management',
    key: 'customers',
    icon: Users,
    children: [
      { name: 'All Customers', key: 'customers' },
      { name: 'Add Customer', key: 'customers-new' },
      { name: 'Customer Groups', key: 'customers-groups' },
    ]
  },
  {
    name: 'Policy Management',
    key: 'policies',
    icon: Shield,
    children: [
      { name: 'All Policies', key: 'policies' },
      { name: 'New Policy', key: 'policies-new' },
      { name: 'Renewals', key: 'policies-renewals' },
      { name: 'Endorsements', key: 'policies-endorsements' },
    ]
  },
  {
    name: 'Claims Management',
    key: 'claims',
    icon: FileText,
    children: [
      { name: 'All Claims', key: 'claims' },
      { name: 'New Claim', key: 'claims-new' },
      { name: 'Pending Claims', key: 'claims-pending' },
      { name: 'Settled Claims', key: 'claims-settled' },
    ]
  },
  {
    name: 'Underwriting',
    key: 'underwriting',
    icon: UserCheck
  },
  {
    name: 'Billing & Payments',
    key: 'billing',
    icon: CreditCard
  },
  {
    name: 'Commission',
    key: 'commission',
    icon: DollarSign
  },
  {
    name: 'Product Management',
    key: 'products',
    icon: Building2
  },
  {
    name: 'Document Management',
    key: 'documents',
    icon: Archive
  },
  {
    name: 'Finance Integration',
    key: 'finance',
    icon: Calculator
  },
  {
    name: 'Reports & BI',
    key: 'reports',
    icon: TrendingUp
  },
];

export default function Sidebar({ currentModule, onModuleChange }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Customer Management']);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const handleNavigation = (key: string) => {
    onModuleChange(key);
    setSidebarOpen(false);
  };

  const isCurrentModule = (key: string) => currentModule === key;
  const hasActiveChild = (children?: { key: string }[]) => 
    children?.some(child => isCurrentModule(child.key));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <Logo />
        <button
          type="button"
          className="lg:hidden -mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isExpanded = expandedItems.includes(item.name);
            const isCurrent = isCurrentModule(item.key) || hasActiveChild(item.children);
            
            return (
              <div key={item.name}>
                <div
                  className={`group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => {
                    if (item.children) {
                      toggleExpanded(item.name);
                    } else {
                      handleNavigation(item.key);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.children && (
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                  )}
                </div>
                
                {item.children && isExpanded && (
                  <div className="mt-1 ml-8 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        onClick={() => handleNavigation(child.key)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          isCurrentModule(child.key)
                            ? 'text-blue-700 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => handleNavigation('settings')}
          className={`w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            isCurrentModule('settings')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
          Settings
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <SidebarContent />
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>

      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}