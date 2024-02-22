import type { BrowserWindow } from 'electron';
import { ipcMain } from 'electron';

const useWindow = (browserWindow: BrowserWindow) => {
  ipcMain.on('minimize', () => {
    browserWindow.minimize();
  });

  ipcMain.on('maximize', () => {
    if (browserWindow.isMaximized()) {
      browserWindow.unmaximize();
    } else {
      browserWindow.maximize();
    }
  });

  ipcMain.on('isMaximized', event => {
    event.returnValue = browserWindow.isMaximized();
  });

  ipcMain.on('close', () => {
    browserWindow.close();
  });

  ipcMain.on('setAlwaysOnTop', (_event, ...values: Parameters<BrowserWindow['setAlwaysOnTop']>) => {
    browserWindow.setAlwaysOnTop(...values);
  });

  ipcMain.on('setIgnoreMouseEvents', (_event, ...values: Parameters<BrowserWindow['setIgnoreMouseEvents']>) => {
    browserWindow.setIgnoreMouseEvents(...values);
  });

  ipcMain.on('setFocusable', (_event, value) => {
    browserWindow.setFocusable(value);
  });
};

export default useWindow;
