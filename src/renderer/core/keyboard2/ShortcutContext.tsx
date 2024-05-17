import { createContext } from 'react';

interface ShortcutContextValue {
  registerShortcut: (
    alias: string,
    handler: () => void,
    when?: () => boolean,
  ) => void;
  deregisterShortcut: (alias: string) => void;
  activeShortcut: string | null;
}

// Create the ShortcutContext with a default value
export const ShortcutContext = createContext<ShortcutContextValue>({
  registerShortcut: () => {},
  deregisterShortcut: () => {},
  activeShortcut: null,
});
