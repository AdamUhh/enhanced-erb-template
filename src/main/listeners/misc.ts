import { ipcMain } from 'electron';

import { IpcChannels } from '../../shared/types';
import ApplicationUpdater from '../appupdater';

export default () => {
  ipcMain.on(IpcChannels.checkForUpdates, () => {
    try {
      ApplicationUpdater.checkForUpdates();
    } catch (error: any) {
      console.log('Failed to check for updates', error);
    }
  });
};
