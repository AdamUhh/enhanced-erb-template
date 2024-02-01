import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AppUpdater {
  constructor() {
    autoUpdater.logger = log;
    log.transports.file.level = 'debug';
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;
  }

  //   public initializeUpdateListeners() {
  //     this.updateAvailable();
  //   }

  //   private updateAvailable() {
  //     autoUpdater.on('update-available', (info) => {});
  //   }
}

export { AppUpdater };
