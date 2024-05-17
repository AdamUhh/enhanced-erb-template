import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ShortcutContext } from './ShortcutContext';
import { parseShortcut } from './ShortcutParser';
import { ShortcutRegistry } from './ShortcutRegistry';
import { ShortcutKeybindingsAliases } from './defaults';

interface ShortcutManagerProps {
  children: React.ReactNode;
}

export default function ShortcutManager({ children }: ShortcutManagerProps) {
  // Create instances of ShortcutRegistry and ShortcutParser
  const registry = useRef(new ShortcutRegistry()).current;
  const activeChordRef = useRef<string[]>([]);

  // Handle keydown event
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Parse the shortcut from the keyboard event
      const shortcut = parseShortcut(event);
      if (shortcut) {
        // Update the ref value
        activeChordRef.current = [...activeChordRef.current, shortcut];

        // Get the handlers for the shortcut and execute them
        const matchingHandlers = registry.getHandlers(activeChordRef.current);
        matchingHandlers.forEach((handler) => handler());
      }
    },
    [registry],
  );
  // Handle keyup event
  const handleKeyUp = useCallback(() => {
    // Reset the active shortcut
    setTimeout(() => {
      activeChordRef.current = [];
    }, 300);
  }, []);

  // Add and remove event listeners on mount and unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Register a new shortcut
  const registerShortcut = useCallback(
    (
      alias: ShortcutKeybindingsAliases,
      handler: () => void,
      when?: () => boolean,
    ) => {
      registry.registerShortcut(alias, handler, when);
    },
    [registry],
  );

  // Deregister a shortcut
  const deregisterShortcut = useCallback(
    (alias: ShortcutKeybindingsAliases) => {
      registry.deregisterShortcut(alias);
    },
    [registry],
  );

  const getShortcuts = useCallback(() => registry.getShortcuts(), [registry]);

  const runShortcut = useCallback(
    (alias: ShortcutKeybindingsAliases) => {
      registry.runShortcut(alias);
    },
    [registry],
  );

  // Create the ShortcutContext value
  const shortcutContextValue = useMemo(
    () => ({
      registerShortcut,
      deregisterShortcut,
      runShortcut,
      getShortcuts,
    }),
    [registerShortcut, deregisterShortcut, runShortcut, getShortcuts],
  );

  // Subscribe to shortcut events
  // const shortcutSubscription = useShortcutSubscription();

  return (
    <ShortcutContext.Provider value={shortcutContextValue}>
      {children}
    </ShortcutContext.Provider>
  );
}
