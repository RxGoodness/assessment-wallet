import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserController } from './user.controller';

describe('UserModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule],
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

  it('should have UserController', () => {
    const controller = module.get<UserController>(UserController);
    expect(controller).toBeDefined();
  });

  it('should compile successfully', () => {
    expect(module).toBeInstanceOf(TestingModule);
  });
});
