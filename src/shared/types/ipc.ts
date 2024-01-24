import { GenericFunction } from './generic';
import { LocalElectronStore } from './localElectronStore';

type SetStoreValuePayload = {
  key: keyof LocalElectronStore;
  state: LocalElectronStore[keyof LocalElectronStore];
};

/**
 * Typesafety payload for ipcChannels
 */
type IpcPayload = {
  'close-app': any;
  'minimize-app': any;
  'maximize-app': any;
  'restart-app': any;
  'clear-store': any;
  'export-store-data': any;
  'import-store-data': any;
  'load-store-data': any;
  'set-store-value': SetStoreValuePayload;
  'get-store-value': any;
};

interface I_IpcApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  removeAllListeners(channel: string): void;
  send<T extends keyof IpcPayload>(
    channel: T,
    payload?: T extends 'set-store-value' ? SetStoreValuePayload : any,
  ): void;
  invoke<R, T extends keyof IpcPayload = keyof IpcPayload>(
    channel: T,
    payload?: T extends 'set-store-value' ? SetStoreValuePayload : any,
  ): Promise<{ success: boolean; payload: R }>;
}

enum IpcChannels {
  closeApp = 'close-app',
  minimizeApp = 'minimize-app',
  maximizeApp = 'maximize-app',
  restartApp = 'restart-app',
  clearStore = 'clear-store',
  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',
  setStoreValue = 'set-store-value',
  getStoreValue = 'get-store-value',
}

export { IpcChannels };

export type { I_IpcApi, IpcPayload, SetStoreValuePayload };
