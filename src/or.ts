import { Comparison, GroupType } from './comparison.js';

/**
 * Create "or"-group operation
 *
 * @param argument Operation argument
 * @returns Less-or-equal operation
 *
 * @example
 * import {cmp, eq, ge, or} from 'rsql-builder';
 *
 * const op = or(
 *   cmp('year', ge(1980)),
 *   cmp('director', eq('*Nolan'))
 * );  // 'year>=1980,director==*Nolan
 *
 */
export function or(...comparisons: (Comparison | string)[]): string {
  return comparisons.join(GroupType.OR);
}
