import { createMulticastReplayLastSource, IObserver } from '@lirx/core';
import { ReadonlyStore, IReadonlyStoreInput } from './readonly-store.class';

/** TYPES**/

export interface IStoreInput<GState> extends IReadonlyStoreInput<GState> {
  readonly emit: IObserver<GState>;
}

/** CLASS **/

export class Store<GState> extends ReadonlyStore<GState> {

  static create<GState>(
    initialState: GState,
  ): Store<GState> {
    return new Store<GState>(
      createMulticastReplayLastSource<GState>(initialState),
    );
  }

  readonly #$state: IObserver<GState>;

  constructor(
    {
      emit,
      ...options
    }: IStoreInput<GState>,
  ) {
    super(options);
    this.#$state = emit;
  }

  get $state(): IObserver<GState> {
    return this.#$state;
  }

  get state(): GState {
    return super.state;
  }

  set state(
    value: GState,
  ) {
    this.#$state(value);
  }
}

