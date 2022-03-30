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
      // {
      //   path: 'task',
      //   name: 'task',
      //   component: () => import('../view/script/scriptTask.vue'),
      // },
      // {
      //   path: 'log',
      //   name: 'log',
      //   component: () => import('../view/script/scriptLog.vue'),
      // },
      // {
      //   path: 'set',
      //   name: 'set',
      //   component: () => import('../view/script/scriptSet.vue'),
      // },
    ],
  },
  {
    path: '/scriptFlow',
    name: 'scriptFlow',
    component: () => import('../view/script/scriptEdit.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHashHistory('/libs/views/script.html'),
  routes,
});

export default router;
