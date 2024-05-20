import { IpcChannels } from '../../shared/types/ipc';
import ApplicationUpdater from '../appUpdater';
import { ipcMainOn } from '../bridges/ipcMain';
import { SendErrorToRendererDialog } from './util/sendToRenderer';

export default () => {
  ipcMainOn(IpcChannels.checkForUpdates, () => {
    try {
      ApplicationUpdater.checkForUpdates();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to check for updates', error);
    }
  });

  ipcMainOn(IpcChannels.quitAndInstallUpdates, () => {
    try {
      ApplicationUpdater.quitAndInstall();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to quit and install updates', error);
    }
  });
};
