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

export default function comparison(
  selector: string,
  operation: Operation
): Comparison {
  return new Comparison(selector, operation);
}
