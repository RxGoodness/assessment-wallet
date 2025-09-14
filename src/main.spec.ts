// Mock NestFactory for testing
const mockApp = {
  listen: jest.fn().mockResolvedValue(undefined),
};

const mockNestFactory = {
  create: jest.fn().mockResolvedValue(mockApp),
};

jest.mock('@nestjs/core', () => ({
  NestFactory: mockNestFactory,
}));

import { bootstrap } from './main';

describe('Main Bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PORT = '3000';
  });

  afterEach(() => {
    delete process.env.PORT;
  });

  it('should have bootstrap function defined', () => {
    expect(typeof bootstrap).toBe('function');
  });

  it('should create NestJS app and listen on port', async () => {
    await bootstrap();
    
    expect(mockNestFactory.create).toHaveBeenCalled();
    expect(mockApp.listen).toHaveBeenCalledWith('3000');
  });

  it('should listen on specified PORT', async () => {
    process.env.PORT = '8080';
    
    await bootstrap();
    
    expect(mockApp.listen).toHaveBeenCalledWith('8080');
  });

  it('should listen on default port 7000 when PORT is not set', async () => {
    delete process.env.PORT;
    
    await bootstrap();
    
    expect(mockApp.listen).toHaveBeenCalledWith(7000);
  });
});
