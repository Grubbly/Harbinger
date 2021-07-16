import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backendPort: 3000,
    wallets: [],
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
