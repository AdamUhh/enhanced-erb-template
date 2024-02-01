import { ipcMain } from 'electron';

import { IpcChannels } from '../../shared/types';
import ApplicationUpdater from '../appUpdater';
import { delayedErrorDialog } from './util';

export default () => {
  ipcMain.on(IpcChannels.checkForUpdates, () => {
    try {
      ApplicationUpdater.checkForUpdates();
    } catch (error: any) {
      console.log('Failed to check for updates', error);
      delayedErrorDialog('Failed to check for updates', error);
    }
  });
};
