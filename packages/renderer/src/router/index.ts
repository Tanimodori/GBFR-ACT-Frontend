import {type RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/logs/stats'},
  {
    path: '/logs',
    component: () => import('/@/views/layout/LayoutView.vue'),
    children: [
      {path: 'stats', component: () => import('/@/views/stats/StatsView.vue')},
      {path: 'settings', component: () => import('/@/views/settings/SettingsView.vue')},
    ],
  },
  {
    path: '/damage',
    component: () => import('/@/views/damage/DamageView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
