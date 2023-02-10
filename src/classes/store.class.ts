import { createMulticastReplayLastSource, IObservable, IObserver, mapObservable } from '@lirx/core';
import { Action, IUpdateStateFunction } from './action.class';
import { ISelectFunction, Selector } from './selector.class';

export interface IStoreInput<GState> {
  readonly getValue: () => GState;
  readonly emit: IObserver<GState>;
  readonly subscribe: IObservable<GState>;
}

export class Store<GState> {

  static create<GState>(
    initialState: GState,
  ): Store<GState> {
    return new Store<GState>(
      createMulticastReplayLastSource<GState>(initialState),
    );
  }

  static fromSource<GState>(
    input: IStoreInput<GState>,
  ): Store<GState> {
    return new Store<GState>(input);
  }

  protected _getState: () => GState;
  protected _$state: IObserver<GState>;
  protected _state$: IObservable<GState>;

  protected constructor(
    {
      getValue,
      emit,
      subscribe,
    }: IStoreInput<GState>,
  ) {
    this._getState = getValue;
    this._$state = emit;
    this._state$ = subscribe;
  }

  get state(): GState {
    return this._getState();
  }

  set state(
    value: GState,
  ) {
    this._$state(value);
  }

  get state$(): IObservable<GState> {
    return this._state$;
  }

  get $state(): IObserver<GState> {
    return this._$state;
  }

  select<GValue>(
    map: ISelectFunction<GState, GValue>,
  ): GValue {
    return map(this.state);
  }

  select$<GValue>(
    map: ISelectFunction<GState, GValue>,
  ): IObservable<GValue> {
    return mapObservable(this.state$, map);
  }

  createSelector<GValue>(
    map: ISelectFunction<GState, GValue>,
  ): Selector<GState, GValue> {
    return new Selector<GState, GValue>(
      this,
      map,
    );
  }

  createAction<GArguments extends any[]>(
    update: IUpdateStateFunction<GState, GArguments>,
  ): Action<GState, GArguments> {
    return new Action<GState, GArguments>(
      this,
      update,
    );
  }
}

