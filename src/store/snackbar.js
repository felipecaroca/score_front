import {SnackbarHelper} from "./helpers/snackbarHelper"

const snackbar = {
  state:{
    snackbar: {
      timeout: null,
      color: 'default',
      visible: false,
      message: ''
    }
  },
  mutations:{
    openSnackBar(state, data){
      SnackbarHelper.openSnackbar(state, data)
    },
    closeSnackBar(state){
      SnackbarHelper.closeSnackbar(state)
      SnackbarHelper.resetSnackbar(state)
    }
  },
  getters:{
    getSnackBar(state){
      return state.snackbar
    }
  }
}

export {snackbar}