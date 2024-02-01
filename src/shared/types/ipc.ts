import { GenericFunction } from './generic';
import { CoreElectronStore } from './coreElectronStore';

type SetStoreValuePayload = {
  key: keyof CoreElectronStore;
  state: CoreElectronStore[keyof CoreElectronStore];
};

enum IpcChannels {
  closeApp = 'close-app',
  minimizeApp = 'minimize-app',
  maximizeApp = 'maximize-app',
  restartApp = 'restart-app',
  clearStore = 'clear-store',
  checkForUpdates = 'check-for-updates',
  toggleDevTools = 'toggle-dev-tools',
  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',
  setStoreValue = 'set-store-value',
  getStoreValue = 'get-store-value',
}

type IpcInvokeReturn<P extends any = any> = {
  success: boolean;
  msg: string;
  payload?: P;
};

/**
 * Typesafety: Expected payload input for ipcChannels
 */
type IpcPayload = {
  [key in IpcChannels]: key extends 'set-store-value'
    ? SetStoreValuePayload
    : any;
};

interface I_IpcApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  removeAllListeners(channel: string): void;
  send<T extends keyof IpcPayload>(
    channel: T,
    payload?: T extends 'set-store-value' ? SetStoreValuePayload : any,
  ): void;
  invoke<P extends any | any[], T extends keyof IpcPayload = keyof IpcPayload>(
    channel: T,
    payload?: T extends 'set-store-value' ? SetStoreValuePayload : any,
  ): Promise<IpcInvokeReturn<P>>;
}

export { IpcChannels };

export type { I_IpcApi, IpcPayload, SetStoreValuePayload, IpcInvokeReturn };
