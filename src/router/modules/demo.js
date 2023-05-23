export default [
  {
    name: 'notFound',
    path: '/',
    redirect: {
      name: 'home',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   meta: { title: '登录', noAuth: true },
  //   component: () => import('@/views/login/index.vue'),
  // },
  // {
  //   name: 'forgetPwd',
  //   path: '/forgetPwd',
  //   meta: { title: '忘记密码', noAuth: true },
  //   component: () => import('@/views/login/forgetPwd.vue'),
  // },
];
