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
import MenuBuilder from './menu';
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
    // if (isDevelopment) {
    //   await installExtensions();
    // }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    MainWindow.set(
      new BrowserWindow({
        height: 1080,
        icon: getAssetPath('icon.png'),
        show: false,
        webPreferences: {
          preload: app.isPackaged
            ? path.join(__dirname, 'preload.js')
            : path.join(__dirname, '../../.erb/dll/preload.js'),
          sandbox: false,
        },
        width: 1920,
      }),
    );

    MainWindow.loadURL(resolveHtmlPath('index.html'));

    MainWindow.on('ready-to-show', () => {
      if (!MainWindow.exists()) {
        throw new Error('"MainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        MainWindow.minimize();
      } else {
        MainWindow.show();
      }
    });

    /**
     * Retrieves the saved bounds from the store and checks if they are within the screen area.
     * If the saved bounds are not within the screen area, resets the window to default bounds.
     * Otherwise, sets the window bounds to the saved bounds.
     * Source: https://github.com/electron/electron/issues/526#issuecomment-1663959513
     */
    const savedBounds: Rectangle = Store.get('coreWindowBounds') as Rectangle;
    if (savedBounds !== undefined) {
      const screenArea = screen.getDisplayMatching(savedBounds).workArea;
      if (
        savedBounds.x > screenArea.x + screenArea.width ||
        savedBounds.x < screenArea.x ||
        savedBounds.y < screenArea.y ||
        savedBounds.y > screenArea.y + screenArea.height
      ) {
        // Reset window into existing screenarea
        MainWindow.instance?.setBounds({
          x: 0,
          y: 0,
          width: 1024,
          height: 768,
        });
      } else {
        const _bounds = Store.get('coreWindowBounds');
        if (_bounds) MainWindow.instance?.setBounds(_bounds);
      }
    }

    /**
     * Handles the 'close' event of the mainWindow and saves its bounds to the store.
     */
    MainWindow.on('resize', () => {
      if (MainWindow.exists())
        Store.set('coreWindowBounds', MainWindow.instance!.getBounds());
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

    const menuBuilder = new MenuBuilder(MainWindow.instance!);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    MainWindow.getWebContents()?.setWindowOpenHandler((eventData) => {
      shell.openExternal(eventData.url);
      return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    //   new AppUpdater();
  }

  public static exists(): boolean {
    return !!MainWindow.instance;
  }

  public static getWebContents(): WebContents | null {
    return MainWindow.instance?.webContents || null;
  }

  public static loadURL(url: string): void {
    MainWindow.instance?.loadURL(url);
  }

  public static minimize(): void {
    MainWindow.instance?.minimize();
  }

  public static on(event: OnEventType, listener: GenericVoidFunction): void {
    MainWindow.instance?.on(event as any, listener);
  }

  public static set(window: BrowserWindow | null): void {
    MainWindow.instance = window;
  }

  public static show(): void {
    MainWindow.instance?.show();
  }
}

export default MainWindow;
