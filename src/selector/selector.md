## Selector

Selectors are pure functions used for obtaining slices of Store State, like computed values derived from the State or direct properties access.

### Create a Selector

A Selector is simply a function that receives a State and returns a value inferred from this State.

```ts
interface ISelector<GState, GValue> {
   (value: GState): GValue;
}
```

##### Example

```ts
const userCountSelector = (state: IAppState) => state.users.length;
```


If we prefer, we may use the function `createSelector`: it ensures a proper typing.

```ts
function createSelector<GState, GValue>(
    selector: ISelector<GState, GValue>,
): ISelector<GState, GValue>;
```

```ts
const userCountSelector = createSelector((state: IAppState) => state.users.length);
```

### Create an Observable from a Selector

A Selector is not directly related to a Store. For this, we'll have to *map* our Selector a Store, using the function `mapState`:

##### Definition

```ts
function mapState<GState, GValue>(
    store: IStore<GState>,
    selector: ISelector<GState, GValue>,
): IObservable<GValue>;
```

[Here is the definition of an Observable](https://github.com/lifaon74/rx-js-light/blob/main/src/observable/type/observable.md)


##### Example

```ts
const userCount$ = mapState(APP_STORE, userCountSelector);

userCount$((count: number) => {
  console.log('user count:', count);
});
```

### Get a snapshot of the State from a Selector

To get a snapshot (current state) of the State of the Store though a Selector, you may use the function `getState`: 

##### Definition

```ts
function getState<GState>(
  store: IStore<GState>,
): GState;

function getState<GState, GValue>(
  store: IStore<GState>,
  selector: ISelector<GState, GValue>,
): GValue;
```

##### Example

```ts
console.log('user count:', getState(APP_STORE, userCountSelector));
```


[Next => Example](../../examples/01-simple-example.md)

---

- [Home](../../README.md)
- [Store](../store/store.md)
- [Action](../action/action.md)
- [Selector](../selector/selector.md)
