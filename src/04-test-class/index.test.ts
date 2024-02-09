import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    //const instanceOfBankAccount = new BankAccount(1000000);
    expect(getBankAccount(1000000).getBalance()).toBe(1000000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const instanceOfBankAccount = getBankAccount(200);
    const errorMessage = `Insufficient funds: cannot withdraw more than ${instanceOfBankAccount.getBalance()}`;
    expect(() => {
      instanceOfBankAccount.withdraw(300);
    }).toThrowError(errorMessage);
  });

  test('should throw error when transferring more than balance', () => {
    const instanceOfBankAccount = getBankAccount(200);
    const instanceOfBankAccount2 = getBankAccount(0);
    expect(() => {
      instanceOfBankAccount.transfer(500, instanceOfBankAccount2);
    }).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const instanceOfBankAccount = getBankAccount(200);
    expect(() => {
      instanceOfBankAccount.transfer(300, instanceOfBankAccount);
    }).toThrowError();
  });

  test('should deposit money', () => {
    const instanceOfBankAccount = getBankAccount(200);
    expect(instanceOfBankAccount.deposit(500)).toEqual({
      _balance: instanceOfBankAccount.getBalance(),
    });
  });

  test('should withdraw money', () => {
    const instanceOfBankAccount = getBankAccount(200);
    expect(instanceOfBankAccount.withdraw(150)).toEqual({
      _balance: instanceOfBankAccount.getBalance(),
    });
  });

  test('should transfer money', () => {
    const instanceOfBankAccount = getBankAccount(200);
    const instanceOfBankAccount2 = getBankAccount(0);
    instanceOfBankAccount.transfer(100, instanceOfBankAccount2);
    expect(instanceOfBankAccount.getBalance()).toBe(100);
    expect(instanceOfBankAccount2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const instanceOfBankAccount = getBankAccount(200);
    jest.spyOn(instanceOfBankAccount, 'fetchBalance').mockResolvedValue(50);
    const balance = await instanceOfBankAccount.fetchBalance();
    expect(typeof balance === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const instanceOfBankAccount = getBankAccount(200);
    jest.spyOn(instanceOfBankAccount, 'fetchBalance').mockResolvedValue(50);
    const _balance = await instanceOfBankAccount.fetchBalance();
    if (typeof _balance === 'number') {
      await instanceOfBankAccount.synchronizeBalance();
    }
    expect(instanceOfBankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const instanceOfBankAccount = getBankAccount(200);
    jest.spyOn(instanceOfBankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(
      instanceOfBankAccount.synchronizeBalance(),
    ).rejects.toThrowError('Synchronization failed');
  });
});
