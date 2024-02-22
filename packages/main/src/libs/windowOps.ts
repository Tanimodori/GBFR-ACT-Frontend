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
};

export default useWindow;
