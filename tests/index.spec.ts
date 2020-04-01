import {
  and,
  comparison,
  eq,
  ge,
  gt,
  inList,
  le,
  like,
  lt,
  ne,
  or,
  outList
} from '../src';

describe('Functional tests', () => {
  it('should export public functions', () => {
    expect(typeof and).toBe('function');
    expect(typeof comparison).toBe('function');
    expect(typeof eq).toBe('function');
    expect(typeof ge).toBe('function');
    expect(typeof gt).toBe('function');
    expect(typeof inList).toBe('function');
    expect(typeof le).toBe('function');
    expect(typeof lt).toBe('function');
    expect(typeof ne).toBe('function');
    expect(typeof or).toBe('function');
    expect(typeof outList).toBe('function');
  });

  it('should build the query', () => {
    expect(and(comparison('name', eq('')), comparison('year', gt(2003)))).toBe(
      'name=="";year>2003'
    );

    expect(
      and(comparison('name', eq('Kill Bill')), comparison('year', gt(2003)))
    ).toBe('name=="Kill Bill";year>2003');

    expect(
      and(
        comparison('genres', inList('sci-fi', 'action', 'non fiction')),
        or(
          comparison('director', eq('Christopher Nolan')),
          comparison('actor', eq('*Bale'))
        ),
        comparison('year', ge(2000))
      )
    ).toBe(
      'genres=in=(sci-fi,action,"non fiction");(director=="Christopher Nolan",actor==*Bale);year>=2000'
    );

    expect(
      and(
        comparison('director.lastName', eq('Nolan')),
        comparison('year', ge(2000)),
        comparison('year', lt(2010))
      )
    ).toBe('director.lastName==Nolan;year>=2000;year<2010');

    expect(
      or(
        and(
          comparison('genres', inList('sci-fi', 'action')),
          comparison('genres', outList('romance', 'animated', 'horror'))
        ),
        comparison('director', eq('Que*Tarantino'))
      )
    ).toBe(
      'genres=in=(sci-fi,action);genres=out=(romance,animated,horror),director==Que*Tarantino'
    );

    expect(
      and(
        comparison('title', like('Batman')),
        comparison('year', lt(2010))
      )
    ).toBe(
      'title=like=Batman;year<2010'
    );

    expect(
      and(
        comparison('title', like('Batman and Robin')),
        comparison('year', lt(2010))
      )
    ).toBe(
      'title=like="Batman and Robin";year<2010'
    );

    expect(
      or(
        comparison('genres', inList('sci-fi', 'action')),
        comparison('director', eq('Que*Tarantino'))
      )
    ).toBe('genres=in=(sci-fi,action),director==Que*Tarantino');

    expect(
      and(
        comparison('year', ge(1980)),
        or(
          comparison('genres', inList('sci-fi', 'action')),
          comparison('year', le(2000))
        ),
        comparison('director.lastName', ne('Tarant*'))
      )
    ).toBe(
      'year>=1980;(genres=in=(sci-fi,action),year<=2000);director.lastName!=Tarant*'
    );
  });
});
