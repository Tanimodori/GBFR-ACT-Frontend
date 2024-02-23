import { createI18n } from 'vue-i18n';
import en_US from './en_US.json';
import zh_CN from './zh_CN.json';

const messages = {
  en_US,
  zh_CN,
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
