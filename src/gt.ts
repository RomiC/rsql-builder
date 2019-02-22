import { Operation, Operators } from './operation';

export default function gt(value: any): Operation {
  return new Operation(value, Operators.GREATER_THAN);
}
