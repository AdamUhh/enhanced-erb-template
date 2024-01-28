import { dialog, ipcMain } from 'electron';

import { IpcChannels } from '../../shared/types';
import MainWindow from '../mainWindow';

export default () => {
  ipcMain.on(IpcChannels.closeApp, () => {
    try {
      MainWindow.close();
    } catch (error: any) {
      console.log('Failed to close app', error);
      setTimeout(() => {
        dialog.showMessageBox({
          type: 'error',
          title: 'Failed to close app',
          message: `${error.toString()}`,
          detail: error.toString(),
        });
      }, 1000);
    }
  });

  ipcMain.on(IpcChannels.minimizeApp, () => {
    try {
      MainWindow.minimize();
    } catch (error: any) {
      console.log('Failed to minimize app', error);
      setTimeout(() => {
        dialog.showMessageBox({
          type: 'error',
          title: 'Failed to minimize app',
          message: `${error.toString()}`,
          detail: error.toString(),
        });
      }, 1000);
    }
  });

  ipcMain.on(IpcChannels.maximizeApp, () => {
    try {
      MainWindow.maximize();
    } catch (error: any) {
      console.log('Failed to maximize app', error);
      setTimeout(() => {
        dialog.showMessageBox({
          type: 'error',
          title: 'Failed to maximize app',
          message: `${error.toString()}`,
          detail: error.toString(),
        });
      }, 1000);
    }
  });

  ipcMain.on(IpcChannels.restartApp, () => {
    try {
      MainWindow.getWebContents()?.reloadIgnoringCache();
    } catch (error: any) {
      console.log('Failed to restart app', error);
      setTimeout(() => {
        dialog.showMessageBox({
          type: 'error',
          title: 'Failed to restart app',
          message: `${error.toString()}`,
          detail: error.toString(),
        });
      }, 1000);
    }
  });

  ipcMain.on(IpcChannels.toggleDevTools, () => {
    try {
      MainWindow.getWebContents()?.toggleDevTools();
    } catch (error: any) {
      console.log('Failed to toggle dev tools', error);
      setTimeout(() => {
        dialog.showMessageBox({
          type: 'error',
          title: 'Failed to toggle dev tools',
          message: `${error.toString()}`,
          detail: error.toString(),
        });
      }, 1000);
    }
  });
};
