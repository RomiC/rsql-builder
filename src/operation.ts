import escapeValue, { EscapedValue } from './escape-value';

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

export class Operation {
  constructor(protected args: any, protected operator: Operators | string = Operators.EQUAL) {}

  toString(): string {
    return `${this.operator}${escapeValue(this.args)}`;
  }
}

export class ListOperation extends Operation {
  toString(): string {
    const escapedValue: EscapedValue = new EscapedValue(`(${this.args.map(escapeValue)})`);
    return `${this.operator}${escapedValue}`;
  }
}
