import { Operation, Operators } from './operation';

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
export default function lt(argument: any): Operation {
  return new Operation(argument, Operators.LESS_THAN);
}
