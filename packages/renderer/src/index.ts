import { createApp } from 'vue';
import {
  ConfigProvider,
  App as AppComponent,
  Layout,
  Menu,
  Button,
  Tabs,
  Table,
  Divider,
  Form,
  Select,
  Input,
} from 'ant-design-vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from '@/App.vue';
import router from '@/router';
import i18n from './locales';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
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
app.use(Table);
app.use(Divider);
app.use(Form);
app.use(Select);
app.use(Input);

app.mount('#app');
