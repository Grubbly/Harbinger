import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backendPort: 3000,
    wallets: [],
    AKASH_KEY_NAME: '',
    AKASH_KEYRING_BACKEND: 'os',
    AKASH_NET: "https://raw.githubusercontent.com/ovrclk/net/master/mainnet",
    AKASH_VERSION: '',
    AKASH_CHAIN_ID: '',
    
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
