import { Argument, Operation, Operators } from './operation.js';
import { escapeValue } from './escape-value.js';

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
 *
 */
export function inList(...args: Argument[]): Operation {
  return new Operation(`(${args.map(escapeValue).join(',')})`, Operators.IN);
}
