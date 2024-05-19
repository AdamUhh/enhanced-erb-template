import { createContext } from 'react';
import { ShortcutRegistration } from './ShortcutRegistry';
import { ShortcutKeybindingsAliases } from './defaults';

interface ShortcutContextValue {
  registerShortcut: (
    alias: ShortcutKeybindingsAliases,
    handler: () => void,
    when?: () => boolean,
    isEventSubscriber?: boolean,
  ) => void;
  unregisterShortcut: (alias: ShortcutKeybindingsAliases) => void;
  subscribe: (alias: ShortcutKeybindingsAliases, handler: () => void) => void;
  unsubscribe: (alias: ShortcutKeybindingsAliases, handler: () => void) => void;
  runShortcut: (alias: ShortcutKeybindingsAliases) => void;
  changeShortcut: (
    alias: ShortcutKeybindingsAliases,
    newKeybind: string,
  ) => void;
  isModifyingShortcut: (isModifying: boolean) => void;
  resetShortcuts: () => void;
  getShortcuts: () => Map<ShortcutKeybindingsAliases, ShortcutRegistration[]>;
  waitingForChord: {
    success: boolean;
    chord: string | null;
  };
}

export interface ShortcutContextTypes extends ShortcutContextValue {
  shortcuts: [ShortcutKeybindingsAliases, ShortcutRegistration[]][];
}

// Create the ShortcutContext with a default value
export const ShortcutContext = createContext<ShortcutContextValue>({
  registerShortcut: () => {},
  unregisterShortcut: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  runShortcut: () => {},
  changeShortcut: () => {},
  isModifyingShortcut: () => {},
  resetShortcuts: () => {},
  getShortcuts: () => new Map(),
  waitingForChord: {
    success: false,
    chord: null,
  },
});
