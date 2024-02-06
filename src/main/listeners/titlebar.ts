import { ipcMain } from 'electron';
import { IpcChannels } from '../../shared/types/ipc';
import MainWindow from '../mainWindow';
import { delayedErrorDialog } from './util';

export default () => {
  ipcMain.on(IpcChannels.closeApp, () => {
    try {
      MainWindow.close();
    } catch (error: any) {
      console.log('Failed to close app', error);
      delayedErrorDialog('Failed to close app', error);
    }
  });

  ipcMain.on(IpcChannels.minimizeApp, () => {
    try {
      MainWindow.minimize();
    } catch (error: any) {
      console.log('Failed to minimize app', error);
      delayedErrorDialog('Failed to minimize app', error);
    }
  });

  ipcMain.on(IpcChannels.maximizeApp, () => {
    try {
      MainWindow.maximize();
    } catch (error: any) {
      console.log('Failed to maximize app', error);
      delayedErrorDialog('Failed to maximize app', error);
    }
  });

  ipcMain.on(IpcChannels.restartApp, () => {
    try {
      MainWindow.getWebContents()?.reloadIgnoringCache();
    } catch (error: any) {
      console.log('Failed to restart app', error);
      delayedErrorDialog('Failed to restart app', error);
    }
  });

  ipcMain.on(IpcChannels.toggleDevTools, () => {
    try {
      MainWindow.getWebContents()?.toggleDevTools();
    } catch (error: any) {
      console.log('Failed to toggle dev tools', error);
      delayedErrorDialog('Failed to toggle dev tools', error);
    }
  });
};
