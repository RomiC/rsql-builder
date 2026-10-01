import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { and, cmp, eq, ge, inList, comparison, or } from '../dist/index.js';

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

  describe('or-detection with special characters', () => {
    it('should wrap an or-group whose escaped value contains a parenthesis', () => {
      for (const value of ['*(*', '*)*', '((', '(",\'),;']) {
        const group = or(cmp('name', eq(value)), cmp('id', eq(1)));
        assert.strictEqual(and('owner==42', group), `owner==42;(${group})`, `value: ${value}`);
      }
    });

    it('should wrap an or-group after a closed nested group', () => {
      assert.strictEqual(and('a==1', '(b==1,c==1),d==1'), 'a==1;((b==1,c==1),d==1)');
      assert.strictEqual(and('a==1', 'b=in=(1,2),c==1'), 'a==1;(b=in=(1,2),c==1)');
    });

    it('should respect single quotes and backslash escapes', () => {
      assert.strictEqual(and('a==1', "b=='(',c==1"), "a==1;(b=='(',c==1)");
      assert.strictEqual(and('a==1', 'b=="\\"(",c==1'), 'a==1;(b=="\\"(",c==1)');
    });

    it('should not wrap when the comma is inside quotes or parentheses', () => {
      assert.strictEqual(and('a==1', 'b=="x,y"'), 'a==1;b=="x,y"');
      assert.strictEqual(and('a==1', "b=='x,y'"), "a==1;b=='x,y'");
      assert.strictEqual(and('a==1', '((b==1,c==1))'), 'a==1;((b==1,c==1))');
      assert.strictEqual(and('a==1', 'b==")";c==1'), 'a==1;b==")";c==1');
    });

    it('should wrap an or-group that uses the keyword or', () => {
      for (const entry of ['b==1 or c==1', 'b==1 OR c==1', 'b==1 orc==1', '(b==1)or(c==1)', 'b=="x"or c==1']) {
        assert.strictEqual(and('a==1', entry), `a==1;(${entry})`, `entry: ${entry}`);
      }
    });

    it('should not take or inside a word, quotes or a group for the keyword', () => {
      for (const entry of ['color==red', 'b==1;order==2', 'or==1', 'b==o', 'b=="x or y"', '(b==1 or c==1)']) {
        assert.strictEqual(and('a==1', entry), `a==1;${entry}`, `entry: ${entry}`);
      }
    });

    it('should wrap input with unbalanced parentheses or an open quote', () => {
      assert.strictEqual(and('a==1', 'b==1)'), 'a==1;(b==1))');
      assert.strictEqual(and('a==1', '(b==1'), 'a==1;((b==1)');
      assert.strictEqual(and('a==1', 'b=="open'), 'a==1;(b=="open)');
    });
  });
});
