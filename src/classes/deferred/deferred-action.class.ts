import { Action, IUpdateStateFunction } from '../action.class';
import { Store } from '../store.class';

export class DeferredAction<GState, GArguments extends any[]> {
  readonly #update: IUpdateStateFunction<GState, GArguments>;

  constructor(
    update: IUpdateStateFunction<GState, GArguments>,
  ) {
    this.#update = update;
  }

  create(
    store: Store<GState>,
  ): Action<GState, GArguments> {
    return new Action<GState, GArguments>(
      store,
      this.#update,
    );
  }
}
