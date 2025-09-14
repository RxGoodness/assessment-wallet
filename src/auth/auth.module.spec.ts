import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test-secret';
    
    // Mock PrismaService and JwtService
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      wallet: {
        create: jest.fn(),
      },
    };

    const mockJwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: (jwtService: JwtService, prismaService: any) => {
            return new AuthService(jwtService, prismaService);
          },
          inject: [JwtService, 'PrismaService'],
        },
        JwtStrategy,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: 'PrismaService',
          useValue: mockPrismaService,
        },
      ],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
    if (module) {
      module.close();
    }
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthController', () => {
    const controller = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });

  it('should have AuthService', () => {
    const service = module.get<AuthService>(AuthService);
    expect(service).toBeDefined();
  });

  it('should have JwtStrategy', () => {
    const strategy = module.get<JwtStrategy>(JwtStrategy);
    expect(strategy).toBeDefined();
  });

  it('should have JwtService', () => {
    const service = module.get<JwtService>(JwtService);
    expect(service).toBeDefined();
  });
});
