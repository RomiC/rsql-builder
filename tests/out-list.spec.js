import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { outList } from '../dist/index.js';

describe('outList()', () => {
  it('should return out-list expression', () => {
    assert.strictEqual(
      outList('string', 'string*with*asterix', 'string with spaces', 999, '"quoted" string').toString(),
      '=out=(string,string*with*asterix,"string with spaces",999,"\\"quoted\\" string")'
    );
  });
});
