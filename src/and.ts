import { type Argument, Operation } from './operation';
import { type Comparison, GroupType, type ComparisonTuple } from './comparison';

const OR_KEYWORD_PRECEDER = /[\s)"']/;

function hasOrOperation(operation: string): boolean {
  let depth = 0;
  let quote: string | undefined;
  let escaped = false;

  for (let index = 0; index < operation.length; index++) {
    const char = operation[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    switch (char) {
      case '"':
      case "'":
        quote = char;
        break;

      case '(':
        depth++;
        break;

      case ')':
        depth--;
        if (depth < 0) {
          return true;
        }
        break;

      case GroupType.OR:
        if (depth === 0) {
          return true;
        }
        break;

      case 'o':
      case 'O':
        if (
          depth === 0 &&
          operation[index + 1]?.toLowerCase() === 'r' &&
          OR_KEYWORD_PRECEDER.test(operation[index - 1] ?? '')
        ) {
          return true;
        }
        break;
    }
  }

  return depth !== 0 || quote !== undefined;
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
