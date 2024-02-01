import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { dialog } from 'electron';

// class AppUpdater {
//   constructor() {
//     autoUpdater.logger = log;
//     log.transports.file.level = 'debug';
//     autoUpdater.checkForUpdatesAndNotify();

//     autoUpdater.autoDownload = false;
//     autoUpdater.autoInstallOnAppQuit = true;
//   }
// }

class AppUpdater {
  constructor() {
    autoUpdater.logger = log;
    log.transports.file.level = 'debug';

    autoUpdater.on('update-available', () => {
      dialog.showMessageBox({
        type: 'info',
        message: 'Update available. Downloading...',
      });
    });

    autoUpdater.on('error', (err) => {
      dialog.showErrorBox(
        'Error in auto-updater',
        err == null ? 'unknown' : (err.stack || err).toString(),
      );
    });

    autoUpdater.on('update-downloaded', async () => {
      /** response - The index of the clicked button */
      const response = await dialog.showMessageBox({
        type: 'question',
        buttons: ['Install and Relaunch', 'Auto-Install when I close the app'],
        defaultId: 0,
        message: 'Update downloaded. Install now and restart?',
      });

      if ((response as unknown as number) === 0) {
        autoUpdater.quitAndInstall();
      }
    });

    // Check for updates
    autoUpdater.checkForUpdates();
  }

  checkForUpdates() {
    autoUpdater.checkForUpdates();
  }
}

export default AppUpdater;

export { AppUpdater };
