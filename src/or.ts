import { Comparison } from './comparison';
import { GroupType } from './comparison-group';

export default function or(...comparisons: Array<Comparison | string>): string {
  return comparisons.join(GroupType.OR);
}
