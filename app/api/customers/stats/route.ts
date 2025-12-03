import { NextResponse } from 'next/server';
import { CustomerStats } from '@/lib/types/customer';

export async function GET() {
  try {
    const stats: CustomerStats = {
      totalCustomers: 2543,
      activeCustomers: 2187,
      inactiveCustomers: 356,
      corporateCustomers: 847,
      individualCustomers: 1696,
      pendingKyc: 156,
      highRiskCustomers: 73,
      totalPremium: 7842365,
      averagePremiumPerCustomer: 3084,
      newCustomersThisMonth: 47,
      churnRate: 2.3
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customer statistics' },
      { status: 500 }
    );
  }
}