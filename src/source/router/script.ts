import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../view/script.vue'),
    children: [
      {
        path: '',
        name: 'script',
        component: () => import('./../view/script/scriptBase.vue'),
      },
      {
        path: 'website',
        name: 'website',
        component: () => import('./../view/script/website.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/libs/views/script.html'),
  routes,
});

export default router;
