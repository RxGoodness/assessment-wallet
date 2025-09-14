import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';

describe('CreateUserDto', () => {
  it('should create an instance', () => {
    const dto = new CreateUserDto();
    expect(dto).toBeDefined();
    expect(dto).toBeInstanceOf(CreateUserDto);
  });

  it('should have email property', () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    expect(dto.email).toBe('test@example.com');
  });

  it('should have password property', () => {
    const dto = new CreateUserDto();
    dto.password = 'password123';
    expect(dto.password).toBe('password123');
  });

  it('should have name property', () => {
    const dto = new CreateUserDto();
    dto.name = 'Test User';
    expect(dto.name).toBe('Test User');
  });

  it('should allow setting all properties', () => {
    const dto = new CreateUserDto();
    dto.email = 'user@test.com';
    dto.password = 'securepassword';
    dto.name = 'John Doe';

    expect(dto.email).toBe('user@test.com');
    expect(dto.password).toBe('securepassword');
    expect(dto.name).toBe('John Doe');
  });
});

describe('LoginUserDto', () => {
  it('should create an instance', () => {
    const dto = new LoginUserDto();
    expect(dto).toBeDefined();
    expect(dto).toBeInstanceOf(LoginUserDto);
  });

  it('should have email property', () => {
    const dto = new LoginUserDto();
    dto.email = 'login@example.com';
    expect(dto.email).toBe('login@example.com');
  });

  it('should have password property', () => {
    const dto = new LoginUserDto();
    dto.password = 'loginpassword';
    expect(dto.password).toBe('loginpassword');
  });

  it('should allow setting both properties', () => {
    const dto = new LoginUserDto();
    dto.email = 'user@login.com';
    dto.password = 'mypassword';

    expect(dto.email).toBe('user@login.com');
    expect(dto.password).toBe('mypassword');
  });
});
