import { escapeValue, EscapedValue } from './escape-value';
import { Argument, Operation, Operators } from './operation';

/**
 * Create out-list operation
 *
 * @param args Operation argument
 * @returns out-list operation
 *
 * @example
 * import {outList} from 'rsql-builder';
 *
 * const op = outList(
 *  300,
 *  'Taran*',
 *  'John Travolta'
 * );  // '=out=(300,Taran*,"John Travolta")'
 */
export function outList(...args: Argument[]): Operation {
  return new Operation(new EscapedValue(`(${args.map(escapeValue).join(',')})`), Operators.OUT);
}
