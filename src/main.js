// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from './store/index';
import App from './App';
import router from './router';
// import Mock from './mock';
import './config/rem';


Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(MintUI);
// Mock.bootstrap();
router.beforeEach((to, from, next) => {
  if (to.path == '/hello') {
    console.log('hello');
  }
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/hello') {
    next({ path: '/hello' });
  } else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
