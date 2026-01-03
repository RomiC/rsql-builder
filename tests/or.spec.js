import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { or } from '../dist/index.js';

describe('or()', () => {
  it('should return or-expression string', () => {
    const operators = ['field1==val1', 'field2==20', 'field3=="escaped value"'];

    assert.strictEqual(or(...operators), 'field1==val1,field2==20,field3=="escaped value"');
  });
});
