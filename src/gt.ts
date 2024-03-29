import { Argument, Operation, Operators } from './operation.js';
import { escapeValue } from './escape-value.js';

/**
 * Create greater-than operation
 *
 * @param argument Operation argument
 * @returns Greater-than operation
 *
 * @example
 * import {gt} from 'rsql-builder';
 *
 * const op1 = gt(300);  // '>300'
 * const op2 = gt('Taran*');  // '>Tarant*'
 * const op3 = gt('John Travolta');  // '>"John Travolta"'
 *
 */
export function gt(argument: Argument): Operation {
  return new Operation(escapeValue(argument), Operators.GREATER_THAN);
}
