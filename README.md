[![npm (scoped)](https://img.shields.io/npm/v/@lirx/core.svg)](https://www.npmjs.com/package/@lirx/core)
![npm](https://img.shields.io/npm/dm/@lirx/core.svg)
![NPM](https://img.shields.io/npm/l/@lirx/core.svg)
![npm type definitions](https://img.shields.io/npm/types/@lirx/core.svg)

## 🗜️ @lirx/store

[comment]: <> (🗜️ 🗄)

`@lirx/core` provides state management for creating maintainable, explicit applications through the use of
single state and actions in order to express state changes.

`@lirx/core` is extremely light and fast as opposed to classical Store library like
[redux](https://redux.js.org/),
[ngrx](https://ngrx.io/),
[ngxs](https://www.ngxs.io/),
etc...

**When should I use a Store for state management?**

In particular, you might use a Store when you build an application with a lot of user interactions and multiple data sources,
or when managing state in classes or global helpers are no longer sufficient.

Moreover, if you're working with Angular, React or [rx-dom](https://github.com/lifaon74/rx-dom),
using a Store is a good way to help you build large applications and keep a coherent state with it.


[<img src="https://img.shields.io/badge/-tutorial-brightgreen?style=for-the-badge" />](./src/store/store.md)
[<img src="https://img.shields.io/badge/-examples-orange?style=for-the-badge" />](./examples/01-simple-example.md)


*Example:*

```ts

/* DEFINE STORE INTERFACES */

type IUser = Immutable<{
    name: string;
  }>

type IAppState = Immutable<{
  users: ImmutableArray<IUser>;
}>;

/* INIT THE STORE */

const APP_STORE = createStore<IAppState>({
  users: [],
});

/* ACTIONS */

const appendUser = createAction(APP_STORE, (state: IAppState, user: IUser): IAppState => {
  return {
    ...state,
    users: [...state.users, user],
  };
});

/* SELECTORS */

const userCountSelector = createSelector((state: IAppState) => state.users.length);
const userCount$ = mapState(APP_STORE, userCountSelector);


/* MY APP */

userCount$((count: number) => {
  console.log('user count:', count);
});
// outputs: 0

appendUser({ name: 'Alice' }); // outputs: 1
appendUser({ name: 'Bob' }); // outputs: 2
```

## 📦 Installation

```bash
yarn add @lirx/core
# or
npm install @lirx/core --save
```

This library supports:

- **common-js** (require): transpiled as es5, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lirx/core](https://cdn.skypack.dev/@lirx/core)

## 📕 Documentation

- [Store & State](./src/store/store.md)
- [Action](./src/action/action.md)
- [Selector](./src/selector/selector.md)



