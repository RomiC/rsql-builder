import { escapeValue, EscapedValue } from './escape-value';

/**
 * Operators signs
 */
export enum Operators {
  EQUAL = '==',
  NOT_EQUAL = '!=',
  LESS_THAN = '<',
  LESS_OR_EQUAL = '<=',
  GREATER_THAN = '>',
  GREATER_OR_EQUAL = '>=',
  IN = '=in=',
  OUT = '=out='
}

export type Argument = number | string | boolean | EscapedValue;

export class Operation {
  constructor(private args: Argument, private operator: Operators | string = Operators.EQUAL) {}

  toString(): string {
    return `${this.operator}${escapeValue(this.args).toString()}`;
  }
}
