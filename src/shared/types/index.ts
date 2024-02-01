import { DefaultShortcutKeybindings } from '../keyboard/defaultKeybindings';
import { ShortcutKeybindingsAliases } from '../keyboard/keybindingAliases';
import { CoreElectronStore } from './coreElectronStore';
import { GenericFunction, GenericVoidFunction } from './generic';
import {
  I_IpcApi,
  IpcChannels,
  IpcInvokeReturn,
  IpcPayload,
  SetStoreValuePayload,
} from './ipc';
import { Shortcut } from './keybindings';
import { I_ElectronApi } from './window';

export type {
  GenericFunction,
  GenericVoidFunction,
  I_ElectronApi,
  I_IpcApi,
  IpcInvokeReturn,
  IpcPayload,
  CoreElectronStore,
  SetStoreValuePayload,
  Shortcut,
};

export { DefaultShortcutKeybindings, IpcChannels, ShortcutKeybindingsAliases };
