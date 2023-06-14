import { Store } from './store.class';

export interface IUpdateStateFunction<GState, GArguments extends any[]> {
  (
    state: GState,
    ...args: GArguments
  ): GState,
}

export class Action<GState, GArguments extends any[]> {
  readonly #store: Store<GState>;
  readonly #update: IUpdateStateFunction<GState, GArguments>;

  constructor(
    store: Store<GState>,
    update: IUpdateStateFunction<GState, GArguments>,
  ) {
    this.#store = store;
    this.#update = update;
  }

  get store(): Store<GState> {
    return this.#store;
  }

  invoke(
    ...args: GArguments
  ): void {
    return this.#store.$state(
      this.#update(
        this.#store.state,
        ...args,
      ),
    );
  }
}
