import { Comparison } from './comparison';
import { GroupType } from './comparison-group';

function hasOrOperation(operation: string): boolean {
  let insideBracket: boolean = false;

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
 * @param comparisons List of comparisons or strings (for comparision group)
 * @returns "and"-group string
 *
 * @example
 * import {and, comparison, eq, ge} from 'rsql-builder';
 *
 * const op = and(
 *   comparison('year', ge(1980)),
 *   comparision('director', eq('Quentin Tarantino'))
 * );  // 'year>=1980;director=="Quentin Tarantino"
 */
export default function and(
  ...comparisons: (Comparison | string)[]
): string {
  return comparisons
    .map((comparison) =>
      typeof comparison === 'string' && hasOrOperation(comparison)
        ? `(${comparison})`
        : comparison
    )
    .join(GroupType.AND);
}
