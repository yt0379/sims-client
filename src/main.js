// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toolbar from './components/Toolbar';
import VueClip from 'vue-clip'
import {Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.config.productionTip = false;
Vue.component('Toolbar',Toolbar);
Vue.use(VueClip);
Vue.use(Toast, {
  position: 'bottom',
  duration: '1500'
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
