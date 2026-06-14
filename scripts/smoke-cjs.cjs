const assert = require('node:assert/strict');

const rsqlBuilder = require('rsql-builder');

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

const topLevel = { ...rsqlBuilder };
delete topLevel.default;

assert.deepStrictEqual(Object.keys(topLevel).sort(), expectedExports);

for (const key of expectedExports) {
  assert.ok(topLevel[key], `Expected ${key} to be exported`);
}
