import escapeValue, { EscapedValue } from './escape-value';
import { Operation, Operators } from './operation';

export default function outList(...list: any[]): Operation {
  return new Operation(
    new EscapedValue(`(${list.map(escapeValue)})`),
    Operators.OUT
  );
}
