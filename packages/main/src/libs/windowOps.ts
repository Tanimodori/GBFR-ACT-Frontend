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

  browserWindow.on('will-resize', (event, newBounds) => {
    browserWindow.webContents.send('will-resize', newBounds);
  });

  browserWindow.on('will-move', (event, newBounds) => {
    browserWindow.webContents.send('will-move', newBounds);
  });

  ipcMain.on('setBounds', (_event, ...values: Parameters<BrowserWindow['setBounds']>) => {
    console.log('setBounds', values);
    browserWindow.setBounds(...values);
  });
};

export default useWindow;
