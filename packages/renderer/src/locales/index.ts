import { createI18n } from 'vue-i18n';
import en_US from './en_US.json';
import zh_CN from './zh_CN.json';

const i18n = createI18n({
  legacy: false,
  locale: 'zh_CN',
  fallbackLocale: 'en_US',
  messages: {
    en_US,
    zh_CN,
  },
});

export default i18n;
