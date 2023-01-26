import { ImmutableArray } from './immutable-array.type';

export type ImmutableArrayPopResult<GValue> = [
  array: ImmutableArray<GValue>,
  value: GValue,
];

export function immutableArrayPop<GValue>(
  source: ImmutableArray<GValue>,
): ImmutableArrayPopResult<GValue> {
  return [
    source.slice(0, source.length - 1),
    source[source.length - 1],
  ];
}
