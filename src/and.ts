import { Comparison } from './comparison';
import { GroupType } from './comparison-group';

function hasOrOperation(operation: string): boolean {
  let insideBracket: boolean = false;

  for (const char of operation) {
    switch (char) {
      case '(':
        insideBracket = true;
        break;

      case ')':
        insideBracket = false;
        break;

      case GroupType.OR:
        if (!insideBracket) {
          return true;
        }
        break;
    }
  }

  return false;
}

export default function and(
  ...comparisons: Array<Comparison | string>
): string {
  return comparisons
    .map((comparison) =>
      typeof comparison === 'string' && hasOrOperation(comparison)
        ? `(${comparison})`
        : comparison
    )
    .join(GroupType.AND);
}
