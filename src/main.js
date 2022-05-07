import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import './assets/tailwind.css'
import vSelect from "vue-select";

Vue.config.productionTip = false
Vue.component('v-select',vSelect)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
  