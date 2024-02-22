import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
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
    fontColor: '000000',
    fontSize: 16,
  });

  const damageCols = ref({
    order: [],
  });

  const windowStyle = ref({
    align: 'topleft',
    paddingtop: 0,
    paddingbottom: 0,
    paddingleft: 0,
    paddingright: 0,
    width: 700,
    height: 500,
  });

  const shortcut = ref({
    enabled: true,
    key: 'Ctrl+Shift+Num0',
  });

  return {
    connection,
    damageStyle,
    damageCols,
    windowStyle,
    shortcut,
  };
});
