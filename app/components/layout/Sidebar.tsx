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
  currentPath: string;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    current: false,
  },
  {
    name: 'Customer Management',
    href: '/customers',
    icon: Users,
    current: false,
    children: [
      { name: 'All Customers', href: '/customers' },
      { name: 'Add Customer', href: '/customers/new' },
      { name: 'Customer Groups', href: '/customers/groups' },
    ]
  },
  {
    name: 'Policy Management',
    href: '/policies',
    icon: Shield,
    current: false,
    children: [
      { name: 'All Policies', href: '/policies' },
      { name: 'New Policy', href: '/policies/new' },
      { name: 'Renewals', href: '/policies/renewals' },
      { name: 'Endorsements', href: '/policies/endorsements' },
    ]
  },
  {
    name: 'Claims Management',
    href: '/claims',
    icon: FileText,
    current: false,
    children: [
      { name: 'All Claims', href: '/claims' },
      { name: 'New Claim', href: '/claims/new' },
      { name: 'Pending Claims', href: '/claims/pending' },
      { name: 'Settled Claims', href: '/claims/settled' },
    ]
  },
  {
    name: 'Underwriting',
    href: '/underwriting',
    icon: UserCheck,
    current: false,
    children: [
      { name: 'Pending Reviews', href: '/underwriting/pending' },
      { name: 'Risk Assessment', href: '/underwriting/risk' },
      { name: 'Approval Queue', href: '/underwriting/approvals' },
    ]
  },
  {
    name: 'Billing & Payments',
    href: '/billing',
    icon: CreditCard,
    current: false,
    children: [
      { name: 'Invoices', href: '/billing/invoices' },
      { name: 'Payments', href: '/billing/payments' },
      { name: 'Outstanding', href: '/billing/outstanding' },
    ]
  },
  {
    name: 'Commission',
    href: '/commission',
    icon: DollarSign,
    current: false,
    children: [
      { name: 'Commission Reports', href: '/commission/reports' },
      { name: 'Agent Commissions', href: '/commission/agents' },
      { name: 'Commission Rules', href: '/commission/rules' },
    ]
  },
  {
    name: 'Product Management',
    href: '/products',
    icon: Building2,
    current: false,
    children: [
      { name: 'All Products', href: '/products' },
      { name: 'Rating Engine', href: '/products/rating' },
      { name: 'Product Rules', href: '/products/rules' },
    ]
  },
  {
    name: 'Document Management',
    href: '/documents',
    icon: Archive,
    current: false,
  },
  {
    name: 'Finance Integration',
    href: '/finance',
    icon: Calculator,
    current: false,
  },
  {
    name: 'Reports & BI',
    href: '/reports',
    icon: TrendingUp,
    current: false,
    children: [
      { name: 'Executive Dashboard', href: '/reports/executive' },
      { name: 'Financial Reports', href: '/reports/financial' },
      { name: 'Operational Reports', href: '/reports/operational' },
      { name: 'Regulatory Reports', href: '/reports/regulatory' },
    ]
  },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isCurrentPath = (href: string) => currentPath === href;
  const hasActiveChild = (children?: { href: string }[]) => 
    children?.some(child => isCurrentPath(child.href));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
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

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isExpanded = expandedItems.includes(item.name);
            const isCurrent = isCurrentPath(item.href) || hasActiveChild(item.children);
            
            return (
              <div key={item.name}>
                <div
                  className={`group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => item.children ? toggleExpanded(item.name) : null}
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
                      <a
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isCurrentPath(child.href)
                            ? 'text-blue-700 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="px-4 py-4 border-t border-gray-200">
        <a
          href="/settings"
          className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            isCurrentPath('/settings')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
          Settings
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile menu button */}
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