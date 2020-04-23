import {LoadingHelper} from "./helpers/loadingHelper"

const loading = {
  state: {
    isLoading: false
  },
  mutations: {
    setLoading(state, status){
      if (status)
        LoadingHelper.showLoading(state)
      else
        LoadingHelper.hideLoading(state)
    }
  },
  getters: {
    getLoading(state){
      return state.isLoading
    }
  }
}

export {loading}