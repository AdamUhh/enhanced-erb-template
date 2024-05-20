import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { IpcChannels, IpcInvokeReturn } from '../shared/types/ipc';

type SendToRendererType = <T extends IpcChannels>(
  channel: T,
  returnPayload: IpcInvokeReturn<T>,
) => void | undefined;

class ApplicationUpdater {
  public static sendToRenderer: SendToRendererType;

  public static isManualCheck: boolean = false;

  public static initializeAppUpdater(sendToRenderer: SendToRendererType): void {
    this.sendToRenderer = sendToRenderer;
    autoUpdater.logger = log;
    log.transports.file.level = 'info';
    // log.transports.file.resolvePath = () =>
    //   join(app.getPath('downloads'), 'enhanced-erb-logs/main.log');

    autoUpdater.autoInstallOnAppQuit = false;

    autoUpdater.on('error', (err) => {
      sendToRenderer(IpcChannels.appUpdateInfo, {
        success: false,
        msg: 'Error in app updater',
        description: err == null ? 'unknown' : (err.stack || err).toString(),
      });
    });

    // ? not really required since updates are downloaded automatically
    // autoUpdater.on('update-available', () => log.info('update-available'));

    /** No updates available */
    autoUpdater.on('update-not-available', () => {
      // ? only alert user if they manually checked for updates
      if (this.isManualCheck) {
        this.isManualCheck = false;

        sendToRenderer(IpcChannels.appUpdateInfo, {
          success: false,
          msg: 'Update',
          description: 'No updates found',
        });
      }
    });

    /** Download Completion Message */
    autoUpdater.on(
      'update-downloaded',
      async ({ releaseName, releaseNotes }) => {
        sendToRenderer(IpcChannels.appUpdateInfo, {
          success: true,
          msg: releaseName || '',
          description: (releaseNotes as string) || '',
        });
      },
    );

    autoUpdater.checkForUpdates();
  }

  /** User manually checks for an update */
  public static async checkForUpdates() {
    this.isManualCheck = true;
    autoUpdater.checkForUpdates();
  }

  public static async quitAndInstall() {
    try {
      autoUpdater.quitAndInstall();
    } catch (error) {
      console.log('Error installing update:', error);
    }
  }
}

export default ApplicationUpdater;
