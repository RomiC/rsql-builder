import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ge } from '../dist/index.js';

describe('ge()', () => {
  it('should return "less-then"-operator', () => {
    assert.strictEqual(ge(100).toString(), '>=100');
    assert.strictEqual(ge('string').toString(), '>=string');
    assert.strictEqual(ge('string with spaces').toString(), '>="string with spaces"');
    assert.strictEqual(ge('"quoted" string').toString(), '>="\\"quoted\\" string"');
  });
});
