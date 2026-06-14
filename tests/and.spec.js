import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { and, cmp, eq, ge, inList, comparison } from '../dist/index.js';

describe('and()', () => {
  it('should return and-expression string', () => {
    const operators = [
      'field1==val1',
      'field2==20',
      'field3=="escaped value"',
      'field4=a,field5=b',
      'field6=in=(a,b,c)'
    ];

    assert.strictEqual(
      and(...operators),
      'field1==val1;field2==20;field3=="escaped value";(field4=a,field5=b);field6=in=(a,b,c)'
    );
  });

  describe('with tuple syntax', () => {
    it('should accept tuples with single-value operators', () => {
      assert.strictEqual(and(['field1', eq, 'val']), 'field1==val');
    });

    it('should accept tuples with multi-value operators', () => {
      assert.strictEqual(
        and(['genres', inList, 'sci-fi', 'action', 'non fiction']),
        'genres=in=(sci-fi,action,"non fiction")'
      );
    });

    it('should mix tuples, strings and comparisons', () => {
      const query = and(['genres', inList, 'sci-fi', 'action'], comparison('director', eq('Nolan')), 'year>=2000');
      assert.strictEqual(query, 'genres=in=(sci-fi,action);director==Nolan;year>=2000');
    });

    it('should wrap or-containing strings in parens', () => {
      const query = and(['genres', inList, 'sci-fi', 'action'], 'director==Nolan,actor==Bale');
      assert.strictEqual(query, 'genres=in=(sci-fi,action);(director==Nolan,actor==Bale)');
    });

    it('should compose with and()', () => {
      const query = and(comparison('genres', inList, 'sci-fi', 'action', 'non fiction'), cmp('year', ge(2000)));
      assert.strictEqual(query, 'genres=in=(sci-fi,action,"non fiction");year>=2000');
    });

    it('should compose with and() using tuple syntax', () => {
      const query = and(['field1', eq, 'val'], ['field2', inList, 'foo', 'bar', 'baz']);
      assert.strictEqual(query, 'field1==val;field2=in=(foo,bar,baz)');
    });
  });
});
