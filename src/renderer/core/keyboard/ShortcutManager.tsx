import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  const [isModifyingKeybinds, setIsModifyingKeybinds] = useState(false);
  const [shortcutUpdater, setShortcutUpdater] = useState(0);

  // Handle keydown event
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isModifyingKeybinds) return;
      // Parse the shortcut from the keyboard event
      const shortcut = parseShortcut(event);
      if (shortcut) {
        // Update the ref value
        activeChordRef.current = [...activeChordRef.current, shortcut];

        // Get the handlers for the shortcut and execute them
        const matchingHandlers = registry.getHandlers(activeChordRef.current);

        matchingHandlers.forEach((regs) => {
          if (regs.isEventSubscriber) {
            const customEvent = new CustomEvent(`${regs.alias}-event`);
            document.dispatchEvent(customEvent);
          } else {
            regs.handler();
          }
        });
      }
    },
    [isModifyingKeybinds, registry],
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
      isEventSubscriber?: boolean,
    ) => {
      registry.registerShortcut(alias, handler, when, isEventSubscriber);
    },
    [registry],
  );

  // Deregister a shortcut
  const unregisterShortcut = useCallback(
    (alias: ShortcutKeybindingsAliases) => {
      registry.unregisterShortcut(alias);
    },
    [registry],
  );

  const subscribe = useCallback(
    (alias: ShortcutKeybindingsAliases, handler: () => void) => {
      document.addEventListener(`${alias}-event`, handler);
    },
    [],
  );

  const unsubscribe = useCallback(
    (alias: ShortcutKeybindingsAliases, handler: () => void) => {
      document.removeEventListener(`${alias}-event`, handler);
    },
    [],
  );

  const getShortcuts = useCallback(
    () => registry.getShortcuts(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [registry, shortcutUpdater],
  );

  const runShortcut = useCallback(
    (alias: ShortcutKeybindingsAliases) => {
      registry.runShortcut(alias);
    },
    [registry],
  );

  const isModifyingShortcut = useCallback(
    (isModifying: boolean) => setIsModifyingKeybinds(isModifying),
    [],
  );

  const changeShortcut = useCallback(
    (alias: ShortcutKeybindingsAliases, newKeybind: string) => {
      registry.changeShortcut(alias, newKeybind);
      // ? forcibly update useCallback of getShortcuts
      // ? to update all components using it (for latest shortcut keybinds)
      setShortcutUpdater((prevValue) => prevValue + 1);
    },
    [registry],
  );

  // Create the ShortcutContext value
  const shortcutContextValue = useMemo(
    () => ({
      registerShortcut,
      unregisterShortcut,
      runShortcut,
      getShortcuts,
      subscribe,
      unsubscribe,
      changeShortcut,
      isModifyingShortcut,
    }),
    [
      registerShortcut,
      unregisterShortcut,
      runShortcut,
      getShortcuts,
      subscribe,
      unsubscribe,
      changeShortcut,
      isModifyingShortcut,
    ],
  );

  return (
    <ShortcutContext.Provider value={shortcutContextValue}>
      {children}
    </ShortcutContext.Provider>
  );
}
