'use client';

import { useState } from 'react';
import LoginForm from './auth/LoginForm';
import DashboardLayout from '../dashboard/layout';

export default function Component() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <DashboardLayout />;
}