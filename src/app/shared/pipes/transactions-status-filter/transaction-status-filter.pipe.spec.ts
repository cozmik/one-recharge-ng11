import { TransactionStatusFilterPipe } from './transaction-status-filter.pipe';

describe('TransactionStatusFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
