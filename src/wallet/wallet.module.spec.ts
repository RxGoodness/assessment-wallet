import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    // Mock PrismaService since WalletService depends on it
    const mockPrismaService = {
      wallet: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    module = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useFactory: (prismaService: any) => {
            return new WalletService(prismaService);
          },
          inject: ['PrismaService'],
        },
        {
          provide: 'PrismaService',
          useValue: mockPrismaService,
        },
      ],
    }).compile();
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have WalletController', () => {
    const controller = module.get<WalletController>(WalletController);
    expect(controller).toBeDefined();
  });

  it('should have WalletService', () => {
    const service = module.get<WalletService>(WalletService);
    expect(service).toBeDefined();
  });

  it('should compile successfully', () => {
    expect(module).toBeInstanceOf(TestingModule);
  });
});
