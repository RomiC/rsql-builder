import { ne } from '../src';

describe('ne()', () => {
  it('should return "not-equal"-operator', () => {
    expect(ne(100).toString()).toBe('!=100');
    expect(ne(true).toString()).toBe('!=true');
    expect(ne('string').toString()).toBe('!=string');
    expect(ne('string with spaces').toString()).toBe('!="string with spaces"');
    expect(ne('"quoted" string').toString()).toBe('!="\\"quoted\\" string"');
  });
});
