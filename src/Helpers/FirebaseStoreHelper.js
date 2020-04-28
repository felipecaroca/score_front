import store from "../store";
import firebase from "firebase/app";

class FirebaseStoreHelper {
  static processMethod(methodName, onsuccess, data = null, onFinally){
    store.commit('setLoading', true)
    let self = this
    let firebaseMethod = firebase.functions().httpsCallable(methodName)
    firebaseMethod(data).then(onsuccess).catch(err=>{
      self.showError(err)
    }).finally(onFinally?onFinally:()=> store.commit('setLoading', false))
  }
  static showError(err){
    store.commit('openSnackBar', {
      color: 'error',
      message: err
    })
  }
}

export {FirebaseStoreHelper}