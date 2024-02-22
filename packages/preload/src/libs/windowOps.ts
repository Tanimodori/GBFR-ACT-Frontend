import type { BrowserWindow} from 'electron';
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

export const setAlwaysOnTop = (...values: Parameters<BrowserWindow['setAlwaysOnTop']>) => {
  ipcRenderer.send('setAlwaysOnTop', ...values);
};

export const setIgnoreMouseEvents = (...values: Parameters<BrowserWindow['setIgnoreMouseEvents']>) => {
  ipcRenderer.send('setIgnoreMouseEvents', ...values);
};

export const setFocusable = (value: boolean) => {
  ipcRenderer.send('setFocusable', value);
};
