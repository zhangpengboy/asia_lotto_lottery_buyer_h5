import { createRouter, createWebHistory } from 'vue-router';

import demoRouters from './modules/demo';
import store from '@/store';

const routes = [...demoRouters];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.noAuth) {
//     next();
//   } else {
//     console.log(store.state.hasLogin)
//     if (!store.state.hasLogin) {
//       next('/login');
//       return false;
//     }
//     next();
//   }
// });

export default router;
