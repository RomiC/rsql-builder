import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { or, eq, inList, comparison } from '../dist/index.js';

describe('or()', () => {
  it('should return or-expression string', () => {
    const operators = ['field1==val1', 'field2==20', 'field3=="escaped value"'];

    assert.strictEqual(or(...operators), 'field1==val1,field2==20,field3=="escaped value"');
  });

  describe('with tuple syntax', () => {
    it('should accept tuples with single-value operators', () => {
      assert.strictEqual(or(['field1', eq, 'val']), 'field1==val');
    });

    it('should accept tuples with multi-value operators', () => {
      assert.strictEqual(or(['genres', inList, 'sci-fi', 'action']), 'genres=in=(sci-fi,action)');
    });

    it('should mix tuples, strings and comparisons', () => {
      const query = or(['genres', inList, 'sci-fi', 'action'], comparison('director', eq('Nolan')), 'year>=2000');
      assert.strictEqual(query, 'genres=in=(sci-fi,action),director==Nolan,year>=2000');
    });
  });
});
