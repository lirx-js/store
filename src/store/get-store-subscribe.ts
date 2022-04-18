import { IStore } from './store.type';
import { IObservable } from '@lirx/core';

export function getStoreSubscribe<GState>(
  store: IStore<GState>,
): IObservable<GState> {
  return store.subscribe;
}
