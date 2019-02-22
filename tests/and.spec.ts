import and from '../src/and';

describe('and()', () => {
  it('should return and-expression string', () => {
    const operators = [
      'field1==val1',
      'field2==20',
      'field3=="escaped value"',
      'field4=a,field5=b',
      'field6=in=(a,b,c)'
    ];

    expect(and(...operators)).toBe(
      'field1==val1;field2==20;field3=="escaped value";(field4=a,field5=b);field6=in=(a,b,c)'
    );
  });
});
