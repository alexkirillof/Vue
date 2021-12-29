import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import './plugins/chartjs';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  router,
}).$mount('#app');