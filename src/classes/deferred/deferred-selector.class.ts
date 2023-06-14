import { ISelectFunction, ISelectorOptions, Selector } from '../selector.class';
import { Store } from '../store.class';

export class DeferredSelector<GState, GValue> {
  readonly #map: ISelectFunction<GState, GValue>;
  readonly #options: ISelectorOptions<GState, GValue> | undefined;

  constructor(
    map: ISelectFunction<GState, GValue>,
    options?: ISelectorOptions<GState, GValue>,
  ) {
    this.#map = map;
    this.#options = options;
  }

  create(
    store: Store<GState>,
  ): Selector<GState, GValue> {
    return new Selector<GState, GValue>(
      store,
      this.#map,
      this.#options,
    );
  }
}
