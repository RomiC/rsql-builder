import { ListOperation, Operation, Operators } from './operation';

/**
 * Create out-list operation
 *
 * @param args Operation argument
 * @returns out-list operation
 *
 * @example
 * import {outList} from 'rsql-builder';
 *
 * const op = outList(
 *  300,
 *  'Taran*',
 *  'John Travolta'
 * );  // '=out=(300,Taran*,"John Travolta")'
 */
export default function outList(...args: any[]): Operation {
  return new ListOperation(args, Operators.OUT);
}
