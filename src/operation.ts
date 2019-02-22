import escapeValue from './escape-value';

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
  private _args: any;
  private _operator: Operators;

  constructor(args: any, operator: Operators = Operators.EQUAL) {
    this._args = args;
    this._operator = operator;
  }

  toString(): string {
    return `${this._operator}${escapeValue(this._args)}`;
  }
}
