class LoadingHelper {
  static showLoading(state){
    state.isLoading = true
  }
  static hideLoading(state){
    state.isLoading = false
  }
}

export {LoadingHelper}