import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Customer ${params.id} details` });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Customer ${params.id} updated` });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Customer ${params.id} deleted` });
}