import {createApp} from 'vue';
import {ConfigProvider, App as AppComponent, Layout, Menu, Button, Tabs} from 'ant-design-vue';
import {createPinia} from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import i18n from './locales';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

// Components
app.use(ConfigProvider);
app.use(AppComponent);
app.use(Layout);
app.use(Menu);
app.use(Button);
app.use(Tabs);

app.mount('#app');
