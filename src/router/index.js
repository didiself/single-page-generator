import Vue from 'vue';
import Router from 'vue-router';
import Init from '@/views/Init';
import Normal from '@/views/Normal';

Vue.use(Router);

const prefix = '/admin';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: `${prefix}/`,
      component: Init
    },
    {
      path: `${prefix}/normal`,
      component: Normal
    }
  ]
});
