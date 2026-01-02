import { inList } from '../src';

describe('inList()', () => {
  it('should return in-list expression', () => {
    expect(inList('string', 'string*with*asterix', 'string with spaces', 999, '"quoted" string').toString()).toBe(
      '=in=(string,string*with*asterix,"string with spaces",999,"\\"quoted\\" string")'
    );
  });
});
