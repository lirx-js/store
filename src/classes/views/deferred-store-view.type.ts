import { ReadonlyStore } from '../store/readonly-store.class';

export interface IDeferredStoreView<GStore extends ReadonlyStore<any>, GReturn> {
  (
    store: GStore,
  ): GReturn;
}
