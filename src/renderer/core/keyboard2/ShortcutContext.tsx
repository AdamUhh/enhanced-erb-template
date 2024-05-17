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
  deregisterShortcut: (alias: ShortcutKeybindingsAliases) => void;
  subscribe: (alias: ShortcutKeybindingsAliases, handler: () => void) => void;
  unsubscribe: (alias: ShortcutKeybindingsAliases, handler: () => void) => void;
  runShortcut: (alias: ShortcutKeybindingsAliases) => void;
  getShortcuts: () => Map<ShortcutKeybindingsAliases, ShortcutRegistration[]>;
}

// Create the ShortcutContext with a default value
export const ShortcutContext = createContext<ShortcutContextValue>({
  registerShortcut: () => {},
  deregisterShortcut: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  runShortcut: () => {},
  getShortcuts: () => new Map(),
});
