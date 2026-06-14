import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeValue } from '../dist/escape-value.js';

describe('escapeValue()', () => {
  it('should leave value as it is', () => {
    assert.strictEqual(escapeValue(200).toString(), '200');
    assert.strictEqual(escapeValue('string').toString(), 'string');
    assert.strictEqual(escapeValue('string*with*asterix').toString(), 'string*with*asterix');
  });

  it('should quoted value', () => {
    assert.strictEqual(escapeValue('').toString(), '""');
    assert.strictEqual(escapeValue('"quoted"').toString(), '"\\"quoted\\""');
    assert.strictEqual(escapeValue('string with spaces').toString(), '"string with spaces"');
    assert.strictEqual(escapeValue('a\\b').toString(), '"a\\\\b"');
    assert.strictEqual(escapeValue('a\\b"c').toString(), '"a\\\\b\\"c"');
    assert.strictEqual(escapeValue('a\\\\b""').toString(), '"a\\\\\\\\b\\"\\""');
  });

  it('should throw on null or undefined', () => {
    assert.throws(() => escapeValue(null), TypeError);
    assert.throws(() => escapeValue(undefined), TypeError);
  });
});
