import { NextResponse } from 'next/server';
import { CustomerStats } from '@/lib/types/customer';

// Mock customers data
const customers = []; // Would import from shared source

export async function GET() {
  try {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const stats: CustomerStats = {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'Active').length,
      inactiveCustomers: customers.filter(c => c.status === 'Inactive').length,
      corporateCustomers: customers.filter(c => c.type === 'Corporate').length,
      individualCustomers: customers.filter(c => c.type === 'Individual').length,
      pendingKyc: customers.filter(c => c.kycStatus === 'Pending').length,
      highRiskCustomers: customers.filter(c => 
        c.riskProfile.riskCategory === 'High' || 
        c.riskProfile.riskCategory === 'Critical'
      ).length,
      totalPremium: customers.reduce((sum, c) => sum + c.totalPremium, 0),
      averagePremiumPerCustomer: customers.length > 0 
        ? customers.reduce((sum, c) => sum + c.totalPremium, 0) / customers.length 
        : 0,
      newCustomersThisMonth: customers.filter(c => 
        new Date(c.createdAt) >= thisMonth
      ).length,
      churnRate: calculateChurnRate(customers, lastMonth)
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching customer stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer statistics' },
      { status: 500 }
    );
  }
}

function calculateChurnRate(customers: any[], lastMonth: Date): number {
  const customersAtStartOfLastMonth = customers.filter(c => 
    new Date(c.createdAt) < lastMonth
  );
  
  const churnedCustomers = customersAtStartOfLastMonth.filter(c => 
    c.status === 'Inactive' && 
    new Date(c.updatedAt) >= lastMonth
  );

  return customersAtStartOfLastMonth.length > 0 
    ? (churnedCustomers.length / customersAtStartOfLastMonth.length) * 100 
    : 0;
}