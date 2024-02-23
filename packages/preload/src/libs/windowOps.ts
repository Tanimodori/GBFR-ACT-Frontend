import type { BrowserWindow } from 'electron';
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

type Callback = (newBounds: Electron.Rectangle) => void;
const eventKeys = ['will-resize', 'will-move'] as const;
export type WindowOpsEventKey = (typeof eventKeys)[number];
const callbackHolder = new Map<string, Callback[]>();

for (const eventKey of eventKeys) {
  callbackHolder.set(eventKey, []);
  ipcRenderer.on(eventKey, (_event, newBounds: Electron.Rectangle) => {
    const callbacks = callbackHolder.get(eventKey);
    if (callbacks) {
      for (const callback of callbacks) {
        callback(newBounds);
      }
    }
  });
}

export const addEventListener = (eventKey: WindowOpsEventKey, callback: Callback) => {
  callbackHolder.get(eventKey)!.push(callback);
};

export const removeEventListener = (eventKey: WindowOpsEventKey, callback: Callback) => {
  const callbacks = callbackHolder.get(eventKey);
  if (callbacks) {
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
};

export const setBounds = (...values: Parameters<BrowserWindow['setBounds']>) => {
  ipcRenderer.send('setBounds', ...values);
};

export const getDpi = (): number => {
  return ipcRenderer.sendSync('getDpi');
};
