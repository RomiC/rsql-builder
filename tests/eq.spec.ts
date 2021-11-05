import { eq } from '../src';

describe('eq()', () => {
  it('should return "less-then"-operator', () => {
    expect(eq(100).toString()).toBe('==100');
    expect(eq(true).toString()).toBe('==true');
    expect(eq('string').toString()).toBe('==string');
    expect(eq('string with spaces').toString()).toBe('=="string with spaces"');
    expect(eq('"quoted" string').toString()).toBe('=="\\"quoted\\" string"');
  });
});
