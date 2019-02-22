import { Operation, Operators } from './operation';

export default function eq(value: any): Operation {
  return new Operation(value, Operators.EQUAL);
}
