import { eq } from '../dist';

describe('eq()', () => {
  it('should return "less-then"-operator', () => {
    expect(eq(100).toString()).toBe('==100');
    expect(eq(true).toString()).toBe('==true');
    expect(eq(undefined).toString()).toBe('==undefined');
    expect(eq(null).toString()).toBe('==null');
    expect(eq('string').toString()).toBe('==string');
    expect(eq('string with spaces').toString()).toBe('=="string with spaces"');
    expect(eq('"quoted" string').toString()).toBe('=="\\"quoted\\" string"');
  });
});
