import { GenericFunction } from './generic';
import { LocalElectronStore } from './localElectronStore';

type SetStoreValuePayload = {
  key: keyof LocalElectronStore;
  state: LocalElectronStore[keyof LocalElectronStore];
};

type IpcPayload = {
  'clear-store': any;
  'export-store-data': any;
  'import-store-data': any;
  'load-store-data': any;
  'restart-app': any;
  'set-store-value': SetStoreValuePayload;
  'get-store-value': any;
};

interface IpcApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  send<T extends keyof IpcPayload>(
    channel: T,
    payload?: T extends 'set-store-value' ? SetStoreValuePayload : any,
  ): void;
}

enum IpcChannels {
  clearStore = 'clear-store',
  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',
  restartApp = 'restart-app',
  setStoreValue = 'set-store-value',
  getStoreValue = 'get-store-value',
}

export { IpcChannels };

export type { IpcApi, IpcPayload, SetStoreValuePayload };
