import { UserStatusFilterPipe } from './user-status-filter.pipe';

describe('UserStatusFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new UserStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
