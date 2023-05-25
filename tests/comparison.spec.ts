import { cmp, Operation, Operators } from '../src';
import { escapeValue } from '../src/escape-value';

describe('cmp()', () => {
  it('should return the correct comparison', () => {
    expect(cmp('field', new Operation(200, Operators.EQUAL)).toString()).toBe('field==200');
    expect(cmp('field', new Operation('string', Operators.GREATER_OR_EQUAL)).toString()).toBe('field>=string');
    expect(cmp('field', new Operation('string with spaces', Operators.LESS_OR_EQUAL)).toString()).toBe(
      'field<=string with spaces'
    );
    expect(cmp('field', new Operation(escapeValue('string with spaces'), Operators.LESS_OR_EQUAL)).toString()).toBe(
      'field<="string with spaces"'
    );
    expect(cmp('field', new Operation('"quoted" string', Operators.LESS_THAN)).toString()).toBe(
      'field<"quoted" string'
    );
    expect(cmp('field', new Operation(escapeValue('"quoted" string'), Operators.LESS_THAN)).toString()).toBe(
      'field<"\\"quoted\\" string"'
    );
  });
});
