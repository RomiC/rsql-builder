import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { eq } from '../dist/index.js';

describe('eq()', () => {
  it('should return "less-then"-operator', () => {
    assert.strictEqual(eq(100).toString(), '==100');
    assert.strictEqual(eq(true).toString(), '==true');
    assert.strictEqual(eq('string').toString(), '==string');
    assert.strictEqual(eq('string with spaces').toString(), '=="string with spaces"');
    assert.strictEqual(eq('"quoted" string').toString(), '=="\\"quoted\\" string"');
  });
});
