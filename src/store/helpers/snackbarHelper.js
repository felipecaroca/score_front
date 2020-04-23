class SnackbarHelper {
  static openSnackbar(state, data){
    state.snackbar.visible = true
    state.snackbar.message = data.message
    state.snackbar.color = data.color? data.color:'default'
    clearTimeout(state.snackbar.timeout)
    state.snackbar.timeout = setTimeout(()=>{
      state.snackbar.visible = false
    }, 5000)
  }
  static closeSnackbar(state){
    clearTimeout(state.snackbar.timeout)
    state.snackbar.visible = false
  }
  static resetSnackbar(state){
    clearTimeout(state.snackbar.timeout)
    state.snackbar.color = 'default'
    state.snackbar.message = ''
  }
}

export {SnackbarHelper}