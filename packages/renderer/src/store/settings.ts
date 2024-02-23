import i18n, { isValidLocale } from '@/locales';
import dayjs from '@/utils/dayjs';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const locale = ref({
      language: 'zh_CN',
    });

    const changeLocale = (localeKey?: string): void => {
      localeKey = localeKey || locale.value.language;
      const validLocaleKey = isValidLocale(localeKey) ? localeKey : 'en_US';
      // dayjs
      dayjs.locale(validLocaleKey);
      // i18n
      i18n.global.locale.value = validLocaleKey;
    };

    watch(() => locale.value.language, changeLocale);

    const connection = ref({
      host: 'localhost',
      port: 24399,
      startup: true,
      retry: true,
    });

    const damageStyle = ref({
      bgAlpha: 100,
      bgColor: 'FFFFFF',
      bgCornerSize: 0,
      fontAlpha: 100,
      fontColor: 'FFFFFF',
      fontSize: 16,
      fontBorderCol: '000000',
      fontBorderSize: 0,
    });

    const damageCols = ref({
      order: [],
    });

    const mainWindowBound = ref({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });

    const damageWindowBound = ref({
      x: 0,
      y: 0,
      anchorVertical: 'top',
      anchorHorizontal: 'left',
    });

    const shortcut = ref({
      enabled: true,
      key: 'CmdOrCtrl+Alt+num0',
    });

    return {
      locale,
      changeLocale,
      connection,
      damageStyle,
      damageCols,
      mainWindowBound,
      damageWindowBound,
      shortcut,
    };
  },
  {
    persist: {
      key: 'record',
      storage: localStorage,
    },
  },
);
