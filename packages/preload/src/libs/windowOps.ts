import { ipcRenderer } from 'electron';

export const minimize = () => {
  ipcRenderer.send('minimize');
};

export const maximize = () => {
  ipcRenderer.send('maximize');
};

export const isMaximized = (): boolean => {
  return ipcRenderer.sendSync('isMaximized');
};

export const close = () => {
  ipcRenderer.send('close');
};

export const setAlwaysOnTop = (value: boolean) => {
  ipcRenderer.send('setAlwaysOnTop', value);
};
