import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test-secret';
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate payload and return user data', async () => {
    const payload = {
      sub: 123,
      email: 'test@example.com',
      iat: Date.now(),
    };

    const result = await strategy.validate(payload);

    expect(result).toEqual({
      userId: 123,
      email: 'test@example.com',
    });
  });

  it('should handle payload with different sub format', async () => {
    const payload = {
      sub: '456',
      email: 'user@test.com',
      iat: Date.now(),
    };

    const result = await strategy.validate(payload);

    expect(result).toEqual({
      userId: '456',
      email: 'user@test.com',
    });
  });

  it('should use default JWT_SECRET when environment variable is not set', () => {
    delete process.env.JWT_SECRET;
    
    const newStrategy = new JwtStrategy();
    expect(newStrategy).toBeDefined();
  });
});
