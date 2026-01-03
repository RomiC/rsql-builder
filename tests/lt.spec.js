import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { lt } from '../dist/index.js';

describe('lt()', () => {
  it('should return "less-then"-operator', () => {
    assert.strictEqual(lt(100).toString(), '<100');
    assert.strictEqual(lt('string').toString(), '<string');
    assert.strictEqual(lt('string with spaces').toString(), '<"string with spaces"');
    assert.strictEqual(lt('"quoted" string').toString(), '<"\\"quoted\\" string"');
  });
});
