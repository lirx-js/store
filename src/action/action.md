## Action

An Action expresses a unique event that happen throughout your application.
From user interaction with the page, external interaction through network requests, and direct interaction with device APIs,
these and more events are described with Actions.

### Create an Action

To create an Action, we'll use the function `createAction`:

##### Definition

```ts
function createAction<GState, GArguments extends any[]>(
  store: IStore<GState>,
  updateState: IUpdateStateFunction<GState, GArguments>,
): IActionFunction<GArguments>;


interface IUpdateStateFunction<GState, GArguments extends any[]> {
  (state: GState, ...args: GArguments): GState,
}
```

`createAction` takes 2 arguments:

- the Store that will be updated when this Action will be dispatched
- a callback, which receives as first argument the current State of the Store (`state`),
   and an optional list of Arguments used to provide a context / some data to the Action.
  
And returns the new State or the Store.

##### Example

```ts
const appendUser = createAction(APP_STORE, (state: IAppState, user: IUser): IAppState => {
  return {
    ...state,
    users: [...state.users, user],
  };
});
```

`appendUser` is now an Action that appends a user into our State and updates the `APP_STORE`.


### Dispatch an Action

An Action is simply a function that accepts the Arguments defined when you've created one:

```ts
export interface IActionFunction<GArguments extends any[]> {
  (...args: GArguments): void,
}
```

So to dispatch our previously created Action, we just have to call it with an `IUser` as first and single argument:

```ts
appendUser({ name: 'Alice' });
```

[Next => Selector](../selector/selector.md)

---

- [Home](../../README.md)
- [Store](../store/store.md)
- [Action](../action/action.md)
- [Selector](../selector/selector.md)
