import { Argument, Operation, Operators } from './operation';

/**
 * Create less-than operation
 *
 * @param argument Operation argument
 * @returns Less-than operation
 *
 * @example
 * import {lt} from 'rsql-builder';
 *
 * const op1 = lt(300);  // '<300'
 * const op2 = lt('Taran*');  // '<Tarant*'
 * const op3 = lt('John Travolta');  // '<"John Travolta"'
 */
export function lt(argument: Argument): Operation {
  return new Operation(argument, Operators.LESS_THAN);
}
