import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backendPort: 3000,
    wallets: [],
  },
  getters: {
    backendUrl: state => {
      return `http://localhost:${state.backendPort}`
    },
    getWalletByName: (state) => (walletName) => {
      return state.wallets.find(wallet => wallet.name === walletName)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
