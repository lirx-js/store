import { Store } from './store.class';

/** QUEUE **/

const QUEUE = new WeakMap<Store<any>, Promise<void>>();

function getQueuePromise(
  store: Store<any>,
): Promise<void> {
  const promise: Promise<void> | undefined = QUEUE.get(store);
  return (promise === void 0)
    ? Promise.resolve()
    : promise;
  // if (promise === void 0) {
  //   return Promise.resolve();
  // } else {
  //   return promise.catch(() => {
  //   });
  // }
}

function setQueuePromise(
  store: Store<any>,
  promise: Promise<void>,
): Promise<void> {
  QUEUE.set(store, promise.catch(() => {
  })); // silent fail
  return promise;
}

function updateQueuePromise(
  store: Store<any>,
  callback: () => Promise<void>,
): Promise<void> {
  return setQueuePromise(
    store,
    getQueuePromise(store)
      .then(callback),
  );
}

/** CLASS **/

export interface IAsyncUpdateStateFunctionOptions {
  signal?: AbortSignal;
}

export interface IAsyncUpdateStateFunction<GState, GArgument> {
  (
    state: GState,
    args: GArgument,
    options?: IAsyncUpdateStateFunctionOptions,
  ): Promise<GState>,
}

/**
 * @experimental
 */
export class AsyncAction<GState, GArgument> {
  protected _store: Store<GState>;
  protected _update: IAsyncUpdateStateFunction<GState, GArgument>;

  constructor(
    store: Store<GState>,
    update: IAsyncUpdateStateFunction<GState, GArgument>,
  ) {
    this._store = store;
    this._update = update;
  }

  get store(): Store<GState> {
    return this._store;
  }

  invoke(
    arg: GArgument,
    options?: IAsyncUpdateStateFunctionOptions,
  ): Promise<void> {
    return updateQueuePromise(
      this._store,
      () => {
        return this._update(
          this._store.state,
          arg,
          options,
        )
          .then((state: GState): void => {
            return this._store.$state(state);
          });
      },
    );
  }
}
