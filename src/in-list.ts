import escapeValue, { EscapedValue } from './escape-value';
import { Operation, Operators } from './operation';

/**
 * Create in-list operation
 *
 * @param args Operation argument
 * @returns In-list operation
 *
 * @example
 * import {inList} from 'rsql-builder';
 *
 * const op = inList(
 *  300,
 *  'Taran*',
 *  'John Travolta'
 * );  // '=in=(300,Taran*,"John Travolta")'
 */
export default function inList(...args: any[]): Operation {
  return new Operation(
    new EscapedValue(`(${args.map(escapeValue)})`),
    Operators.IN
  );
}
