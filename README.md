##redux-restore

This is a simple wrapper around async storage that saves your store data to `AsyncStorage` in react native. Works with Android and iOS! Tested on `0.18`

##Install
Head to my fork ~>
```js
https://github.com/jamesone/redux-restore
```

##Setup
This is my (jamesone) implementation of the redux-restore middleware, I'm currently using it with this exact setup and it's working well. If you spot anything wrong with it, let me know.

###Register Middleware

Create your store with the `storage` middleware

```js
import { combineReducers, applyMiddleware, createStore } from 'redux'
import name_of_reducer_that_you_want_persited from './name_of_reducer_that_you_want_persited'
import other_name_of_reducer from './other_name_of_reducer'
import authentication from './authentication' //reducer name

import { storage } from 'redux-restore'
import thunk from 'redux-thunk'; // You DON'T need this, but if you want you can use it!


const showReduxStoreDevLogs = true; // If true, redux-restore prints out helpful debug information.
const reduxRestoreStorage = storage ([
  'name_of_reducer_that_you_want_persited',
  'other_name_of_reducer',
], showReduxStoreDevLogs);

let createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRestoreStorage,
)(createStore)

let reducers = combineReducers({
  name_of_reducer_that_you_want_persited,
  other_name_of_reducer,
  authentication, // This won't be persited, unless you add it to the reduxRestoreStorage array
})

export default createStoreWithMiddleware(reducers)
```

Pass an array with reducer names. Each one you pass will be saved to storage.

###Use RestoreProvider

Use this instead of the usual `Provider` from redux. When you load the app, it will dispatch from storage with the current state, if there is any.

```js
import React from 'react-native'
import Scene from './scene'
import store from '../../reducers'
import { RestoreProvider } from 'redux-restore'

export default class App extends React.Component {
  render() {
    return (
      <RestoreProvider store={store}>
        <Scene />
      </RestoreProvider>
    );
  }
}
```

###Add an action to your reducer

```js
name_of_reducer_that_you_want_persited.js:

case 'name_of_action':
  return {
    ...state,
    iWillBeSavedToAsyncStorage: action.foo,
    bar: action.bar,
  }
```



###Conclusion

This library is one of the nicest AsyncStorage wrappers I've seen. The only problem I see is the way the state is restored. I think the `RestoreProvider` component could be done better.
