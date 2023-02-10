import { IMapFunction, IObservable, mapObservable } from '@lirx/core';
import { mapDistinctArrayItemsObservable } from '../helpers/observables/map-distinct-array-items-observable';
import { mapDistinctObservable } from '../helpers/observables/map-distinct-observable';
import { Store } from './store.class';

export type ISelectFunction<GState, GValue> = IMapFunction<GState, GValue>;

// export type InferArrayItemValue<GValue> = GValue extends readonly (infer GItem)[]
//   ? GItem extends object
//     ? GItem
//     : { ERROR: "GValue is not an array of objects" }
//   : { ERROR: "GValue is not an array of objects" }
//   ;

export type InferMapArrayItemsMapFunction<GValue, GOut> = GValue extends readonly (infer GItem)[]
  ? GItem extends object
    ? IMapFunction<GItem, GOut>
    : { ERROR: "GValue is not an array of objects" }
  : { ERROR: "GValue is not an array of objects" }
  ;

export class Selector<GState, GValue> {
  protected _store: Store<GState>;
  protected _map: ISelectFunction<GState, GValue>;

  constructor(
    store: Store<GState>,
    map: ISelectFunction<GState, GValue>,
  ) {
    this._store = store;
    this._map = map;
  }

  get store(): Store<GState> {
    return this._store;
  }

  get(): GValue {
    return this._map(this._store.state);
  }

  get$(): IObservable<GValue> {
    return mapDistinctObservable(this._store.state$, this._map);
  }

  map$<GOut>(
    map: IMapFunction<GValue, GOut>,
  ): IObservable<GOut> {
    return mapObservable<GValue, GOut>(this.get$(), map);
  }

  mapArrayItems$<GOut>(
    map: InferMapArrayItemsMapFunction<GValue, GOut>,
  ): IObservable<readonly GOut[]> {
    return mapDistinctArrayItemsObservable<any, GOut>(
      this.get$() as any,
      map as any,
    );
  }
}
