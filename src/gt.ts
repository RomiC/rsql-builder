import { Argument, Operation, Operators } from './operation';

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
 */
export default function gt(argument: Argument): Operation {
  return new Operation(argument, Operators.GREATER_THAN);
}
