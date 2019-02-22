import { Operation, Operators } from './operation';

export default function lt(value: any): Operation {
  return new Operation(value, Operators.LESS_THAN);
}
