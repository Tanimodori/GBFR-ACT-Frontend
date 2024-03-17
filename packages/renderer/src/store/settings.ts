import i18n, { isValidLocale } from '@/locales';
import dayjs from '@/utils/dayjs';
import { type ValidColumnKey } from '@/utils/enums';
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
      bgColor: '#00000033',
      bgCornerSize: '8px',
      bgPadding: '8px',
      fontFace: 'sans-serif',
      fontColor: '#FFFFFFFF',
      fontSize: '24px',
      fontWeight: '700',
      fontBorderColor: '#000000FF',
      fontBorderSize: '0.8px',
      colOrder: 'name,totalDamage',
      rowOrderBy: 'totalDamage',
      rowOrder: 'desc',
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
      switch: 'CmdOrCtrl+Alt+num0',
    });

    const statsTable = ref({
      seriesName: 'damageInMinutePerSecond' as Exclude<ValidColumnKey, 'name'>,
      columnFilter: [
        'name',
        'totalDamage',
        'totalDamagePerSecond',
        'damageInTenSecond',
        'damageInTenSecondPerSecond',
      ] as ValidColumnKey[],
    });

    return {
      locale,
      changeLocale,
      connection,
      damageStyle,
      mainWindowBound,
      damageWindowBound,
      shortcut,
      statsTable,
    };
  },
  {
    persist: {
      key: 'settings',
      storage: localStorage,
    },
  },
);
