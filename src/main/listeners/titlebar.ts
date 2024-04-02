import { IpcChannels } from '../../shared/types/ipc';
import { ipcMainOn } from '../bridges/ipcMain';
import MainWindow from '../mainWindow';
import { replySuccess } from './util/ipcReplies';
import { SendErrorToRendererDialog } from './util/sendToRenderer';

export default () => {
  ipcMainOn(IpcChannels.closeApp, () => {
    try {
      MainWindow.close();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to close app', error);
    }
  });

  ipcMainOn(IpcChannels.minimizeApp, () => {
    try {
      MainWindow.minimize();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to minimize app', error);
    }
  });

  ipcMainOn(IpcChannels.maximizeApp, () => {
    try {
      MainWindow.toggleMaximize();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to maximize app', error);
    }
  });

  ipcMainOn(IpcChannels.isAppMaximized, (event) => {
    try {
      const res = MainWindow.isMaximized();
      replySuccess(event, IpcChannels.isAppMaximized, { payload: res });
    } catch (error: any) {
      SendErrorToRendererDialog(
        'Failed checking whether app is maximized',
        error,
      );
    }
    return false;
  });

  ipcMainOn(IpcChannels.restartApp, () => {
    try {
      MainWindow.getWebContents()?.reloadIgnoringCache();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to restart app', error);
    }
  });

  ipcMainOn(IpcChannels.toggleDevTools, () => {
    try {
      MainWindow.getWebContents()?.toggleDevTools();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to toggle dev tools', error);
    }
  });
};
