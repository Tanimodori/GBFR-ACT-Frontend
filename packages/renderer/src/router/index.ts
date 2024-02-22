import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { windowOps } from '#preload';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/logs/stats' },
  {
    path: '/logs',
    component: () => import('@/views/layout/LayoutView.vue'),
    children: [
      { path: 'stats', component: () => import('@/views/stats/StatsView.vue') },
      { path: 'settings', component: () => import('@/views/settings/SettingsView.vue') },
    ],
  },
  {
    path: '/damage',
    component: () => import('@/views/damage/DamageView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Always on top for damage view
  if (to.path === '/damage') {
    windowOps.setAlwaysOnTop(true);
  } else if (from.path === '/damage') {
    windowOps.setAlwaysOnTop(false);
  }

  next();
});

export default router;
