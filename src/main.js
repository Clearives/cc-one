// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import store from './store/index.js'
import App from './App';
import router from './router';
import Mock from './mock';
import './config/rem';



Vue.config.productionTip = false;
Vue.use(Vuex)
let useMock = location.search.indexOf('mock') > -1
useMock && Mock.bootstrap();
router.beforeEach((to, from, next) => {

  if (to.path == '/hello') {
    console.log('hello');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/hello') {
    next({ path: '/hello' })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
