import { AsyncStorage } from 'react-native'

const storage = keys => dev => {
  return store => next => action => {
    next(action)
    let state = store.getState()
    if (dev) {
		console.log ("\nAction has been triggered: ", action);
		console.log ("\nReducers that will be synced to AsyncStorage: ", keys);
		console.log ("\nStore after async ", state);
    }

    // Remove .toJS()
    for(let item in state) {
      if(keys.indexOf(item) > -1) AsyncStorage.setItem(item, JSON.stringify(state[item]))
    }
  }
}
module.exports = storage