import { AppElectronStore } from '../../renderer/store/types';
import { ShortcutKeybindingsAliases } from '../keyboard/keybindingAliases';

export const CORE_WINDOW_BOUNDS = 'coreWindowBounds';
export const CORE_USER_KEYBINDS = 'coreUserKeybinds';

/**
 * This is used to typesafe the returns (`Store.get`) of your electron store
 *
 * Left hand side (`the key`) is the name of the channel to get typesafety from
 *
 * Right hand side (`the value`) is the expected return of that channel
 */
export interface CoreElectronStore extends AppElectronStore {
  // eslint-disable-next-line no-undef
  [CORE_WINDOW_BOUNDS]: Electron.Rectangle;
  [CORE_USER_KEYBINDS]: {
    alias: ShortcutKeybindingsAliases;
    keybind: string;
  }[];
}
