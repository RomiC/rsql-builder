import { ge } from '../dist';

describe('ge()', () => {
  it('should return "less-then"-operator', () => {
    expect(ge(100).toString()).toBe('>=100');
    expect(ge('string').toString()).toBe('>=string');
    expect(ge('string with spaces').toString()).toBe('>="string with spaces"');
    expect(ge('"quoted" string').toString()).toBe('>="\\"quoted\\" string"');
  });
});
