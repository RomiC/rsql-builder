import or from '../src/or';

describe('or()', () => {
  it('should return or-expression string', () => {
    const operators = ['field1==val1', 'field2==20', 'field3=="escaped value"'];

    expect(or(...operators)).toBe(
      'field1==val1,field2==20,field3=="escaped value"'
    );
  });
});
