import { ImmutableArray } from './immutable-array.type';

export type ImmutableArrayShiftResult<GValue> = [
  array: ImmutableArray<GValue>,
  value: GValue,
];

export function immutableArrayShift<GValue>(
  source: ImmutableArray<GValue>,
): ImmutableArrayShiftResult<GValue> {
  return [
    source.slice(1),
    source[0],
  ];
}
