import { NextRequest, NextResponse } from 'next/server';
import { Customer } from '@/lib/types/customer';

// Mock database - same as above (would be imported from shared source)
const customers: Customer[] = [];

// GET /api/customers/[id] - Get a specific customer
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customer = customers.find(c => c.id === params.id);
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);

  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

// PUT /api/customers/[id] - Update a customer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerIndex = customers.findIndex(c => c.id === params.id);
    
    if (customerIndex === -1) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const existingCustomer = customers[customerIndex];
    
    const updatedCustomer: Customer = {
      ...existingCustomer,
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user'
    };

    customers[customerIndex] = updatedCustomer;

    return NextResponse.json(updatedCustomer);

  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[id] - Delete a customer (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerIndex = customers.findIndex(c => c.id === params.id);
    
    if (customerIndex === -1) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Soft delete by changing status
    customers[customerIndex] = {
      ...customers[customerIndex],
      status: 'Inactive',
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user'
    };

    return NextResponse.json({ message: 'Customer deactivated successfully' });

  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}