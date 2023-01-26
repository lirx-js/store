import { ImmutableArray } from './immutable-array.type';

export function immutableArrayReverse<GValue>(
  source: ImmutableArray<GValue>,
): ImmutableArray<GValue> {
  return source.slice().reverse();
}
