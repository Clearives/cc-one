import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '../pages/profile/login';
import Register from '../pages/profile/register';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/hello',
      component: Hello,
      name: '',
      hidden: true,
    },
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true,
    },
    {
      path: '/register',
      component: Register,
      name: '',
      hidden: true,
    },
  ],
});
