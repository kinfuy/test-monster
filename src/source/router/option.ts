import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/option.vue'),
  },
  {
    path: '/libs/views/option.html',
    name: 'option',
    component: () => import('../view/option.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
