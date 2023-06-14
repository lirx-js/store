import { IAsyncTaskConstraint } from '@lirx/async-task/src/async-task/types/async-task-constraint.type';
import { AsyncAction, IAsyncActionOptions, IAsyncUpdateStateFunction } from '../async/async-action.class';
import { Store } from '../store.class';

export class DeferredAsyncAction<GState extends IAsyncTaskConstraint<GState>, GArgument> {
  readonly #update: IAsyncUpdateStateFunction<GState, GArgument>;
  readonly #options: IAsyncActionOptions<GState, GArgument> | undefined;

  constructor(
    update: IAsyncUpdateStateFunction<GState, GArgument>,
    options?: IAsyncActionOptions<GState, GArgument>,
  ) {
    this.#update = update;
    this.#options = options;
  }

  create(
    store: Store<GState>,
  ): AsyncAction<GState, GArgument> {
    return new AsyncAction<GState, GArgument>(
      store,
      this.#update,
      this.#options,
    );
  }
}
