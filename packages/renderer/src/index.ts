import {createApp} from 'vue';
import {ConfigProvider, App as AppComponent, Layout, Menu} from 'ant-design-vue';
import {createPinia} from 'pinia';
import App from '/@/App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

// Components
app.use(ConfigProvider);
app.use(AppComponent);
app.use(Layout);
app.use(Menu);

app.mount('#app');
