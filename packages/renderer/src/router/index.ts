import {createRouter, createWebHashHistory} from 'vue-router';
import LayoutView from '/@/views/layout/LayoutView.vue';

const routes = [{path: '/', component: LayoutView}];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
