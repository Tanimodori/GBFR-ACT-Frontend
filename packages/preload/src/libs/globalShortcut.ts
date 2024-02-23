import { ipcRenderer } from 'electron';
import { isAccelerator } from '../../../renderer/src/utils/accelerator';

type Callback = () => void;
const callbackHolder = new Map<string, Callback[]>();

ipcRenderer.on('globalShortcut', (_event, key) => {
  const callbacks = callbackHolder.get(key);
  if (callbacks) {
    for (const callback of callbacks) {
      callback();
    }
  }
});

export const registerGlobalShortcut = (key: string, callback: () => void) => {
  if (!isAccelerator(key)) {
    return;
  }
  if (!callbackHolder.has(key)) {
    callbackHolder.set(key, []);
  }
  callbackHolder.get(key)!.push(callback);
  ipcRenderer.send('registerGlobalShortcut', key);
};

export const unregisterGlobalShortcut = (key: string) => {
  if (!isAccelerator(key)) {
    return;
  }
  ipcRenderer.send('unregisterGlobalShortcut', key);
  callbackHolder.delete(key);
};

export const isRegisteredGlobalShortcut = (key: string) => {
  if (!isAccelerator(key)) {
    return;
  }
  return ipcRenderer.sendSync('isRegisteredGlobalShortcut', key);
};

export const unregisterAllGlobalShortcuts = () => {
  ipcRenderer.send('unregisterAllGlobalShortcuts');
  callbackHolder.clear();
};
