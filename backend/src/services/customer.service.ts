import { PrismaClient, CustomerType, CustomerStatus, Prisma } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export interface CustomerFilters {
  page: number;
  limit: number;
  search?: string;
  type?: CustomerType;
  status?: CustomerStatus;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export class CustomerService {
  async getCustomers(filters: CustomerFilters) {
    const { page, limit, search, type, status, sortBy, sortOrder } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {};

    // Search filter
    if (search) {
      where.OR = [
        { customerCode: { contains: search, mode: 'insensitive' } },
        { legalName: { contains: search, mode: 'insensitive' } },
        { displayName: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        {
          contacts: {
            some: {
              value: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ];
    }

    // Type filter
    if (type) {
      where.type = type;
    }

    // Status filter
    if (status) {
      where.status = status;
    }

    const orderBy: Prisma.CustomerOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          contacts: true,
          addresses: {
            where: { isPrimary: true }
          },
          policies: {
            select: {
              id: true,
              policyNumber: true,
              premium: true,
              status: true
            }
          },
          _count: {
            select: {
              policies: true,
              claims: true
            }
          }
        }
      }),
      prisma.customer.count({ where })
    ]);

    return { customers, total };
  }

  async getCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: {
        contacts: true,
        addresses: true,
        documents: true,
        policies: {
          include: {
            claims: true
          }
        },
        claims: true
      }
    });
  }

  async createCustomer(data: any) {
    const customerCode = await this.generateCustomerCode(data.type);

    return prisma.customer.create({
      data: {
        ...data,
        customerCode,
        contacts: {
          create: data.contacts || []
        },
        addresses: {
          create: data.addresses || []
        }
      },
      include: {
        contacts: true,
        addresses: true
      }
    });
  }

  async updateCustomer(id: string, data: any) {
    const { contacts, addresses, ...customerData } = data;

    return prisma.customer.update({
      where: { id },
      data: customerData,
      include: {
        contacts: true,
        addresses: true
      }
    });
  }

  async deleteCustomer(id: string) {
    return prisma.customer.delete({
      where: { id }
    });
  }

  // Contact management
  async getCustomerContacts(customerId: string) {
    return prisma.customerContact.findMany({
      where: { customerId }
    });
  }

  async addCustomerContact(customerId: string, data: any) {
    return prisma.customerContact.create({
      data: {
        ...data,
        customerId
      }
    });
  }

  async updateCustomerContact(contactId: string, data: any) {
    return prisma.customerContact.update({
      where: { id: contactId },
      data
    });
  }

  async deleteCustomerContact(contactId: string) {
    return prisma.customerContact.delete({
      where: { id: contactId }
    });
  }

  // Address management
  async getCustomerAddresses(customerId: string) {
    return prisma.customerAddress.findMany({
      where: { customerId }
    });
  }

  async addCustomerAddress(customerId: string, data: any) {
    return prisma.customerAddress.create({
      data: {
        ...data,
        customerId
      }
    });
  }

  async updateCustomerAddress(addressId: string, data: any) {
    return prisma.customerAddress.update({
      where: { id: addressId },
      data
    });
  }

  async deleteCustomerAddress(addressId: string) {
    return prisma.customerAddress.delete({
      where: { id: addressId }
    });
  }

  // Document management
  async getCustomerDocuments(customerId: string) {
    return prisma.customerDocument.findMany({
      where: { customerId }
    });
  }

  async uploadCustomerDocument(customerId: string, file: Express.Multer.File, type: string) {
    const uploadPath = path.join(process.cwd(), 'uploads', 'customers', customerId);
    await fs.mkdir(uploadPath, { recursive: true });

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadPath, fileName);
    
    await fs.writeFile(filePath, file.buffer);

    return prisma.customerDocument.create({
      data: {
        customerId,
        type: type as any,
        fileName: file.originalname,
        filePath: filePath,
        fileSize: file.size,
        mimeType: file.mimetype
      }
    });
  }

  async deleteCustomerDocument(documentId: string) {
    const document = await prisma.customerDocument.findUnique({
      where: { id: documentId }
    });

    if (document) {
      try {
        await fs.unlink(document.filePath);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }

    return prisma.customerDocument.delete({
      where: { id: documentId }
    });
  }

  // Bulk operations
  async bulkImportCustomers(file: Express.Multer.File) {
    // Implementation for CSV/Excel import
    // This would parse the file and create customers in bulk
    throw new Error('Bulk import not implemented yet');
  }

  async bulkExportCustomers(format: string, filters?: any) {
    // Implementation for CSV/Excel export
    // This would query customers based on filters and generate export file
    throw new Error('Bulk export not implemented yet');
  }

  // Analytics
  async getCustomerStats() {
    const [
      totalCustomers,
      activeCustomers,
      corporateCustomers,
      individualCustomers,
      totalPremium,
      newCustomersThisMonth
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({ where: { status: 'ACTIVE' } }),
      prisma.customer.count({ where: { type: 'CORPORATE' } }),
      prisma.customer.count({ where: { type: 'INDIVIDUAL' } }),
      prisma.policy.aggregate({
        _sum: { premium: true }
      }),
      prisma.customer.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      })
    ]);

    return {
      totalCustomers,
      activeCustomers,
      corporateCustomers,
      individualCustomers,
      totalPremium: totalPremium._sum.premium || 0,
      newCustomersThisMonth
    };
  }

  async getCustomerDemographics() {
    const [typeDistribution, statusDistribution, monthlyGrowth] = await Promise.all([
      prisma.customer.groupBy({
        by: ['type'],
        _count: { type: true }
      }),
      prisma.customer.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      prisma.customer.groupBy({
        by: ['createdAt'],
        _count: { createdAt: true },
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
          }
        }
      })
    ]);

    return {
      typeDistribution,
      statusDistribution,
      monthlyGrowth
    };
  }

  private async generateCustomerCode(type: CustomerType): Promise<string> {
    const prefix = type === 'INDIVIDUAL' ? 'IND' : 'CRP';
    const year = new Date().getFullYear().toString().slice(-2);
    
    const lastCustomer = await prisma.customer.findFirst({
      where: {
        customerCode: {
          startsWith: `${prefix}${year}`
        }
      },
      orderBy: { customerCode: 'desc' }
    });

    let sequence = 1;
    if (lastCustomer) {
      const lastSequence = parseInt(lastCustomer.customerCode.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${year}${sequence.toString().padStart(4, '0')}`;
  }
}