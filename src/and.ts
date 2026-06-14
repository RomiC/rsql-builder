import { type Argument, Operation } from './operation';
import { type Comparison, GroupType, type ComparisonTuple } from './comparison';

function hasOrOperation(operation: string): boolean {
  let insideBracket = false;

  for (const char of operation) {
    switch (char) {
      case '(':
        insideBracket = true;
        break;

      case ')':
        insideBracket = false;
        break;

      case GroupType.OR:
        if (!insideBracket) {
          return true;
        }
        break;
    }
  }

  return false;
}

/**
 * Generate "and"-group of comparisons
 *
 * @param comparisons List of comparisons, strings, or comparison tuples
 * @returns "and"-group string
 *
 * @example
 * import {and, cmp, eq, ge} from 'rsql-builder';
 *
 * const op = and(
 *   cmp('year', ge(1980)),
 *   comparison('director', eq('Quentin Tarantino'))
 * );  // 'year>=1980;director=="Quentin Tarantino"
 *
 * @example <caption>With tuple syntax</caption>
 * import {and, eq, inList} from 'rsql-builder';
 *
 * const op = and(
 *   ['field1', eq, 'val'],
 *   ['field2', inList, 'foo', 'bar']
 * );  // 'field1==val;field2=in=(foo,bar)'
 *
 */
export function and(...comparisons: (Comparison | string)[]): string;
export function and(...comparisons: (Comparison | string | ComparisonTuple)[]): string;
export function and(...comparisons: (Comparison | string | ComparisonTuple)[]): string {
  return comparisons
    .map((entry) => {
      if (Array.isArray(entry)) {
        const [selector, operator, ...values] = entry;
        return `${selector}${(operator as (...args: Argument[]) => Operation)(...values).toString()}`;
      }
      if (typeof entry === 'string' && hasOrOperation(entry)) {
        return `(${entry})`;
      }
      return entry;
    })
    .join(GroupType.AND);
}
