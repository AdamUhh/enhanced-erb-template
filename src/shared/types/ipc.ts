import { CoreElectronStore } from './coreElectronStore';
import { GenericFunction } from './generic';

export type SetStoreValuePayload = {
  key: keyof CoreElectronStore;
  state: CoreElectronStore[keyof CoreElectronStore];
};

export enum IpcChannels {
  closeApp = 'close-app',
  minimizeApp = 'minimize-app',
  maximizeApp = 'maximize-app',
  isAppMaximized = 'is-app-maximized',
  restartApp = 'restart-app',
  clearStore = 'clear-store',
  checkForUpdates = 'check-for-updates',
  toggleDevTools = 'toggle-dev-tools',

  toggleRendererErrorDialog = 'toggle-renderer-error-dialog',

  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',

  setStoreValue = 'set-store-value',
  getStoreValue = 'get-store-value',

  toggleExampleVisibility = 'toggle-example-visibility',
}

/** Typesafe: Expected payload INPUT for ipcChannels */
export type IpcExpectedPayloadLookup = {
  [IpcChannels.setStoreValue]: SetStoreValuePayload;
  [IpcChannels.getStoreValue]: keyof CoreElectronStore;
  [IpcChannels.toggleExampleVisibility]: { showBye: boolean } | null;
};

/** Typesafe: Expected payload RETURN for ipcChannels */
export type IpcExpectedReturnLookup = {
  [IpcChannels.isAppMaximized]: boolean;
  [IpcChannels.getStoreValue]: CoreElectronStore[keyof CoreElectronStore];
  [IpcChannels.toggleExampleVisibility]: boolean;
};

/** Typesafe: Special expected payload RETURN, specifically for ipcMain.handle ipcChannels
 *
 * This overrides return from IpcExpectedReturnLookup
 */
export type IpcExpectedMainHandleReturnLookup = {
  [IpcChannels.setStoreValue]: CoreElectronStore[keyof CoreElectronStore];
};

/**
 * Represents the return type of an IPC (Inter-Process Communication) invoke operation.
 * @template P The type of the payload included in the response.
 */
export type IpcInvokeReturn<P = any> = {
  success: boolean;
  msg: string;
  payload: P;
};

/**
 * Represents the error return type of an IPC invoke operation.
 */
export type IpcInvokeErrorReturn = {
  success: false;
  msg: string;
  payload: string;
};

/**
 * Represents the expected payload type for a specific IPC channel.
 * @template T The type of the IPC channel.
 * @template P The type of the payload.
 */
export type IpcExpectedPayload<
  T extends IpcChannels,
  P = undefined,
> = T extends keyof IpcExpectedReturnLookup ? IpcExpectedReturnLookup[T] : P;

/**
 * Represents the expected payload type specifically for a main process IPC handle.
 * @template T The type of the IPC channel.
 * @template P The type of the payload.
 */
export type IpcExpectedMainHandlePayload<
  T extends IpcChannels,
  P = undefined,
> = T extends keyof IpcExpectedMainHandleReturnLookup
  ? IpcExpectedMainHandleReturnLookup[T]
  : P;

/**
 * Represents the expected payload return type for an IPC channel
 * with main process handle types having priority
 * @template T The type of the IPC channel.
 * @template P The type of the payload.
 */
export type IpcExpectedPayloadReturn<
  T extends IpcChannels,
  P = undefined,
> = T extends keyof IpcExpectedMainHandleReturnLookup
  ? IpcExpectedMainHandleReturnLookup[T]
  : IpcExpectedPayload<T, P>;

/**
 * Represents the return type for an IPC channel.
 * @template T The type of the IPC channel.
 */
export type IpcReturn<T extends IpcChannels> =
  | IpcInvokeReturn<IpcExpectedPayloadReturn<T>>
  | IpcInvokeErrorReturn;

/**
 * Represents the conditional input type for an IPC channel.
 * @template T The type of the IPC channel.
 */
export type IpcInputConditional<T extends IpcChannels> =
  T extends keyof IpcExpectedPayloadLookup
    ? IpcExpectedPayloadLookup[T]
    : undefined;

export interface I_IpcApi {
  /**
   * Attaches an event listener to the specified IPC channel.
   * @param {string} channel - The IPC channel to listen on.
   * @param {function} func - The function to be executed when the event occurs.
   */
  on(channel: string, callback: GenericFunction): void;
  /**
   * Removes an event listener from the specified IPC channel.
   * @param {string} channel - The IPC channel to remove the listener from.
   * @param {function} func - The function to be removed from the listeners.
   */
  removeListener(channel: string, callback: GenericFunction): void;
  /**
   * Removes all event listeners from the specified IPC channel.
   * @param {string} channel - The IPC channel to remove the listener from.
   */
  removeAllListeners(channel: string): void;
  /**
   * Sends a message to the specified IPC channel.
   * @param {string} channel - The IPC channel to send the message to.
   * @param {any} payload - The data to be sent with the message.
   */
  send<T extends IpcChannels>(
    ...args: T extends keyof IpcExpectedPayloadLookup
      ? [channel: T, payload: IpcInputConditional<T>]
      : [channel: T]
  ): void;
  /**
   * Sends a message to the specified IPC channel and back to renderer
   * @param {string} channel - The IPC channel to send the message to.
   * @param {any} payload - The data to be sent with the message.
   */
  invoke<T extends IpcChannels>(
    ...args: T extends keyof IpcExpectedPayloadLookup
      ? [channel: T, payload: IpcInputConditional<T>]
      : [channel: T]
  ): Promise<IpcReturn<T>>;
}
