import {defineStore} from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      bgAlpha: 100,
      bgColor: 'FFFFFF',
      bgCornerSize: 0,
      fontAlpha: 100,
      fontColor: '000000',
      fontSize: 16,
      align: 'topleft',
      paddingtop: 0,
      paddingbottom: 0,
      paddingleft: 0,
      paddingright: 0,
      cols: [],
      shortcut: 'Ctrl+Shift+Num0',
      port: 24399,
      autoConnect: true,
    };
  },
});
