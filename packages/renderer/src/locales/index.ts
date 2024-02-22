import { createI18n } from 'vue-i18n';
import en from './en.json';
import zhHans from './zh-Hans.json';

const i18n = createI18n({
  locale: 'zh-Hans',
  messages: {
    en,
    'zh-Hans': zhHans,
  },
});

export default i18n;
