// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import VConsole from "vconsole";
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import Popover from './components/vue-js-popover/index';

NutUI.install(Vue);
Vue.use(Popover);

Vue.prototype.$vConsole = new VConsole();
Vue.config.productionTip = false

const Bus = new Vue();

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    Bus
  }
}).$mount("#app");
