import { Bounds } from './bounds';
import { GenericFunction, GenericVoidFunction } from './generic';
import {
  I_IpcApi,
  IpcChannels,
  SetStoreValuePayload,
  IpcPayload,
  IpcInvokeReturn,
} from './ipc';
import { CoreElectronStore } from './coreElectronStore';
import { I_ElectronApi } from './window';

export type {
  Bounds,
  I_ElectronApi,
  GenericFunction,
  GenericVoidFunction,
  I_IpcApi,
  IpcPayload,
  IpcInvokeReturn,
  CoreElectronStore as LocalElectronStore,
  SetStoreValuePayload,
};

export { IpcChannels };
