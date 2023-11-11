import { IDeferredStoreView } from '../deferred-store-view.type';
import { Store } from '../../store/store.class';

/* TYPES */

export type IStoreInvokeFunction<GState, GArguments extends readonly any[]> =
  (state: GState, ...args: GArguments) => GState;

export type IGenericStoreInvokeFunction = IStoreInvokeFunction<any, readonly any[]>;

export type IStoreActionStore<GInvokeFunction extends IGenericStoreInvokeFunction> =
  GInvokeFunction extends IStoreInvokeFunction<infer GState, readonly any[]>
    ? Store<GState>
    : never;

export type IStoreActionInvokeFunction<GInvokeFunction extends IGenericStoreInvokeFunction> =
  GInvokeFunction extends IStoreInvokeFunction<any, infer GArguments>
    ? (...args: GArguments) => void
    : never;

export type IDeferredStoreAction<GInvokeFunction extends IGenericStoreInvokeFunction> =
  IDeferredStoreView<IStoreActionStore<GInvokeFunction>, StoreAction<GInvokeFunction>>;

/* CLASS */

export class StoreAction<GInvokeFunction extends IGenericStoreInvokeFunction> {
  static defer<GInvokeFunction extends IGenericStoreInvokeFunction>(
    invoke: GInvokeFunction,
  ): IDeferredStoreAction<GInvokeFunction> {
    return (
      store: IStoreActionStore<GInvokeFunction>,
    ): StoreAction<GInvokeFunction> => {
      return new StoreAction<GInvokeFunction>(
        store,
        invoke,
      );
    };
  }

  readonly #invoke: IStoreActionInvokeFunction<GInvokeFunction>;

  constructor(
    store: IStoreActionStore<GInvokeFunction>,
    invoke: GInvokeFunction,
  ) {
    this.#invoke = ((
      ...args: any[]
    ): void => {
      return store.$state(
        invoke(
          store.state,
          ...args,
        ),
      );
    }) as IStoreActionInvokeFunction<GInvokeFunction>;
  }

  get invoke(): IStoreActionInvokeFunction<GInvokeFunction> {
    return this.#invoke;
  }
}

