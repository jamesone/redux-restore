import { AsyncStorage } from 'react-native'

const restore = store => {
  return new Promise((resolve, reject) => {
    let promises = []
    AsyncStorage.getAllKeys()
      .then(keys => {
        for (let index in keys) {
          promises.push(
            AsyncStorage.getItem(keys[index])
            .then(item => {
              // If non JSON string, then simply return;
              var j;
              try { 
                j = JSON.parse(item) 
              } catch (e) {
                return;
                throw e;
              }
              let action = {
                type: keys[index],
                ...j
              }
              promises.push(store.dispatch(action))
            })
          )
        }
        Promise.all(promises)
          .then(() => resolve())
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}
module.exports = restore