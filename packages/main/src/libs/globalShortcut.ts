import { type BrowserWindow, globalShortcut, ipcMain } from 'electron';

const useGlobalShortcut = (browserWindow: BrowserWindow) => {
  ipcMain.on('registerGlobalShortcut', (_event, key) => {
    globalShortcut.register(key, () => {
      browserWindow.webContents.send('globalShortcut', key);
    });
  });

  ipcMain.on('unregisterGlobalShortcut', (_event, key) => {
    globalShortcut.unregister(key);
  });

  ipcMain.on('isRegisteredGlobalShortcut', (event, key) => {
    event.returnValue = globalShortcut.isRegistered(key);
  });

  ipcMain.on('unregisterAllGlobalShortcuts', () => {
    globalShortcut.unregisterAll();
  });
};

export default useGlobalShortcut;
