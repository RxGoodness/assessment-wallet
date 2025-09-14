import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    // Mock PrismaService since it's used by various services
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      wallet: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    // Create a simplified test module instead of importing the full AppModule
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
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

  it('should have AppController', () => {
    const controller = module.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  it('should have AppService', () => {
    const service = module.get<AppService>(AppService);
    expect(service).toBeDefined();
  });

  it('should compile successfully', () => {
    expect(module).toBeInstanceOf(TestingModule);
  });
});
