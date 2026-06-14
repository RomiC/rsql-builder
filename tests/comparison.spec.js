import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeValue,
  Operation,
  Operators,
  comparison,
  eq,
  ne,
  ge,
  gt,
  le,
  lt,
  inList,
  outList
} from '../dist/index.js';

describe('comparison()', () => {
  describe('with Operation instance', () => {
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

  describe('with operator reference', () => {
    it('should work with eq', () => {
      assert.strictEqual(comparison('field', eq, 200).toString(), 'field==200');
      assert.strictEqual(comparison('field', eq, 'val').toString(), 'field==val');
      assert.strictEqual(comparison('field', eq, '').toString(), 'field==""');
      assert.strictEqual(comparison('field', eq, 'John Travolta').toString(), 'field=="John Travolta"');
    });

    it('should work with ne', () => {
      assert.strictEqual(comparison('field', ne, 300).toString(), 'field!=300');
    });

    it('should work with ge', () => {
      assert.strictEqual(comparison('field', ge, 2000).toString(), 'field>=2000');
      assert.strictEqual(comparison('field', ge, 'val').toString(), 'field>=val');
    });

    it('should work with gt', () => {
      assert.strictEqual(comparison('field', gt, 2003).toString(), 'field>2003');
    });

    it('should work with le', () => {
      assert.strictEqual(comparison('field', le, 200).toString(), 'field<=200');
    });

    it('should work with lt', () => {
      assert.strictEqual(comparison('field', lt, 2010).toString(), 'field<2010');
    });

    it('should work with inList', () => {
      assert.strictEqual(comparison('field', inList, 'sci-fi', 'action').toString(), 'field=in=(sci-fi,action)');
      assert.strictEqual(
        comparison('field', inList, 'sci-fi', 'action', 'non fiction').toString(),
        'field=in=(sci-fi,action,"non fiction")'
      );
    });

    it('should work with outList', () => {
      assert.strictEqual(comparison('field', outList, 'romance', 'horror').toString(), 'field=out=(romance,horror)');
    });
  });
});
