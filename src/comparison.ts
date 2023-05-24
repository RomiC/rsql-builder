import { Operation } from './operation.js';

/**
 * Comparison groups delimiters
 *
 */
export const enum GroupType {
  AND = ';',
  OR = ','
}

export class Comparison {
  constructor(private selector: string, private operation: Operation) {}

  toString(): string {
    return `${this.selector}${this.operation.toString()}`;
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
 *
 */
export function comparison(selector: string, operation: Operation): Comparison {
  return new Comparison(selector, operation);
}
