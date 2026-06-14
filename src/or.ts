import { type Argument, Operation } from './operation';
import { Comparison, GroupType, type ComparisonTuple } from './comparison';

/**
 * Create "or"-group operation
 *
 * @param comparisons List of comparisons, strings, or comparison tuples
 * @returns "or"-group string
 *
 * @example
 * import {cmp, eq, ge, or} from 'rsql-builder';
 *
 * const op = or(
 *   cmp('year', ge(1980)),
 *   cmp('director', eq('*Nolan'))
 * );  // 'year>=1980,director==*Nolan
 *
 * @example <caption>With tuple syntax</caption>
 * import {or, eq, inList} from 'rsql-builder';
 *
 * const op = or(
 *   ['field1', eq, 'val'],
 *   ['field2', inList, 'foo', 'bar']
 * );  // 'field1==val,field2=in=(foo,bar)'
 *
 */
export function or(...comparisons: (Comparison | string)[]): string;
export function or(...comparisons: (Comparison | string | ComparisonTuple)[]): string;
export function or(...comparisons: (Comparison | string | ComparisonTuple)[]): string {
  return comparisons
    .map((entry) => {
      if (Array.isArray(entry)) {
        const [selector, operator, ...values] = entry;
        return `${selector}${(operator as (...args: Argument[]) => Operation)(...values).toString()}`;
      }
      return entry;
    })
    .join(GroupType.OR);
}
