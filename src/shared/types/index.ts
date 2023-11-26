import { Bounds } from './bounds';
import { GenericFunction, GenericVoidFunction } from './generic';
import { IpcApi, IpcChannels, SetStoreValuePayload } from './ipc';
import { LocalElectronStore } from './localElectronStore';
import { ElectronApi } from './window';

export type {
  Bounds,
  ElectronApi,
  GenericFunction,
  GenericVoidFunction,
  IpcApi,
  LocalElectronStore,
  SetStoreValuePayload,
};

export { IpcChannels };
