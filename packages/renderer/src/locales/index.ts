import { createI18n } from 'vue-i18n';
import en_US from './en-us.json';
import zh_CN from './zh-cn.json';
import zh_TW from './zh-tw.json';

const messages = {
  en_US,
  zh_CN,
  zh_TW,
  zh_HK: zh_TW,
};

export type LocaleKeys = keyof typeof messages;
export const isValidLocale = (locale: string): locale is LocaleKeys => {
  return locale in messages;
};

const i18n = createI18n({
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',
  messages,
});

export default i18n;
