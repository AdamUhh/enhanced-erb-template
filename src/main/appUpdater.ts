import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { IpcChannels, IpcInvokeReturn } from '../shared/types/ipc';

type SendToRendererType = <T extends IpcChannels>(
  channel: T,
  returnPayload: IpcInvokeReturn<T>,
) => void | undefined;

class ApplicationUpdater {
  public static sendToRenderer: SendToRendererType;

  public static initializeAppUpdater(sendToRenderer: SendToRendererType): void {
    this.sendToRenderer = sendToRenderer;
    autoUpdater.logger = log;
    log.transports.file.level = 'info';

    autoUpdater.autoInstallOnAppQuit = false;
    autoUpdater.fullChangelog = true;

    autoUpdater.on('update-available', () => log.info('update-available'));

    autoUpdater.on('error', (err) => {
      sendToRenderer(IpcChannels.appUpdateInfo, {
        success: false,
        msg: 'Error in autoUpdater',
        description: err == null ? 'unknown' : (err.stack || err).toString(),
      });
      // dialog.showErrorBox(
      //   'Error in auto-updater',
      //   err == null ? 'unknown' : (err.stack || err).toString(),
      // );
    });

    autoUpdater.on('update-downloaded', async ({ releaseName }) => {
      const formattedReleaseNotes = '';

      // Show the message box with formatted release notes
      dialog
        .showMessageBox({
          title: 'Update Available',
          type: 'question',
          detail: `${releaseName || ''}\n${formattedReleaseNotes || ''}`,
          message: 'Update available. Install now and restart?',
          buttons: ['Install and Relaunch', 'Later'],
          defaultId: 0,
          cancelId: 1,
        })
        .then((result) => {
          if (result.response === 0) autoUpdater.quitAndInstall();
        })
        .catch((error) => {
          log.info(error);
        });
    });

    autoUpdater.checkForUpdates();
  }

  /**
   * User manually checks for an update
   */
  public static async checkForUpdates(): Promise<void> {
    try {
      const updateResult = await autoUpdater.checkForUpdates();
      if (!updateResult)
        // dialog.showMessageBox({
        //   title: 'Update',
        //   type: 'info',
        //   message: 'No updates found',
        //   buttons: ['Okay'],
        //   cancelId: 0,
        // });
        this.sendToRenderer(IpcChannels.appUpdateInfo, {
          success: false,
          msg: 'Update',
          description: 'No updates found',
        });
    } catch (error) {
      console.log('Error checking for updates:', error);
    }
  }
}

export default ApplicationUpdater;
