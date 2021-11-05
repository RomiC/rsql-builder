import { ne } from '../dist';

describe('ne()', () => {
  it('should return "not-equal"-operator', () => {
    expect(ne(100).toString()).toBe('!=100');
    expect(ne(true).toString()).toBe('!=true');
    expect(ne(undefined).toString()).toBe('!=undefined');
    expect(ne(null).toString()).toBe('!=null');
    expect(ne('string').toString()).toBe('!=string');
    expect(ne('string with spaces').toString()).toBe('!="string with spaces"');
    expect(ne('"quoted" string').toString()).toBe('!="\\"quoted\\" string"');
  });
});
