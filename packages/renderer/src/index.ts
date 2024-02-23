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
  InputNumber,
  Checkbox,
  Tag,
  Segmented,
  Empty,
  Modal,
} from 'ant-design-vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from '@/App.vue';
import router from '@/router';
import i18n from './locales';
import { useSettingsStore } from './store/settings';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

// Change locale on startup
const settingsStore = useSettingsStore();
settingsStore.changeLocale();

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
app.use(InputNumber);
app.use(Checkbox);
app.use(Tag);
app.use(Segmented);
app.use(Empty);
app.use(Modal);

app.mount('#app');
