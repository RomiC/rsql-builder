import { Operation, Operators } from './operation';

export default function ne(value: any): Operation {
  return new Operation(value, Operators.NOT_EQUAL);
}
