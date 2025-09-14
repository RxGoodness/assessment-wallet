import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    service = { register: jest.fn(), login: jest.fn() } as any;
    controller = new AuthController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register user and return success', async () => {
    (service.register as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test' });
    const result = await controller.register({ email: 'test@example.com', password: 'password', name: 'Test' });
    expect(result.success).toBe(true);
  });

  it('should handle registration error', async () => {
    (service.register as jest.Mock).mockRejectedValue(new Error('Registration error'));
    await expect(controller.register({ email: 'test@example.com', password: 'password', name: 'Test' })).rejects.toThrow();
  });

  it('should login user and return success', async () => {
    (service.login as jest.Mock).mockResolvedValue({ access_token: 'token' });
    const result = await controller.login({ email: 'test@example.com', password: 'password' });
    expect(result.success).toBe(true);
  });

  it('should handle login error', async () => {
    (service.login as jest.Mock).mockRejectedValue(new Error('Login error'));
    await expect(controller.login({ email: 'test@example.com', password: 'password' })).rejects.toThrow();
  });
});
