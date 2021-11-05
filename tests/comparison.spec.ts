import { comparison, Operation, Operators } from '../src';

describe('comparison()', () => {
  it('should return the correct comparison', () => {
    expect(comparison('field', new Operation(200, Operators.EQUAL)).toString()).toBe('field==200');
    expect(comparison('field', new Operation('string', Operators.GREATER_OR_EQUAL)).toString()).toBe('field>=string');
    expect(comparison('field', new Operation('string with spaces', Operators.LESS_OR_EQUAL)).toString()).toBe(
      'field<="string with spaces"'
    );
    expect(comparison('field', new Operation('"quoted" string', Operators.LESS_THAN)).toString()).toBe(
      'field<"\\"quoted\\" string"'
    );
  });
});
