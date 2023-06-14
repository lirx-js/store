import { Abortable, AsyncTask, IAsyncTaskInput, IOptionalAbortableOptions } from '@lirx/async-task';
import { IAsyncTaskConstraint } from '@lirx/async-task/src/async-task/types/async-task-constraint.type';
import { IGenericFunction, noop } from '@lirx/utils';
import { Store } from '../store.class';
import { IReadStateFunction } from '../types/read-state-function.type';
import { IWriteStateFunction } from '../types/write-state-function.type';

/** QUEUE **/

const QUEUE = new WeakMap<Store<any>, AsyncTask<void>>();

/** CLASS **/

export interface IAsyncActionOptions<GState extends IAsyncTaskConstraint<GState>, GArgument> {
  queue?: boolean; // (default: true)
}

export interface IAsyncActionInvokeFunction<GState extends IAsyncTaskConstraint<GState>, GArgument> {
  (
    arg: GArgument,
    abortable: Abortable,
  ): AsyncTask<void>;
}

export interface IAsyncUpdateStateFunction<GState extends IAsyncTaskConstraint<GState>, GArgument> {
  (
    arg: GArgument,
    read: IReadStateFunction<GState>,
    write: IWriteStateFunction<GState>,
    abortable: Abortable,
  ): IAsyncTaskInput<void>;
}

/**
 * @experimental
 */
export class AsyncAction<GState extends IAsyncTaskConstraint<GState>, GArgument> {
  readonly #store: Store<GState>;
  readonly #update: IAsyncUpdateStateFunction<GState, GArgument>;
  readonly #invoke: IAsyncActionInvokeFunction<GState, GArgument>;

  constructor(
    store: Store<GState>,
    update: IAsyncUpdateStateFunction<GState, GArgument>,
    {
      queue = true,
    }: IAsyncActionOptions<GState, GArgument> = {},
  ) {
    this.#store = store;
    this.#update = update;

    const invoke = (
      arg: GArgument,
      abortable: Abortable,
    ): AsyncTask<void> => {
      let running: boolean = true;

      const wrapFunctionWithRunning = <GFunction extends IGenericFunction>(fnc: GFunction): GFunction => {
        return (function (this: any, ...args: Parameters<GFunction>): ReturnType<GFunction> {
          if (running) {
            return fnc.apply(this, args);
          } else {
            throw new Error(`AsyncAction.invoke is done.`);
          }
        }) as GFunction;
      };

      return AsyncTask.fromFactory((abortable: Abortable): IAsyncTaskInput<void> => {
        return this.#update(
          arg,
          wrapFunctionWithRunning(this.#store.getState),
          wrapFunctionWithRunning(this.#store.$state),
          abortable,
        );
      }, abortable)
        .finally((): void => {
          running = false;
        });
    };

    if (queue) {
      this.#invoke = (
        arg: GArgument,
        abortable: Abortable,
      ): AsyncTask<void> => {
        let asyncTask: AsyncTask<void> | undefined = QUEUE.get(this.#store);

        if (asyncTask === void 0) {
          asyncTask = invoke(arg, abortable);
        } else {
          asyncTask = asyncTask!
            .errored(noop)
            .switchAbortable(abortable!)
            .successful((_, abortable: Abortable): AsyncTask<void> => {
              return invoke(arg, abortable);
            });

          QUEUE.set(this.#store, asyncTask);
        }

        return asyncTask;
      };
    } else {
      this.#invoke = invoke;
    }
  }

  get store(): Store<GState> {
    return this.#store;
  }

  invoke(
    arg: GArgument,
    abortable = Abortable.never,
  ): AsyncTask<void> {
    return this.#invoke(arg, abortable);
  }
}
