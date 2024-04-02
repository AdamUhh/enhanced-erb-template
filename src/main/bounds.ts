// ? Source: https://github.com/mawie81/electron-window-state/tree/master
import { BrowserWindow, screen } from 'electron';
import { IpcChannels } from '../shared/types/ipc';
import { getReplyChannel } from '../shared/utils/getReplyChannel';
import { T_WindowBounds } from '../shared/types/coreElectronStore';
import Store from './store';

class Bounds {
  // eslint-disable-next-line no-use-before-define
  private static instance: Bounds;

  private boundsState: T_WindowBounds;

  private mainBrowserRef: BrowserWindow | null;

  // eslint-disable-next-line no-undef
  private stateChangeTimeoutFn: NodeJS.Timeout | null;

  /** delay state handler (prevent being spammed) */
  private stateChangeTimeoutDelay: number;

  private defaultConfigs: any;

  private constructor() {
    // Load previous state from your Store class
    this.boundsState = Store.get('coreWindowBounds') || null;

    this.mainBrowserRef = null;

    this.stateChangeTimeoutFn = null;

    this.stateChangeTimeoutDelay = 100;

    this.defaultConfigs = {
      width: 1024,
      height: 768,
      x: 0,
      y: 0,
    };

    // Check if initialized/Store state is valid
    this.validateState();

    // Set state fallback values
    if (!this.boundsState) this.resetStateToDefault();
  }

  public static getInstance(): Bounds {
    if (!Bounds.instance) Bounds.instance = new Bounds();

    return Bounds.instance;
  }

  /** Checks if the window is not maximized, minimized, or in full screen */
  private isBrowserInNormalState(browser: BrowserWindow) {
    return (
      !browser.isMaximized() &&
      !browser.isMinimized() &&
      !browser.isFullScreen()
    );
  }

  /** Checks validity of state bounds (x, y, width, height)  */
  private hasValidBounds(): boolean {
    return (
      this.boundsState &&
      Number.isInteger(this.boundsState.x) &&
      Number.isInteger(this.boundsState.y) &&
      Number.isInteger(this.boundsState.width) &&
      this.boundsState.width > 0 &&
      Number.isInteger(this.boundsState.height) &&
      this.boundsState.height > 0
    );
  }

  /** Sets state bounds to top left of users primary screen */
  private resetStateToDefault() {
    // ? user display bounds
    const displayBounds = screen.getPrimaryDisplay().bounds;
    this.boundsState = {
      width: this.defaultConfigs.width,
      height: this.defaultConfigs.height,
      x: this.defaultConfigs.x,
      y: this.defaultConfigs.y,
      displayBounds,
    };
  }

  /** Checks if any of the users display bounds are within state bounds */
  private isDisplayWithinBounds(bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    return (
      this.boundsState.x >= bounds.x &&
      this.boundsState.y >= bounds.y &&
      this.boundsState.x + this.boundsState.width <= bounds.x + bounds.width &&
      this.boundsState.y + this.boundsState.height <= bounds.y + bounds.height
    );
  }

  /** Checks if electron window is not partially hidden on any of the users displays
   *
   * If (partially) hidden, reset bounds to default
   */
  private isWindowVisibleOnAnyDisplay() {
    // ? if one of the users displays are within state bounds
    const isVisible = screen
      .getAllDisplays()
      .some((display) => this.isDisplayWithinBounds(display.bounds));
    // ? Electron window is partially or fully hidden in all of the user displays, reset bounds to defaults
    if (!isVisible) this.resetStateToDefault();
  }

  /** Checks if state bounds are valid (bounds, maximized or fullscreen)
   *
   * Used when initializing state bounds from Store
   */
  private validateState() {
    const isValid =
      this.boundsState &&
      (this.hasValidBounds() ||
        this.boundsState.isMaximized ||
        this.boundsState.isFullScreen);

    // ? if state bounds are not valid, set to defaults
    if (!isValid) {
      this.resetStateToDefault();
      return;
    }

    // ? if it is valid (either bounds, maximized, or fullscreen),
    // ? check if state bounds are values & if it includes the users display bounds
    if (this.hasValidBounds() && this.boundsState.displayBounds)
      // ? force electron window to default bounds if (partially) hidden from users display
      this.isWindowVisibleOnAnyDisplay();
  }

  /** Update state bounds */
  private updateState = (browser?: BrowserWindow) => {
    if (!browser) return;

    try {
      const winBounds = browser.getBounds();
      if (this.isBrowserInNormalState(browser)) {
        this.boundsState.x = winBounds.x;
        this.boundsState.y = winBounds.y;
        this.boundsState.width = winBounds.width;
        this.boundsState.height = winBounds.height;
      }
      this.boundsState.isMaximized = browser.isMaximized();
      this.boundsState.isFullScreen = browser.isFullScreen();
      this.boundsState.displayBounds =
        screen.getDisplayMatching(winBounds).bounds;

      this.saveState();

      browser.webContents.send(getReplyChannel(IpcChannels.isAppMaximized), {
        success: true,
        payload: this.boundsState.isMaximized,
      });
    } catch (err) {
      console.log('Error in Bounds.updateState:', err);
    }
  };

  /** state handlers for resize and move */
  private stateChangeHandler = () => {
    if (this.stateChangeTimeoutFn) clearTimeout(this.stateChangeTimeoutFn);

    // ? timeout prevents this.updateState from being spammed, as everytime
    // ? a resize/move event occurs, clearTimeout clears any callbacks
    this.stateChangeTimeoutFn = setTimeout(
      () => this.updateState(this.mainBrowserRef!),
      this.stateChangeTimeoutDelay,
    );
  };

  /** Update window state (if BrowserWindow provided) & save state bounds to store */
  private saveState(browser?: BrowserWindow) {
    // Update window state only if it was provided
    if (browser) this.updateState(browser);

    // Save state to electron store
    Store.set('coreWindowBounds', this.boundsState);
  }

  /** update state one last time when window is going to be closed */
  private closeHandler() {
    this.updateState();
  }

  /** Unregister listeners and save state when window is finally closed */
  private closedHandler() {
    this.removeAllListeners();
  }

  /** Unregister all listeners */
  private removeAllListeners() {
    if (this.mainBrowserRef) {
      this.mainBrowserRef.removeListener(
        'resize',
        this.stateChangeHandler.bind(this),
      );
      this.mainBrowserRef.removeListener(
        'move',
        this.stateChangeHandler.bind(this),
      );
      // eslint-disable-next-line no-undef
      clearTimeout(this.stateChangeTimeoutFn as NodeJS.Timeout);
      this.mainBrowserRef.removeListener('close', this.closeHandler.bind(this));
      this.mainBrowserRef.removeListener(
        'closed',
        this.closedHandler.bind(this),
      );
      this.mainBrowserRef = null;
    }
  }

  /** Initialize listeners */
  public initializeListeners(browser: BrowserWindow) {
    if (!browser) return;

    browser.setBounds({
      width: this.boundsState.width,
      height: this.boundsState.height,
      x: this.boundsState.x,
      y: this.boundsState.y,
    });

    if (this.boundsState.isMaximized) browser.maximize();
    else if (this.boundsState.isFullScreen) browser.setFullScreen(true);

    browser.on('resize', this.stateChangeHandler.bind(this));
    browser.on('move', this.stateChangeHandler.bind(this));
    browser.on('close', this.closeHandler.bind(this));
    browser.on('closed', this.closedHandler.bind(this));

    this.mainBrowserRef = browser;
  }
}

export default Bounds;
