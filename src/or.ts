import { Comparison, GroupType } from './comparison';

/**
 * Create "or"-group operation
 *
 * @param argument Operation argument
 * @returns Less-or-equal operation
 *
 * @example
 * import {comparison, eq, ge, or} from 'rsql-builder';
 *
 * const op = or(
 *   comparison('year', ge(1980)),
 *   comparison('director', eq('*Nolan'))
 * );  // 'year>=1980,director==*Nolan
 */
export default function or(...comparisons: (Comparison | string)[]): string {
  return comparisons.join(GroupType.OR);
}
