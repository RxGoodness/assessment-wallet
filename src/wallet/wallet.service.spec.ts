import { WalletService } from './wallet.service';
import { PrismaClient } from '@prisma/client';

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
  wallet: {
    findFirst: jest.Mock;
    update: jest.Mock;
  };
  $transaction: jest.Mock;
};

const mockPrisma: MockPrisma = {
  wallet: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn((cb: any) => cb(mockPrisma)),
};

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new WalletService(mockPrisma as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should credit wallet', async () => {
    const mockBalance = {
      add: jest.fn().mockReturnValue(2000),
      sub: jest.fn(),
      lessThan: jest.fn(),
    };
    mockPrisma.wallet.findFirst.mockResolvedValue({ 
      id_pk: 1, 
      userId: 1, 
      balance: mockBalance, 
      currency: 'NGN', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    mockPrisma.wallet.update.mockResolvedValue({ 
      id_pk: 1, 
      userId: 1, 
      balance: 2000, 
      currency: 'NGN', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    const result = await service.credit(1, { amount: 1000 });
    expect(result).toHaveProperty('id_pk');
    expect(mockPrisma.wallet.findFirst).toHaveBeenCalled();
    expect(mockPrisma.wallet.update).toHaveBeenCalled();
    expect(mockBalance.add).toHaveBeenCalledWith(1000);
  });

  it('should throw error if wallet not found on credit', async () => {
    mockPrisma.wallet.findFirst.mockResolvedValue(null);
    await expect(service.credit(1, { amount: 1000 })).rejects.toThrow('Wallet not found');
  });

  it('should debit wallet', async () => {
    const mockBalance = {
      add: jest.fn(),
      sub: jest.fn().mockReturnValue(500),
      lessThan: jest.fn().mockReturnValue(false),
    };
    mockPrisma.wallet.findFirst.mockResolvedValue({ 
      id_pk: 1, 
      userId: 1, 
      balance: mockBalance, 
      currency: 'NGN', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    mockPrisma.wallet.update.mockResolvedValue({ 
      id_pk: 1, 
      userId: 1, 
      balance: 500, 
      currency: 'NGN', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    const result = await service.debit(1, { amount: 500 });
    expect(result).toHaveProperty('id_pk');
    expect(mockPrisma.wallet.findFirst).toHaveBeenCalled();
    expect(mockPrisma.wallet.update).toHaveBeenCalled();
    expect(mockBalance.lessThan).toHaveBeenCalledWith(500);
    expect(mockBalance.sub).toHaveBeenCalledWith(500);
  });

  it('should throw error if wallet not found on debit', async () => {
    mockPrisma.wallet.findFirst.mockResolvedValue(null);
    await expect(service.debit(1, { amount: 500 })).rejects.toThrow('Wallet not found');
  });

  it('should throw error if insufficient balance on debit', async () => {
    const mockBalance = {
      add: jest.fn(),
      sub: jest.fn(),
      lessThan: jest.fn().mockReturnValue(true),
    };
    mockPrisma.wallet.findFirst.mockResolvedValue({ 
      id_pk: 1, 
      userId: 1, 
      balance: mockBalance, 
      currency: 'NGN', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    await expect(service.debit(1, { amount: 1000 })).rejects.toThrow('Insufficient balance');
    expect(mockBalance.lessThan).toHaveBeenCalledWith(1000);
  });
});
