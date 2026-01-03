import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { le } from '../dist/index.js';

describe('le()', () => {
  it('should return "less-then-or-equal"-operation', () => {
    assert.strictEqual(le(100).toString(), '<=100');
    assert.strictEqual(le('string').toString(), '<=string');
    assert.strictEqual(le('string with spaces').toString(), '<="string with spaces"');
    assert.strictEqual(le('"quoted" string').toString(), '<="\\"quoted\\" string"');
  });
});
