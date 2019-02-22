import { Operation, Operators } from './operation';

export default function ge(value: any): Operation {
  return new Operation(value, Operators.GREATER_OR_EQUAL);
}
