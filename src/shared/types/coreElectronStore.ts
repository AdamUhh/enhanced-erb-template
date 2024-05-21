import { Rectangle } from 'electron';
import { ShortcutKeybindingsAliases } from '../../renderer/core/keyboard/defaults';
import { AppElectronStore } from '../../renderer/store/appElectronStore';

export type T_WindowBounds = Rectangle & {
  displayBounds?: Rectangle;
  isMaximized?: boolean;
  isFullScreen?: boolean;
};

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
  [CORE_WINDOW_BOUNDS]: T_WindowBounds;
  [CORE_USER_KEYBINDS]: {
    alias: ShortcutKeybindingsAliases;
    keybind: string;
  }[];
}
