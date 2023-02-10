import { Store } from './store.class';

export interface IUpdateStateFunction<GState, GArguments extends any[]> {
  (
    state: GState,
    ...args: GArguments
  ): GState,
}

export class Action<GState, GArguments extends any[]> {
  protected _store: Store<GState>;
  protected _update: IUpdateStateFunction<GState, GArguments>;

  constructor(
    store: Store<GState>,
    update: IUpdateStateFunction<GState, GArguments>,
  ) {
    this._store = store;
    this._update = update;
  }

  get store(): Store<GState> {
    return this._store;
  }

  invoke(
    ...args: GArguments
  ): void {
    return this._store.$state(
      this._update(
        this._store.state,
        ...args,
      ),
    );
  }
}
