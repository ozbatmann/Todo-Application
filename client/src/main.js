import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import axiosInstance from '@/http';
import Snotify, {SnotifyPosition} from 'vue-snotify'
import "vue-snotify/styles/material.css";



// Validation
import VeeValidate, {
  Validator
} from 'vee-validate';
Vue.use(VeeValidate);

// To give information to the user for processing action
Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.leftBottom
  }
})

// Http
Vue.prototype.$http = axiosInstance;


// Material design library
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false;

// Router
import router from '@/router';

// Store
import store from '@/store';

window.instance = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
