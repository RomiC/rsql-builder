import { Comparison } from './comparison';
import { GroupType } from './comparison-group';

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
 *   comparision('director', eq('*Nolan'))
 * );  // 'year>=1980,director==*Nolan
 */
export default function or(...comparisons: (Comparison | string)[]): string {
  return comparisons.join(GroupType.OR);
}
