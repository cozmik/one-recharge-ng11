import { TransactionsPipe } from './airtime-transactions.pipe';

describe('TransactionsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionsPipe();
    expect(pipe).toBeTruthy();
  });
});
