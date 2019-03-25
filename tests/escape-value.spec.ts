import escapeValue from '../src/escape-value';

describe('escapeValue()', () => {
  it('should leave value as it is', () => {
    expect(escapeValue(200).toString()).toBe('200');
    expect(escapeValue('string').toString()).toBe('string');
    expect(escapeValue('string*with*asterix').toString()).toBe(
      'string*with*asterix'
    );
  });

  it('should quoted value', () => {
    expect(escapeValue('').toString()).toBe('""');
    expect(escapeValue('"quoted"').toString()).toBe('"\\"quoted\\""');
    expect(escapeValue('string with spaces').toString()).toBe(
      '"string with spaces"'
    );
  });
});
