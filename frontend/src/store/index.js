import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backendPort: 3000,
  },
  getters: {
    backendUrl: state => {
      return `http://localhost:${state.backendPort}`
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
