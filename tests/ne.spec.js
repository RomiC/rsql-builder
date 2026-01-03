import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ne } from '../dist/index.js';

describe('ne()', () => {
  it('should return "not-equal"-operator', () => {
    assert.strictEqual(ne(100).toString(), '!=100');
    assert.strictEqual(ne(true).toString(), '!=true');
    assert.strictEqual(ne('string').toString(), '!=string');
    assert.strictEqual(ne('string with spaces').toString(), '!="string with spaces"');
    assert.strictEqual(ne('"quoted" string').toString(), '!="\\"quoted\\" string"');
  });
});
