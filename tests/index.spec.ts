import { Comparison, and, cmp, comparison, eq, escapeValue, ge, gt, inList, le, lt, ne, or, outList } from '../src';

describe('Functional tests', () => {
  it('should export public functions', () => {
    expect(typeof and).toBe('function');
    expect(typeof cmp).toBe('function');
    expect(typeof comparison).toBe('function');
    expect(cmp).toBe(comparison);
    expect(typeof eq).toBe('function');
    expect(typeof ge).toBe('function');
    expect(typeof gt).toBe('function');
    expect(typeof inList).toBe('function');
    expect(typeof le).toBe('function');
    expect(typeof lt).toBe('function');
    expect(typeof ne).toBe('function');
    expect(typeof or).toBe('function');
    expect(typeof outList).toBe('function');
    expect(typeof Comparison).toBe('function');
    expect(typeof escapeValue).toBe('function');
  });

  it('should build the query', () => {
    expect(and(cmp('name', eq('')), cmp('year', gt(2003)))).toBe('name=="";year>2003');

    expect(and(cmp('name', eq('Kill Bill')), cmp('year', gt(2003)))).toBe('name=="Kill Bill";year>2003');

    expect(
      and(
        cmp('genres', inList('sci-fi', 'action', 'non fiction')),
        or(cmp('director', eq('Christopher Nolan')), cmp('actor', eq('*Bale'))),
        cmp('year', ge(2000))
      )
    ).toBe('genres=in=(sci-fi,action,"non fiction");(director=="Christopher Nolan",actor==*Bale);year>=2000');

    expect(and(cmp('director.lastName', eq('Nolan')), cmp('year', ge(2000)), cmp('year', lt(2010)))).toBe(
      'director.lastName==Nolan;year>=2000;year<2010'
    );

    expect(
      or(
        and(cmp('genres', inList('sci-fi', 'action')), cmp('genres', outList('romance', 'animated', 'horror'))),
        cmp('director', eq('Que*Tarantino'))
      )
    ).toBe('genres=in=(sci-fi,action);genres=out=(romance,animated,horror),director==Que*Tarantino');

    expect(or(cmp('genres', inList('sci-fi', 'action')), cmp('director', eq('Que*Tarantino')))).toBe(
      'genres=in=(sci-fi,action),director==Que*Tarantino'
    );

    expect(
      and(
        cmp('year', ge(1980)),
        or(cmp('genres', inList('sci-fi', 'action')), cmp('year', le(2000))),
        cmp('director.lastName', ne('Tarant*'))
      )
    ).toBe('year>=1980;(genres=in=(sci-fi,action),year<=2000);director.lastName!=Tarant*');
  });
});
