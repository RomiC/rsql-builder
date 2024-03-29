import { Argument, Operation, Operators } from './operation.js';
import { escapeValue } from './escape-value.js';

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
 *
 */
export function outList(...args: Argument[]): Operation {
  return new Operation(`(${args.map(escapeValue).join(',')})`, Operators.OUT);
}
