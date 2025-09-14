import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

// Mock the Logger to prevent console spam during tests
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  Logger: jest.fn().mockImplementation(() => ({
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  })),
}));

type MockPrisma = {
  user: {
    create: jest.Mock;
    findUnique: jest.Mock;
  };
  wallet: {
    create: jest.Mock;
  };
};

const mockPrisma: MockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  wallet: {
    create: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jest.clearAllMocks();
    jwtService = new JwtService({ secret: 'test' });
    service = new AuthService(jwtService, mockPrisma as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null); // No existing user
    mockPrisma.user.create.mockResolvedValue({
      id_pk: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      name: 'Test',
      wallets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockPrisma.wallet.create.mockResolvedValue({
      id_pk: 1,
      userId: 1,
      balance: 0,
      currency: 'NGN',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await service.register({ email: 'test@example.com', password: 'password', name: 'Test' });
    expect(result).toHaveProperty('id');
    expect(mockPrisma.user.create).toHaveBeenCalled();
    expect(mockPrisma.wallet.create).toHaveBeenCalled();
  });

  it('should fail registration with duplicate email', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ 
      id_pk: 1, 
      email: 'test@example.com', 
      password: 'hashedpassword', 
      name: 'Test',
      wallets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }); // Existing user
    await expect(service.register({ email: 'test@example.com', password: 'password', name: 'Test' })).rejects.toThrow('Email already exists');
  });

  it('should validate user with correct credentials', async () => {
    const password = await bcrypt.hash('password', 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id_pk: 1,
      email: 'test@example.com',
      password,
      name: 'Test',
      wallets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await service.validateUser('test@example.com', 'password');
    expect(user).toBeDefined();
    expect(mockPrisma.user.findUnique).toHaveBeenCalled();
  });

  it('should not validate user with wrong password', async () => {
    const password = await bcrypt.hash('password', 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id_pk: 1,
      email: 'test@example.com',
      password,
      name: 'Test',
      wallets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await service.validateUser('test@example.com', 'wrong');
    expect(user).toBeNull();
    expect(mockPrisma.user.findUnique).toHaveBeenCalled();
  });

  it('should login and return access_token', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue({
      id_pk: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      name: 'Test',
      wallets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await service.login({ email: 'test@example.com', password: 'password' });
    expect(result).toHaveProperty('access_token');
  });

  it('should fail login with invalid credentials', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue(null);
    const result = await service.login({ email: 'test@example.com', password: 'wrong' });
    expect(result).toBeNull();
  });
});
