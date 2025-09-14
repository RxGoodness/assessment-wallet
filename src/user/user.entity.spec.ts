import { User } from './user.entity';
import { Wallet } from '../wallet/wallet.entity';

describe('User Entity', () => {
  it('should create a user instance', () => {
    const user = new User();
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  it('should have all required properties', () => {
    const user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.password = 'hashedPassword';
    user.name = 'Test User';
    user.createdAt = new Date();
    user.updatedAt = new Date();

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('hashedPassword');
    expect(user.name).toBe('Test User');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should allow wallets to be assigned', () => {
    const user = new User();
    const wallet = new Wallet();
    wallet.id = 1;
    wallet.userId = 1;
    wallet.balance = '100.00';
    wallet.currency = 'USD';

    user.wallets = [wallet];

    expect(user.wallets).toHaveLength(1);
    expect(user.wallets[0]).toEqual(wallet);
  });

  it('should handle undefined wallets property', () => {
    const user = new User();
    expect(user.wallets).toBeUndefined();
  });

  it('should allow multiple wallets', () => {
    const user = new User();
    const wallet1 = new Wallet();
    const wallet2 = new Wallet();
    
    wallet1.id = 1;
    wallet1.userId = 1;
    wallet1.balance = '100.00';
    wallet1.currency = 'USD';
    
    wallet2.id = 2;
    wallet2.userId = 1;
    wallet2.balance = '50.00';
    wallet2.currency = 'EUR';

    user.wallets = [wallet1, wallet2];

    expect(user.wallets).toHaveLength(2);
    expect(user.wallets[0].currency).toBe('USD');
    expect(user.wallets[1].currency).toBe('EUR');
  });
});
