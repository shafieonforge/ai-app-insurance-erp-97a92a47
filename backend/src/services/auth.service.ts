import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export class AuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@insurecore.com',
      password: '$2b$10$8K8.cTw7qwE5vG9xHxX8euQpS1Z0M0t4bE2yU5L1nQ3aM7C8dF6gO', // admin123
      role: 'admin',
      name: 'System Administrator',
      permissions: ['all'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    },
    {
      id: '2',
      email: 'demo@insurecore.com',
      password: '$2b$10$8K8.cTw7qwE5vG9xHxX8euQpS1Z0M0t4bE2yU5L1nQ3aM7C8dF6gO', // demo123
      role: 'user',
      name: 'Demo User',
      permissions: ['read', 'write'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }
  ];

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(payload: any, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'insurecore-secret-key',
      {
        expiresIn: '24h',
        issuer: 'insurecore-api',
        audience: 'insurecore-frontend',
        ...options
      }
    );
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, process.env.JWT_SECRET || 'insurecore-secret-key', {
      issuer: 'insurecore-api',
      audience: 'insurecore-frontend'
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);
    
    const newUser: User = {
      ...userData,
      id: (this.users.length + 1).toString(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return null;
    }

    if (updates.password) {
      updates.password = await this.hashPassword(updates.password);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.users[userIndex];
  }

  async deactivateUser(id: string): Promise<boolean> {
    const user = await this.updateUser(id, { isActive: false });
    return user !== null;
  }
}