/* eslint global-require: off, @typescript-eslint/no-var-requires: off */

import {
  app,
  BrowserWindow,
  Rectangle,
  screen,
  shell,
  WebContents,
} from 'electron';
import path from 'path';

import { GenericVoidFunction } from '../shared/types';
import Store from './store';
import { resolveHtmlPath } from './util';

type OnEventType = 'closed' | 'ready-to-show' | 'close' | 'resize';

// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

class MainWindow {
  private static instance: BrowserWindow | null = null;

  public static async createWindow(): Promise<void> {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    MainWindow.set(
      new BrowserWindow({
        icon: getAssetPath('icon.png'),
        show: false,
        webPreferences: {
          preload: app.isPackaged
            ? path.join(__dirname, 'preload.js')
            : path.join(__dirname, '../../.erb/dll/preload.js'),
          sandbox: false,
          devTools: true,
        },
        frame: false,
      }),
    );

    /**
     * Retrieves the saved bounds from the store and checks if they are within the screen area.
     * If the saved bounds are not within the screen area, resets the window to default bounds.
     * Otherwise, sets the window bounds to the saved bounds.
     * Source: https://github.com/electron/electron/issues/526#issuecomment-1663959513
     */
    const savedBounds: Rectangle = Store.get('coreWindowBounds') as Rectangle;
    if (savedBounds !== undefined) {
      const screenArea = screen.getDisplayMatching(savedBounds).workArea;
      // ? Note: + 7 is required, as for some reason `Win+LShift+LeftArrow` saves `x` bound as -7
      if (
        savedBounds.x > screenArea.x + screenArea.width ||
        savedBounds.x + 7 < screenArea.x ||
        savedBounds.y < screenArea.y ||
        savedBounds.y > screenArea.y + screenArea.height
      ) {
        // ? Default bounds
        // ? Reset window into existing screenarea
        MainWindow.instance?.setBounds({
          x: 0,
          y: 0,
          width: 1024,
          height: 768,
        });
      } else {
        MainWindow.instance?.setBounds(savedBounds);
      }
    }

    MainWindow.loadURL(resolveHtmlPath('index.html'));

    MainWindow.on('ready-to-show', () => {
      if (!MainWindow.exists()) {
        throw new Error('"MainWindow" is not defined');
      }
      // if (process.env.START_MINIMIZED)
      //   MainWindow.minimize();
      // else
      MainWindow.show();
    });

    /**
     * Handles the 'resize' event of the mainWindow and saves its bounds to the store.
     */
    MainWindow.on('resize', () => {
      if (MainWindow.exists()) {
        Store.set('coreWindowBounds', MainWindow.instance!.getBounds());
      }
    });

    /**
     * Handles the 'close' event of the mainWindow and saves its bounds to the store.
     */
    MainWindow.on('close', () => {
      if (MainWindow.exists())
        Store.set('coreWindowBounds', MainWindow.instance!.getBounds());
    });

    MainWindow.on('closed', () => {
      MainWindow.set(null);
    });

    // const menuBuilder = new MenuBuilder(MainWindow.instance!);
    // menuBuilder.buildMenu();

    // Open urls in the user's browser
    MainWindow.getWebContents()?.setWindowOpenHandler((eventData) => {
      shell.openExternal(eventData.url);
      return { action: 'deny' };
    });

    MainWindow.getWebContents()?.openDevTools();

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    //   new AppUpdater();
  }

  /**
   * Checks if the main window instance exists.
   * @returns {boolean} Returns true if the main window instance exists, false otherwise.
   */
  public static exists(): boolean {
    return !!MainWindow.instance;
  }

  /**
   * Gets the web contents of the main window.
   * @returns {WebContents | null} Returns the web contents of the main window or null if it doesn't exist.
   */
  public static getWebContents(): WebContents | null {
    return MainWindow.instance?.webContents || null;
  }

  /**
   * Loads the specified URL in the main window.
   * @param {string} url - The URL to be loaded in the main window.
   */
  public static loadURL(url: string): void {
    MainWindow.instance?.loadURL(url);
  }

  /**
   * Minimizes the main window.
   */
  public static minimize(): void {
    MainWindow.instance?.minimize();
  }

  /**
   * Maximizes the main window.
   */
  public static maximize(): void {
    MainWindow.instance?.maximize();
  }

  /**
   * Closes the main window.
   */
  public static close(): void {
    MainWindow.instance?.close();
  }

  /**
   * Attaches an event listener to the main window.
   * @param {OnEventType} event - The type of event to listen for.
   * @param {GenericVoidFunction} listener - The function to be executed when the event occurs.
   */
  public static on(event: OnEventType, listener: GenericVoidFunction): void {
    MainWindow.instance?.on(event as any, listener);
  }

  /**
   * Sets the main window instance.
   * @param {BrowserWindow | null} window - The main window instance to be set.
   */
  public static set(window: BrowserWindow | null): void {
    MainWindow.instance = window;
  }

  /**
   * Shows the main window.
   */
  public static show(): void {
    MainWindow.instance?.show();
  }
}

export default MainWindow;
