import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../view/script.vue'),
    children: [
      {
        path: '/',
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
  {
    path: '/libs/views/script.html',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
