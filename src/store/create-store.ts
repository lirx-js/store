import { createMulticastReplayLastSource } from '@lirx/core';
import { IStore } from './store.type';

export function createStore<GState>(
  initialState: GState,
): IStore<GState> {
  return createMulticastReplayLastSource<GState>(initialState);
}

