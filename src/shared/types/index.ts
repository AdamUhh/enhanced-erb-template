import { Bounds } from './bounds';
import { GenericFunction, GenericVoidFunction } from './generic';
import { I_IpcApi, IpcChannels, SetStoreValuePayload } from './ipc';
import { LocalElectronStore } from './localElectronStore';
import { I_ElectronApi } from './window';

export type {
  Bounds,
  I_ElectronApi,
  GenericFunction,
  GenericVoidFunction,
  I_IpcApi,
  LocalElectronStore,
  SetStoreValuePayload,
};

export { IpcChannels };
