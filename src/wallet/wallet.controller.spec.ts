import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

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

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  beforeEach(async () => {
    service = { credit: jest.fn(), debit: jest.fn() } as any;
    controller = new WalletController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should credit wallet and return success', async () => {
    (service.credit as jest.Mock).mockResolvedValue({ id: 1, balance: 2000 });
    const result = await controller.credit({ user: { userId: 1 } }, { amount: 1000 });
    expect(result.success).toBe(true);
  });

  it('should handle credit error', async () => {
    (service.credit as jest.Mock).mockRejectedValue(new Error('Credit error'));
    await expect(controller.credit({ user: { userId: 1 } }, { amount: 1000 })).rejects.toThrow();
  });

  it('should debit wallet and return success', async () => {
    (service.debit as jest.Mock).mockResolvedValue({ id: 1, balance: 1000 });
    const result = await controller.debit({ user: { userId: 1 } }, { amount: 500 });
    expect(result.success).toBe(true);
  });

  it('should handle debit error', async () => {
    (service.debit as jest.Mock).mockRejectedValue(new Error('Debit error'));
    await expect(controller.debit({ user: { userId: 1 } }, { amount: 500 })).rejects.toThrow();
  });
});
