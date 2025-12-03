import { PrismaClient, CustomerType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@insurecore.com' },
    update: {},
    create: {
      email: 'admin@insurecore.com',
      password: adminPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample customers
  const customers = [
    {
      type: 'INDIVIDUAL' as CustomerType,
      legalName: 'Sarah Johnson',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: new Date('1985-06-15'),
      gender: 'FEMALE' as const,
      occupation: 'Software Engineer',
      contacts: {
        create: [
          { type: 'EMAIL' as const, value: 'sarah.johnson@email.com', isPrimary: true },
          { type: 'MOBILE' as const, value: '+1-555-123-4567', isPrimary: true }
        ]
      },
      addresses: {
        create: [
          {
            type: 'HOME' as const,
            addressLine1: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001',
            isPrimary: true
          }
        ]
      }
    },
    {
      type: 'CORPORATE' as CustomerType,
      legalName: 'TechCorp Solutions Inc.',
      displayName: 'TechCorp',
      businessType: 'Technology',
      industry: 'Software Development',
      registrationNumber: 'TC123456789',
      employeesCount: 150,
      contacts: {
        create: [
          { type: 'EMAIL' as const, value: 'admin@techcorp.com', isPrimary: true },
          { type: 'PHONE' as const, value: '+1-555-987-6543', isPrimary: true }
        ]
      },
      addresses: {
        create: [
          {
            type: 'BUSINESS' as const,
            addressLine1: '456 Business Ave',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94102',
            isPrimary: true
          }
        ]
      }
    }
  ];

  for (const customerData of customers) {
    const customer = await prisma.customer.create({
      data: {
        ...customerData,
        customerCode: customerData.type === 'INDIVIDUAL' 
          ? `IND${new Date().getFullYear().toString().slice(-2)}0001`
          : `CRP${new Date().getFullYear().toString().slice(-2)}0001`
      }
    });
    console.log('✅ Customer created:', customer.legalName);
  }

  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });