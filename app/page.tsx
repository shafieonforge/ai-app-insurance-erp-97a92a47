'use client';

import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import DashboardLayout from './dashboard/layout';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <DashboardLayout />;
}