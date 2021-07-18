import Vue from 'vue'
import App from './App.vue'
// import vuetify from '@/plugins/vuetify'
import Vuetify from 'vuetify/lib'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ffffff',
        secondary: '#161617',
        accent: '#AAAAAA',
        error: '#B83B3B',
        info: '#282829',
        anchor: '#F28749'
      },
    },
  },
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
