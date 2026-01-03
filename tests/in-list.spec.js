import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { inList } from '../dist/index.js';

describe('inList()', () => {
  it('should return in-list expression', () => {
    assert.strictEqual(
      inList('string', 'string*with*asterix', 'string with spaces', 999, '"quoted" string').toString(),
      '=in=(string,string*with*asterix,"string with spaces",999,"\\"quoted\\" string")'
    );
  });
});
