import { AppElectronStore } from '../../renderer/store/types';
import { Bounds } from './bounds';
import { ShortcutKeybindingsAliases } from './keybindings';

export const CORE_WINDOW_BOUNDS = 'coreWindowBounds';
export const CORE_USER_KEYBINDS = 'coreUserKeybinds';

export interface CoreElectronStore extends AppElectronStore {
  [CORE_WINDOW_BOUNDS]: Bounds;
  [CORE_USER_KEYBINDS]: {
    alias: ShortcutKeybindingsAliases;
    keybind: string;
  }[];
}
