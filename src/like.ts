import { Operation, Operators } from './operation';

/**
 * Create like operation
 *
 * @param argument Operation argument
 * @returns Like operation
 *
 * @example
 * import {like} from 'rsql-builder';
 *
 * const op1 = like(300);  // '=like=300'
 * const op2 = like('Taran*');  // '=like=Tarant*'
 * const op3 = like('John Travolta');  // '=like="John Travolta"'
 */
export default function like(argument: any): Operation {
  return new Operation(argument, Operators.LIKE);
}
