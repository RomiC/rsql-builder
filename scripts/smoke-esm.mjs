import assert from 'node:assert/strict';

import * as rsqlBuilder from 'rsql-builder';

const expectedExports = [
  'and',
  'comparison',
  'cmp',
  'Comparison',
  'eq',
  'ge',
  'gt',
  'inList',
  'le',
  'lt',
  'ne',
  'or',
  'outList',
  'Operation',
  'Operators',
  'escapeValue'
].sort();

assert.deepStrictEqual(expectedExports, Object.keys(rsqlBuilder).sort());
