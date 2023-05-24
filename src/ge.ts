import { Argument, Operation, Operators } from './operation.js';

/**
 * Create greater-or-equal operation
 *
 * @param argument Operation argument
 * @returns Greater-or-equal operation
 *
 * @example
 * import {ge} from 'rsql-builder';
 *
 * const op1 = ge(300);  // '>=300'
 * const op2 = ge('Taran*');  // '>=Tarant*'
 * const op3 = ge('John Travolta');  // '>="John Travolta"'
 *
 */
export function ge(argument: Argument): Operation {
  return new Operation(argument, Operators.GREATER_OR_EQUAL);
}
