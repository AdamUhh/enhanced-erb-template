import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
// ? TODO: Remove need for jsdom, directly send to renderer

class ApplicationUpdater {
  private static didUserCheckForUpdate: boolean = false;

  public static initializeAppUpdater(): void {
    autoUpdater.logger = log;
    log.transports.file.level = 'info';

    autoUpdater.autoInstallOnAppQuit = false;
    autoUpdater.fullChangelog = true;

    autoUpdater.on('update-available', () => log.info('update-available'));

    autoUpdater.on('error', (err) => {
      dialog.showErrorBox(
        'Error in auto-updater',
        err == null ? 'unknown' : (err.stack || err).toString(),
      );
    });

    autoUpdater.on('update-downloaded', async ({ releaseName }) => {
      const formattedReleaseNotes = '';

      // if (Array.isArray(releaseNotes)) {
      //   // If releaseNotes is an array, iterate over each item and extract text content
      //   formattedReleaseNotes = releaseNotes
      //     .map((r) => {
      //       if (r.note) {
      //         const dom = new JSDOM(r.note);
      //         return dom.window.document.body.textContent || "";
      //       }
      //       return "";
      //     })
      //     .join("\n");
      // } else if (typeof releaseNotes === "string") {
      //   // If releaseNotes is a string, extract text content
      //   const dom = new JSDOM(releaseNotes);
      //   formattedReleaseNotes = dom.window.document.body.textContent || "";
      // }

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
  public static checkForUpdates(): void {
    this.generateNoUpdateAvailable();
    autoUpdater.checkForUpdates();
  }

  private static generateNoUpdateAvailable(): void {
    // ? generate only one listener
    if (!ApplicationUpdater.didUserCheckForUpdate) {
      autoUpdater.on('update-not-available', () =>
        dialog.showMessageBox({
          title: 'Update',
          type: 'info',
          message: 'No updates found',
          buttons: ['Okay'],
          cancelId: 0,
        }),
      );
      ApplicationUpdater.didUserCheckForUpdate = true;
    }
  }
}

export default ApplicationUpdater;
