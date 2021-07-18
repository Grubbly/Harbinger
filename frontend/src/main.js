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
        primary: '#011126',
        secondary: '#D92555',
        accent: '#F28749',
        error: '#BF2A2A',
        info: '#2C2F73',
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
