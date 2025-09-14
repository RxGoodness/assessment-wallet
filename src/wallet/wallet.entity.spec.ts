import { Wallet } from './wallet.entity';
import { User } from '../user/user.entity';

describe('Wallet Entity', () => {
  it('should create a wallet instance', () => {
    const wallet = new Wallet();
    expect(wallet).toBeDefined();
    expect(wallet).toBeInstanceOf(Wallet);
  });

  it('should have all required properties', () => {
    const wallet = new Wallet();
    wallet.id = 1;
    wallet.userId = 1;
    wallet.balance = '100.50';
    wallet.currency = 'USD';
    wallet.createdAt = new Date();
    wallet.updatedAt = new Date();

    expect(wallet.id).toBe(1);
    expect(wallet.userId).toBe(1);
    expect(wallet.balance).toBe('100.50');
    expect(wallet.currency).toBe('USD');
    expect(wallet.createdAt).toBeInstanceOf(Date);
    expect(wallet.updatedAt).toBeInstanceOf(Date);
  });

  it('should allow user to be assigned', () => {
    const wallet = new Wallet();
    const user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.name = 'Test User';

    wallet.user = user;

    expect(wallet.user).toEqual(user);
    expect(wallet.user.email).toBe('test@example.com');
  });

  it('should handle undefined user property', () => {
    const wallet = new Wallet();
    expect(wallet.user).toBeUndefined();
  });

  it('should handle different currency types', () => {
    const usdWallet = new Wallet();
    const eurWallet = new Wallet();
    const gbpWallet = new Wallet();

    usdWallet.currency = 'USD';
    eurWallet.currency = 'EUR';
    gbpWallet.currency = 'GBP';

    expect(usdWallet.currency).toBe('USD');
    expect(eurWallet.currency).toBe('EUR');
    expect(gbpWallet.currency).toBe('GBP');
  });

  it('should handle decimal balance values', () => {
    const wallet = new Wallet();
    
    wallet.balance = '0.00';
    expect(wallet.balance).toBe('0.00');
    
    wallet.balance = '999.99';
    expect(wallet.balance).toBe('999.99');
    
    wallet.balance = '1000000.01';
    expect(wallet.balance).toBe('1000000.01');
  });
});
