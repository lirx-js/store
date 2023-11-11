export interface IWriteStateFunction<GState> {
  (
    state: GState,
  ): void;
}
