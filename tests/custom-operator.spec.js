import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Operation, escapeValue } from '../dist/index.js';

function customOperator(value) {
  return new Operation(escapeValue(value), '=custom=');
}

function customListOperator(value) {
  return new Operation(`(${escapeValue(value)})`, '=customListOperator=');
}

describe('custom operator', () => {
  it('should return custom-expression string when a number is provided', () => {
    assert.strictEqual(customOperator(100).toString(), '=custom=100');
  });

  it('should return custom-expression string when a string is provided', () => {
    assert.strictEqual(customOperator('string').toString(), '=custom=string');
  });

  it('should return custom-expression string when a string with spaces is provided', () => {
    assert.strictEqual(customOperator('"quoted" string').toString(), '=custom="\\"quoted\\" string"');
  });

  it('should return custom-expression string when a string with quotes is provided', () => {
    assert.strictEqual(customOperator('"quoted" string').toString(), '=custom="\\"quoted\\" string"');
  });
});

describe('custom list operator', () => {
  it('should return custom-expression string when a number is provided', () => {
    assert.strictEqual(customListOperator(['first', 'second']).toString(), '=customListOperator=(first,second)');
  });
});
