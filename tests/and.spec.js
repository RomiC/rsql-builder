import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { and } from '../dist/index.js';

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
});
