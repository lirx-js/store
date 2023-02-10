import { IMapFunction, IObservable, IObserver, IUnsubscribe } from '@lirx/core';

/**
 * TODO use @lirx/core one
 */
export function mapDistinctObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  selectFunction: IMapFunction<GIn, GOut>,
): IObservable<GOut> {
  return (emit: IObserver<GOut>): IUnsubscribe => {
    let previousValue: GOut;
    return subscribe((value: GIn): void => {
      const _value: GOut = selectFunction(value);
      if (_value !== previousValue) {
        previousValue = _value;
        emit(_value);
      }
    });
  };
}
