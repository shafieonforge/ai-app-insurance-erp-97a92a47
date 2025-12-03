import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    
    const mockData = 'Customer Name,Email,Phone,Status\nJohn Doe,john@example.com,+1234567890,Active';
    
    const headers = {
      'Content-Type': format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel',
      'Content-Disposition': `attachment; filename="customers.${format}"`
    };

    return new NextResponse(mockData, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export customers' },
      { status: 500 }
    );
  }
}