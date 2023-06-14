import { createMulticastReplayLastSource, IObservable, IObserver, mapObservable } from '@lirx/core';
import { Action, IUpdateStateFunction } from './action.class';
import { ISelectFunction, ISelectorOptions, Selector } from './selector.class';
import { IReadStateFunction } from './types/read-state-function.type';

export interface IStoreInput<GState> {
  readonly getValue: IReadStateFunction<GState>;
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

  readonly #getState: IReadStateFunction<GState>;
  readonly #$state: IObserver<GState>;
  readonly #state$: IObservable<GState>;

  protected constructor(
    {
      getValue,
      emit,
      subscribe,
    }: IStoreInput<GState>,
  ) {
    this.#getState = getValue;
    this.#$state = emit;
    this.#state$ = subscribe;
  }

  get getState(): IReadStateFunction<GState> {
    return this.#getState;
  }

  get state$(): IObservable<GState> {
    return this.#state$;
  }

  get $state(): IObserver<GState> {
    return this.#$state;
  }


  get state(): GState {
    return this.#getState();
  }

  set state(
    value: GState,
  ) {
    this.#$state(value);
  }

  // select<GValue>(
  //   map: ISelectFunction<GState, GValue>,
  // ): GValue {
  //   return map(this.state);
  // }
  //
  // select$<GValue>(
  //   map: ISelectFunction<GState, GValue>,
  // ): IObservable<GValue> {
  //   return mapObservable(this.state$, map);
  // }

  createSelector<GValue>(
    map: ISelectFunction<GState, GValue>,
    options?: ISelectorOptions<GState, GValue>,
  ): Selector<GState, GValue> {
    return new Selector<GState, GValue>(
      this,
      map,
      options,
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

