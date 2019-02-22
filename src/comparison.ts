import { Operation } from './operation';

export class Comparison {
  private _selector: string;
  private _operation: Operation;

  constructor(selector: string, operation: Operation) {
    this._selector = selector;
    this._operation = operation;
  }

  toString(): string {
    return `${this._selector}${this._operation}`;
  }
}

/**
 * Create comparison object
 *
 * @param selector Field name
 * @param operation Operation-instance
 * @returns Instance of Comparison
 *
 * @example
 * import {comparison, eq} from 'rsql-builder';
 *
 * const comp = comparison('field1', eq(200));  // 'field1==200'
 */
export default function comparison(
  selector: string,
  operation: Operation
): Comparison {
  return new Comparison(selector, operation);
}
