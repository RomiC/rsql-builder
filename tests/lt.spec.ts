import { lt } from '../dist';

describe('lt()', () => {
  it('should return "less-then"-operator', () => {
    expect(lt(100).toString()).toBe('<100');
    expect(lt('string').toString()).toBe('<string');
    expect(lt('string with spaces').toString()).toBe('<"string with spaces"');
    expect(lt('"quoted" string').toString()).toBe('<"\\"quoted\\" string"');
  });
});
