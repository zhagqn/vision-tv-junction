import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import native from "@/libs/native";
import "@/libs/i18n";
import tvkit from "@/libs/tvkit";
import VueBus from "vue-bus";
import VueLazyload from "vue-lazyload";

import 'normalize.css';
import "@/assets/styles/index.scss";
import '@/libs/flexible';

Vue.use(VueBus);
Vue.use(tvkit);
Vue.use(VueLazyload);

Vue.prototype.$native = native;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
