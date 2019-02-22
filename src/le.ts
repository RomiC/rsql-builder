import { Operation, Operators } from './operation';

export default function le(value: any): Operation {
  return new Operation(value, Operators.LESS_OR_EQUAL);
}
