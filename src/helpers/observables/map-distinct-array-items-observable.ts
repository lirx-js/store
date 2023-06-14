import { IMapFunction, IObservable, IObserver, IUnsubscribeOfObservable } from '@lirx/core';

export function mapDistinctArrayItemsObservable<GIn extends object, GOut>(
  subscribe: IObservable<readonly GIn[]>,
  mapFunction: IMapFunction<GIn, GOut>,
): IObservable<readonly GOut[]> {
  return (emit: IObserver<readonly GOut[]>): IUnsubscribeOfObservable => {
    const cache = new WeakMap<GIn, GOut>();

    return subscribe((items: readonly GIn[]): void => {
      emit(
        items.map((item: GIn): GOut => {
          if (!cache.has(item)) {
            cache.set(item, mapFunction(item));
          }
          return cache.get(item)!;
        }),
      );
    });
  };
}
