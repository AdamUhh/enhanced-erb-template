import { Bounds } from './bounds';
import { CoreElectronStore } from './coreElectronStore';
import { GenericFunction, GenericVoidFunction } from './generic';
import {
  I_IpcApi,
  IpcChannels,
  IpcInvokeReturn,
  IpcPayload,
  SetStoreValuePayload,
} from './ipc';
import {
  Shortcut,
  ShortcutEventListener,
  ShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from './keybindings';
import { I_ElectronApi } from './window';

export type {
  Bounds,
  GenericFunction,
  GenericVoidFunction,
  I_ElectronApi,
  I_IpcApi,
  IpcInvokeReturn,
  IpcPayload,
  CoreElectronStore as LocalElectronStore,
  SetStoreValuePayload,
  Shortcut,
  ShortcutEventListener,
};

export { IpcChannels, ShortcutKeybindings, ShortcutKeybindingsAliases };
