
import {
  createAction,
  createSelector, createStore,
  Immutable,
  ImmutableArray,
  immutableArrayPush,
  immutableArrayRemove,
  immutableArrayReplace,
  mapState, selectState,
} from '../src';

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

const appendUserAction = createAction(APP_STORE, (state: IAppState, user: IUser): IAppState => {
  return {
    ...state,
    users: immutableArrayPush(state.users, user),
    // EQUIVALENT
    // users: [...state.users, user],
  };
});

const removeUserByNameAction = createAction(APP_STORE, (state: IAppState, name: string): IAppState => {
  const users: ImmutableArray<IUser> = state.users;
  const index: number = users.findIndex((user: IUser) => (user.name === name));
  if (index === -1) {
    return state;
  } else {
    return {
      ...state,
      users: immutableArrayRemove(users, index),
      // EQUIVALENT
      // users: [
      //   ...users.slice(0, index),
      //   ...users.slice(index + 1),
      // ],
    };
  }
});

export const renameUserAction = createAction(APP_STORE, (state: IAppState, user: IUser, name: string): IAppState => {
  const users: ImmutableArray<IUser> = state.users;
  const index: number = users.indexOf(user);
  if (index === -1) {
    throw new Error(`User not present in this list`);
  }

  return {
    ...state,
    users: immutableArrayReplace(users, index, {
      ...user,
      name
    }),
    // EQUIVALENT
    // users: [
    //   ...users.slice(0, index),
    //   {
    //     ...user,
    //     name
    //   },
    //   ...users.slice(index + 1),
    // ],
  };
});

/* SELECTORS */

const userCountSelector = createSelector((state: IAppState) => state.users.length);
const userCount$ = mapState(APP_STORE, userCountSelector);


const firstUserSelector = createSelector((state: IAppState) => state.users[0]);

const firstUserNameSelector = createSelector((state: IAppState) => firstUserSelector(state)?.name);
const firstUserName$ = mapState(APP_STORE, firstUserNameSelector);


/*------------*/


function storeExample1() {
  /* LISTENING */

  userCount$((count: number) => {
    console.log('user count:', count);
  });

  firstUserName$((name: string) => {
    console.log('user name:', name);
  });

  /* EXECUTE ACTIONS */

  appendUserAction({ name: 'Alice' });
  appendUserAction({ name: 'Bob' });
  removeUserByNameAction('Alice');
  renameUserAction(selectState(APP_STORE, firstUserSelector), 'David');
}


storeExample1();
