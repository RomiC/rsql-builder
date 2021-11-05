import { le } from '../dist';

describe('le()', () => {
  it('should return "less-then-or-equal"-operation', () => {
    expect(le(100).toString()).toBe('<=100');
    expect(le('string').toString()).toBe('<=string');
    expect(le('string with spaces').toString()).toBe('<="string with spaces"');
    expect(le('"quoted" string').toString()).toBe('<="\\"quoted\\" string"');
  });
});
