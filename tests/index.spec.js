import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  Comparison,
  and,
  cmp,
  comparison,
  eq,
  escapeValue,
  ge,
  gt,
  inList,
  le,
  lt,
  ne,
  or,
  outList
} from '../dist/index.js';

describe('Functional tests', () => {
  it('should export public functions', () => {
    assert.strictEqual(typeof and, 'function');
    assert.strictEqual(typeof cmp, 'function');
    assert.strictEqual(typeof comparison, 'function');
    assert.strictEqual(cmp, comparison);
    assert.strictEqual(typeof eq, 'function');
    assert.strictEqual(typeof ge, 'function');
    assert.strictEqual(typeof gt, 'function');
    assert.strictEqual(typeof inList, 'function');
    assert.strictEqual(typeof le, 'function');
    assert.strictEqual(typeof lt, 'function');
    assert.strictEqual(typeof ne, 'function');
    assert.strictEqual(typeof or, 'function');
    assert.strictEqual(typeof outList, 'function');
    assert.strictEqual(typeof Comparison, 'function');
    assert.strictEqual(typeof escapeValue, 'function');
  });

  it('should build the query', () => {
    assert.strictEqual(and(cmp('name', eq('')), cmp('year', gt(2003))), 'name=="";year>2003');

    assert.strictEqual(and(cmp('name', eq('Kill Bill')), cmp('year', gt(2003))), 'name=="Kill Bill";year>2003');

    assert.strictEqual(
      and(
        cmp('genres', inList('sci-fi', 'action', 'non fiction')),
        or(cmp('director', eq('Christopher Nolan')), cmp('actor', eq('*Bale'))),
        cmp('year', ge(2000))
      ),
      'genres=in=(sci-fi,action,"non fiction");(director=="Christopher Nolan",actor==*Bale);year>=2000'
    );

    assert.strictEqual(
      and(cmp('director.lastName', eq('Nolan')), cmp('year', ge(2000)), cmp('year', lt(2010))),
      'director.lastName==Nolan;year>=2000;year<2010'
    );

    assert.strictEqual(
      or(
        and(cmp('genres', inList('sci-fi', 'action')), cmp('genres', outList('romance', 'animated', 'horror'))),
        cmp('director', eq('Que*Tarantino'))
      ),
      'genres=in=(sci-fi,action);genres=out=(romance,animated,horror),director==Que*Tarantino'
    );

    assert.strictEqual(
      or(cmp('genres', inList('sci-fi', 'action')), cmp('director', eq('Que*Tarantino'))),
      'genres=in=(sci-fi,action),director==Que*Tarantino'
    );

    assert.strictEqual(
      and(
        cmp('year', ge(1980)),
        or(cmp('genres', inList('sci-fi', 'action')), cmp('year', le(2000))),
        cmp('director.lastName', ne('Tarant*'))
      ),
      'year>=1980;(genres=in=(sci-fi,action),year<=2000);director.lastName!=Tarant*'
    );
  });
});
