import { type Argument, Operation } from './operation';
import { type Comparison, GroupType, type ComparisonTuple } from './comparison';

/**
 * Checks whether an expression has an "or" on its top level, i.e. must be wrapped in parentheses
 * before it is joined into an "and"-group.
 *
 * Tracks the nesting depth and skips quoted values (`"…"` or `'…'`, a backslash escapes the next
 * character), so a `(`, `)` or `,` inside a value does not count. Input that cannot be reasoned
 * about (unbalanced parentheses, an unterminated quote) is reported as needing parentheses, since
 * redundant parentheses are always safe.
 */
function hasOrOperation(operation: string): boolean {
  let depth = 0;
  let quote: string | undefined;
  let escaped = false;

  for (const char of operation) {
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
