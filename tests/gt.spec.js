import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { gt } from '../dist/index.js';

describe('gt()', () => {
  it('should return "less-then"-operator', () => {
    assert.strictEqual(gt(100).toString(), '>100');
    assert.strictEqual(gt('string').toString(), '>string');
    assert.strictEqual(gt('string with spaces').toString(), '>"string with spaces"');
    assert.strictEqual(gt('"quoted" string').toString(), '>"\\"quoted\\" string"');
  });
});
