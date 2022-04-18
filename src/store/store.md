## Store

The *Store* is a global *State* manager that dispatches *Actions* your state containers listen to
and provides a way to *Select* data slices out from the global state.

- it is designed to help write performant and consistent applications
- it prevents the usage of badly computed or cached variables
- it automatically updates your application through *Selectors*

### State

The Store has an internal **immutable** State (usually an object).
We may commit a new State, which will update our listeners through some *Selectors*.

*Immutable ?*

The State is always immutable, meaning you can't modify directly it's properties and values.
Instead, you commit a new State every time.

Immutability prevents you from updating the State without committing it to the Store.

For more information about immutability:

- [Understanding Immutability in JavaScript](https://css-tricks.com/understanding-immutability-in-javascript/)
- [Immutability in JavaScript](https://www.telerik.com/blogs/immutability-in-javascript)


##### Example

Let's define some interfaces and types for our State:

```ts
type IUser = Immutable<{
  name: string;
}>

type IAppState = Immutable<{
  users: ImmutableArray<IUser>;
}>;
```

`IAppState` will be our State, which contains a list of users, each having a name.


### Create a Store

To create a Store, we'll use the function `createStore`:

##### Definition

```ts
function createStore<GState>(
  initialState: GState,
): IStore<GState>;
```

##### Example

```ts
const APP_STORE = createStore<IAppState>({
  users: [],
});
```

`APP_STORE` is now our main Store, and we'll use it to update the State, and to Select (pick or compute) some properties on it.

[Next => Action](../action/action.md)

---

- [Home](../../README.md)
- [Store](../store/store.md)
- [Action](../action/action.md)
- [Selector](../selector/selector.md)
