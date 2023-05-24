import { Argument, Operation, Operators } from './operation.js';

/**
 * Create equal operation
 *
 * @param argument Operation argument
 * @returns Equal operation
 *
 * @example
 * import {eq} from 'rsql-builder';
 *
 * const op1 = eq(300);  // '==300'
 * const op2 = eq('Taran*');  // '==Tarant*'
 * const op3 = eq('John Travolta');  // '=="John Travolta"'
 *
 */
export function eq(argument: Argument): Operation {
  return new Operation(argument, Operators.EQUAL);
}
