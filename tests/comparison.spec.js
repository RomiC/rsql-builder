import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeValue, Operation, Operators } from '../dist/index.js';
import { comparison } from '../dist/comparison.js';

describe('comparison()', () => {
  it('should return the correct comparison', () => {
    assert.strictEqual(comparison('field', new Operation(200, Operators.EQUAL)).toString(), 'field==200');
    assert.strictEqual(
      comparison('field', new Operation('string', Operators.GREATER_OR_EQUAL)).toString(),
      'field>=string'
    );
    assert.strictEqual(
      comparison('field', new Operation('string with spaces', Operators.LESS_OR_EQUAL)).toString(),
      'field<=string with spaces'
    );
    assert.strictEqual(
      comparison('field', new Operation(escapeValue('string with spaces'), Operators.LESS_OR_EQUAL)).toString(),
      'field<="string with spaces"'
    );
    assert.strictEqual(
      comparison('field', new Operation('"quoted" string', Operators.LESS_THAN)).toString(),
      'field<"quoted" string'
    );
    assert.strictEqual(
      comparison('field', new Operation(escapeValue('"quoted" string'), Operators.LESS_THAN)).toString(),
      'field<"\\"quoted\\" string"'
    );
  });
});
