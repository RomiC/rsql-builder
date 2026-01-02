import { Argument, Operation, Operators } from './operation';
import { escapeValue } from './escape-value';

/**
 * Create less-or-equal operation
 *
 * @param argument Operation argument
 * @returns Less-or-equal operation
 *
 * @example
 * import {le} from 'rsql-builder';
 *
 * const op1 = le(300);  // '<=300'
 * const op2 = le('Taran*');  // '<=Tarant*'
 * const op3 = le('John Travolta');  // '<="John Travolta"'
 *
 */
export function le(argument: Argument): Operation {
  return new Operation(escapeValue(argument), Operators.LESS_OR_EQUAL);
}
