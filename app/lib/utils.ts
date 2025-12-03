import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }[format];

  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length > 10) {
    return `+${cleaned}`;
  }
  return phone;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned) && cleaned.length >= 10;
}

export function getStatusColor(status: string) {
  const colors = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
    Pending_KYC: 'bg-yellow-100 text-yellow-800',
    Blacklisted: 'bg-red-100 text-red-800',
    Lead: 'bg-blue-100 text-blue-800',
    Prospect: 'bg-purple-100 text-purple-800',
    Verified: 'bg-green-100 text-green-800',
    Pending: 'bg-gray-100 text-gray-800',
    In_Review: 'bg-blue-100 text-blue-800',
    Rejected: 'bg-red-100 text-red-800',
    Expired: 'bg-orange-100 text-orange-800'
  } as const;

  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function getRiskColor(category: string) {
  const colors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800'
  } as const;

  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function calculateRiskScore(factors: {
  industryRisk: number;
  geographicRisk: number;
  financialRisk: number;
  complianceRisk: number;
  claimsHistoryRisk: number;
}): number {
  const weights = {
    industryRisk: 0.25,
    geographicRisk: 0.15,
    financialRisk: 0.25,
    complianceRisk: 0.2,
    claimsHistoryRisk: 0.15
  };

  return Math.round(
    factors.industryRisk * weights.industryRisk +
    factors.geographicRisk * weights.geographicRisk +
    factors.financialRisk * weights.financialRisk +
    factors.complianceRisk * weights.complianceRisk +
    factors.claimsHistoryRisk * weights.claimsHistoryRisk
  );
}

export function getRiskCategory(score: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score <= 25) return 'Low';
  if (score <= 50) return 'Medium';
  if (score <= 75) return 'High';
  return 'Critical';
}