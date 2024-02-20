import {createApp} from 'vue';
import {ConfigProvider, App as AppComponent} from 'ant-design-vue';
import {createPinia} from 'pinia';
import App from '/@/App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.use(ConfigProvider, AppComponent);

app.mount('#app');
