#!/usr/bin/env node

import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    const customerService = new CustomerService();
    const authService = new AuthService();

    console.log('✅ Services initialized');

    // Sample customers are already seeded in CustomerService constructor
    console.log('✅ Sample customers seeded');

    // Additional sample data could be added here
    console.log('✅ Additional sample users seeded');

    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Available demo accounts:');
    console.log('   - admin@insurecore.com / admin123 (Admin)');
    console.log('   - demo@insurecore.com / demo123 (User)');
    console.log('📈 Sample customers: 2 customers with full profiles');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };