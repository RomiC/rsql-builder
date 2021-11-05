import { gt } from '../dist';

describe('gt()', () => {
  it('should return "less-then"-operator', () => {
    expect(gt(100).toString()).toBe('>100');
    expect(gt('string').toString()).toBe('>string');
    expect(gt('string with spaces').toString()).toBe('>"string with spaces"');
    expect(gt('"quoted" string').toString()).toBe('>"\\"quoted\\" string"');
  });
});
