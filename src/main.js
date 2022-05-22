import Vue from 'vue'
import App from './App.vue'
import axiosInstance from './plugins/axios'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import {routes} from "@/routes/routes";

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.prototype.$axios = axiosInstance;

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
