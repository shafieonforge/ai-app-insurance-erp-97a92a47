import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ 
  className = '', 
  showText = true, 
  size = 'md' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Shield className={`${sizeClasses[size]} text-blue-600`} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-sm opacity-10"></div>
      </div>
      {showText && (
        <span className={`ml-2 font-bold text-gray-900 ${textSizeClasses[size]}`}>
          InsureCore
        </span>
      )}
    </div>
  );
}