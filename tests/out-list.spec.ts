import { outList } from '../src/';

describe('outList()', () => {
  it('should return out-list expression', () => {
    expect(outList('string', 'string*with*asterix', 'string with spaces', 999, '"quoted" string').toString()).toBe(
      '=out=(string,string*with*asterix,"string with spaces",999,"\\"quoted\\" string")'
    );
  });
});
