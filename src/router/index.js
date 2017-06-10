import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '../pages/profile/login';
import Register from '../pages/profile/register';
import Admin from '../pages/admin/layout/Home';
import Dashboard from '../pages/admin/Dashboard';
import PostCreate from '../pages/admin/post/PostCreate';

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
    {
      path: '/admin',
      component: Admin,
      iconCls: 'el-icon-message',
      redirect: '/admin',
      name: 'Admin',
      children: [
        {
          path: '/admin',
          component: Dashboard,
          name: 'Dashboard',
        },
        {
          path: '/post/creat',
          component: PostCreate,
          name: 'New Post',
        },
        {
          path: '/post/edit/:postid',
          component: PostCreate,
          name: 'Edit Post',
        }
      ]
    },
  ],
});
