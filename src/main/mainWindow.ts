import { app, BrowserWindow, shell, WebContents } from 'electron';
import path from 'path';

import { GenericVoidFunction } from '../shared/types/generic';
import { IpcChannels, IpcInvokeReturn } from '../shared/types/ipc';
import { isDevelopment } from '../shared/utils/environment';
import { getReplyChannel } from '../shared/utils/getReplyChannel';
import ApplicationUpdater from './appUpdater';
import Bounds from './bounds';
import DummyMenu from './menu';
import { resolveHtmlPath } from './utils/resolvePath';

// async function installExtensions() {
//   installExtension(REACT_DEVELOPER_TOOLS, {
//     forceDownload: true,
//     loadExtensionOptions: { allowFileAccess: true },
//   })
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.error('An error occurred "redux_devtools": ', err));
// }

type OnEventType = 'closed' | 'ready-to-show' | 'close' | 'resized' | 'moved';

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
        icon: getAssetPath('icons/64x64.png'),
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

    // ? Initialize window bounds listeners (resize, move, etc)
    Bounds.getInstance().initializeListeners(MainWindow.instance!);

    MainWindow.loadURL(resolveHtmlPath('index.html'));

    MainWindow.on('ready-to-show', () => {
      if (!MainWindow.exists()) throw new Error('"MainWindow" is not defined');
      MainWindow.show();
    });

    MainWindow.on('closed', () => MainWindow.set(null));

    /**
     * Open urls in the user's browser
     */
    MainWindow.getWebContents()?.setWindowOpenHandler((eventData) => {
      shell.openExternal(eventData.url);
      return { action: 'deny' };
    });

    DummyMenu(MainWindow.getWebContents());

    if (isDevelopment) MainWindow.getWebContents()?.openDevTools();

    // if (!isDevelopment)
    ApplicationUpdater.initializeAppUpdater(MainWindow.sendToRenderer);
  }

  /**
   * Checks if the main window instance exists.
   * @returns Returns true if the main window instance exists, false otherwise.
   */
  public static exists(): boolean {
    return !!MainWindow.instance;
  }

  /**
   * Gets the web contents of the main window.
   * @returns Returns the web contents of the main window or null if it doesn't exist.
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
   * @returns boolean
   */
  public static toggleMaximize(): boolean {
    if (MainWindow.instance?.isMaximized()) {
      MainWindow.instance.unmaximize();
      return false;
    }
    MainWindow.instance?.maximize();
    return true;
  }

  /**
   * Checks if main window maximized
   * @returns boolean
   */
  public static isMaximized(): boolean {
    return MainWindow.instance?.isMaximized() ?? false;
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
   * Gets the main window instance.
   * @returns {BrowserWindow | null} window - The main window instance.
   */
  public static get(): BrowserWindow | null {
    return MainWindow.instance;
  }

  /**
   * Sends an ipc message to the renderer
   * @param channel - Channel to send message to. This is automatically converted into a `*-reply` channel
   */
  public static sendToRenderer<T extends IpcChannels>(
    channel: T,
    returnPayload: IpcInvokeReturn<T>,
  ) {
    return MainWindow.instance?.webContents.send(
      getReplyChannel(channel),
      returnPayload,
    );
  }

  /**
   * Shows the main window.
   */
  public static show(): void {
    MainWindow.instance?.show();
  }
}

export default MainWindow;
