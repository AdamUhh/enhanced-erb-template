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
  toggleDevTools = 'toggle-dev-tools',
  checkForUpdates = 'check-for-updates',
  quitAndInstallUpdates = 'quit-and-install-updates',
  appUpdateInfo = 'app-update-info',

  toggleRendererErrorDialog = 'toggle-renderer-error-dialog',

  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',

  setStoreValue = 'set-store-value',
  getStoreValue = 'get-store-value',

  toggleExampleVisibility = 'toggle-example-visibility',
}

/** Typesafe: Expected payload INPUT for ipcChannels */
export type IpcPayloadInputLookup = {
  [IpcChannels.setStoreValue]: SetStoreValuePayload;
  [IpcChannels.getStoreValue]: keyof CoreElectronStore;
  [IpcChannels.toggleExampleVisibility]: boolean | undefined;
};

/** Typesafe: Expected payload RETURN for ipcChannels */
export type IpcPayloadOutputLookup = {
  [IpcChannels.isAppMaximized]: boolean;
  [IpcChannels.getStoreValue]: CoreElectronStore[keyof CoreElectronStore];
  [IpcChannels.toggleExampleVisibility]: boolean;
};

/** Typesafe: Special expected payload RETURN, specifically for ipcMain.handle ipcChannels
 *
 * This overrides return from IpcExpectedReturnLookup
 */
export type IpcMainPayloadOutputLookup = {
  [IpcChannels.setStoreValue]: CoreElectronStore[keyof CoreElectronStore];
};
/**
 * Generic format for IPC return payloads.
 * @template P - The type of the payload.
 */
export type IpcReturnFormat<P = any> = {
  success: boolean;
  msg?: string;
  description?: string;
  payload?: P;
};

/**
 * Generic format for IPC error return payloads.
 * @template P - The type of the payload.
 */
export type IpcErrorReturnFormat<P = any> = {
  success: false;
  msg: string;
  description?: string;
  payload?: P;
};

/**
 * Type for the expected output payload when using ipcRenderer.send.
 * @template T - The IPC channel.
 * @template P - The expected payload type if not defined in the IpcPayloadOutputLookup.
 */
export type IpcSendPayloadOutput<
  T extends IpcChannels,
  P = undefined,
> = T extends keyof IpcPayloadOutputLookup ? IpcPayloadOutputLookup[T] : P;

/**
 * Type for the expected output payload when using ipcMain.handle.
 * @template T - The IPC channel.
 * @template P - The expected payload type if not defined in the IpcMainPayloadOutputLookup.
 */
export type IpcMainPayloadOutput<
  T extends IpcChannels,
  P = undefined,
> = T extends keyof IpcMainPayloadOutputLookup
  ? IpcMainPayloadOutputLookup[T]
  : P;

/**
 * Type for the expected output payload when using IPC communication.
 * @template T - The IPC channel.
 * @template P - The expected payload type if not defined in the IpcPayloadOutputLookup or IpcMainPayloadOutputLookup.
 */
export type IpcPayloadOutput<
  T extends IpcChannels,
  P = undefined,
> = T extends keyof IpcMainPayloadOutputLookup
  ? IpcMainPayloadOutputLookup[T]
  : IpcSendPayloadOutput<T, P>;

/**
 * Type for the expected return value when using ipcRenderer.invoke.
 * @template T - The IPC channel.
 */
export type IpcInvokeReturn<T extends IpcChannels> =
  | IpcReturnFormat<IpcPayloadOutput<T>>
  | IpcErrorReturnFormat;

/**
 * Type for the expected return value when using ipcMain.handle.
 * @template T - The IPC channel.
 */
export type IpcReturn<T extends IpcChannels> = IpcReturnFormat<
  IpcPayloadOutput<T>
>;

/**
 * Type for the expected return value when using ipcRenderer.send.
 * @template T - The IPC channel.
 */
export type IpcSendReturn<T extends IpcChannels> = IpcReturnFormat<
  IpcSendPayloadOutput<T>
>;

/**
 * Type for the expected input payload when using IPC communication.
 * @template T - The IPC channel.
 */
export type IpcExpectedInput<T extends IpcChannels> =
  T extends keyof IpcPayloadInputLookup ? IpcPayloadInputLookup[T] : undefined;

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
    ...args: T extends keyof IpcPayloadInputLookup
      ? [channel: T, payload: IpcExpectedInput<T>]
      : [channel: T]
  ): void;
  /**
   * Sends a message to the specified IPC channel and back to renderer
   * @param {string} channel - The IPC channel to send the message to.
   * @param {any} payload - The data to be sent with the message.
   */
  invoke<T extends IpcChannels>(
    ...args: T extends keyof IpcPayloadInputLookup
      ? [channel: T, payload: IpcExpectedInput<T>]
      : [channel: T]
  ): Promise<IpcInvokeReturn<T>>;
}
