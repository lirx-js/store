import { IObservable } from '@lirx/core';
import { IReadStateFunction } from './types/read-state-function.type';

/** TYPES **/

export interface IReadonlyStoreInput<GState> {
  readonly getValue: IReadStateFunction<GState>;
  readonly subscribe: IObservable<GState>;
}

/** CLASS **/

export class ReadonlyStore<GState> {
  readonly #getState: IReadStateFunction<GState>;
  readonly #state$: IObservable<GState>;

  constructor(
    {
      getValue,
      subscribe,
    }: IReadonlyStoreInput<GState>,
  ) {
    this.#getState = getValue;
    this.#state$ = subscribe;
  }

  get getState(): IReadStateFunction<GState> {
    return this.#getState;
  }

  get state$(): IObservable<GState> {
    return this.#state$;
  }

  get state(): GState {
    return this.#getState();
  }
}

