import { escapeValue } from '../src/escape-value';
import { Argument, Operation } from '../src/operation';

function customOperator(value: Argument): Operation {
  return new Operation(escapeValue(value), '=custom=');
}

describe('custom operator', () => {
  it('should return custom-expression string when a number is provided', () => {
    expect(customOperator(100).toString()).toBe('=custom=100');
  });

  it('should return custom-expression string when a string is provided', () => {
    expect(customOperator('string').toString()).toBe('=custom=string');
  });

  it('should return custom-expression string when a string with spaces is provided', () => {
    expect(customOperator('"quoted" string').toString()).toBe('=custom="\\"quoted\\" string"');
  });

  it('should return custom-expression string when a string with quotes is provided', () => {
    expect(customOperator('"quoted" string').toString()).toBe('=custom="\\"quoted\\" string"');
  });
});
