import { Argument, Operation, Operators } from './operation.js';
import { escapeValue } from './escape-value.js';

/**
 * Create not-equal operation
 *
 * @param argument Operation argument
 * @returns Not-equal operation
 *
 * @example
 * import {ne} from 'rsql-builder';
 *
 * const op1 = ne(300);  // '!=300'
 * const op2 = ne('Taran*');  // '!=Tarant*'
 * const op3 = ne('John Travolta');  // '!="John Travolta"'
 *
 */
export function ne(argument: Argument): Operation {
  return new Operation(escapeValue(argument), Operators.NOT_EQUAL);
}
