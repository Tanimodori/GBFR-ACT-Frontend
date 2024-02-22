import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { windowOps } from '#preload';
import { useSettingsStore } from '@/store/settings';

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
  const settingsStore = useSettingsStore();
  // Always on top for damage view
  if (to.path === '/damage') {
    windowOps.setAlwaysOnTop(true, 'screen-saver', 1);
    windowOps.setIgnoreMouseEvents(true);
    const { x, y } = settingsStore.damageWindowBound;
    windowOps.setBounds({ x, y });
  } else if (from.path === '/damage') {
    windowOps.setIgnoreMouseEvents(false);
    windowOps.setAlwaysOnTop(false);
    const { x, y, width, height } = settingsStore.mainWindowBound;
    windowOps.setBounds({ x, y, width, height });
  }

  next();
});

export default router;
