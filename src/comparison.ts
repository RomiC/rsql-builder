import { type Argument, Operation } from './operation';

/**
 * Operator function reference type.
 * Accepts one or more arguments and returns an {@link Operation}.
 */
export type Operator = ((value: Argument) => Operation) | ((...args: Argument[]) => Operation);

/**
 * A tuple representing a field comparison without creating a {@link Comparison} instance.
 * Useful as a shorthand inside {@link and} and {@link or}.
 *
 * @example
 * ['field1', eq, 'val']
 * ['field2', inList, 'foo', 'bar', 'baz']
 */
export type ComparisonTuple = [fieldName: string, operator: Operator, ...values: Argument[]];

/**
 * Comparison groups delimiters
 */
export const enum GroupType {
  AND = ';',
  OR = ','
}

export class Comparison {
  constructor(
    private selector: string,
    private operation: Operation
  ) {}

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
 */
export function comparison(selector: string, operation: Operation): Comparison;

/**
 * Create comparison object using an operator reference with values.
 *
 * @param selector Field name
 * @param operator Operator function (e.g. {@link eq}, {@link ge}, {@link inList})
 * @param values Arguments for the operator
 * @returns Instance of Comparison
 *
 * @example
 * import {comparison, eq} from 'rsql-builder';
 *
 * // Single argument:
 * const comp = comparison('field1', eq, 200);  // 'field1==200'
 *
 * // Multiple arguments:
 * import {inList} from 'rsql-builder';
 * const comp2 = comparison('field2', inList, 'foo', 'bar');  // 'field2=in=(foo,bar)'
 *
 * See also {@link ComparisonTuple} for use inside {@link and} / {@link or}.
 */
export function comparison(selector: string, operator: Operator, ...values: Argument[]): Comparison;

export function comparison(
  selector: string,
  operatorOrOperation: Operation | Operator,
  ...values: Argument[]
): Comparison {
  if (operatorOrOperation instanceof Operation) {
    return new Comparison(selector, operatorOrOperation);
  }

  return new Comparison(selector, (operatorOrOperation as (...args: Argument[]) => Operation)(...values));
}
