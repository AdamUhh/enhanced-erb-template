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
  const [awaitingChord, setAwaitingChord] = useState<{
    success: boolean;
    chord: string | null;
  }>({ success: true, chord: null });
  // Handle keydown event
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isModifyingKeybinds) return;
      // Parse the shortcut from the keyboard event
      const shortcut = parseShortcut(event);
      if (shortcut) {
        // Update the ref value
        activeChordRef.current = [...activeChordRef.current, shortcut];

        // ? check if activeChord has multiple aliases for first keybind chord.
        // ? if there are many possible keybinds, prevent setTimeout execution,
        // ? and wait for user to finish second chord
        if (activeChordRef.current.length === 1) {
          const duplicateChords = registry.getDuplicateFirstChords(
            activeChordRef.current,
          );

          if (duplicateChords.length > 1) {
            // ? show alert for waiting for chord
            setAwaitingChord({
              success: true,
              chord: activeChordRef.current[0],
            });
          } else {
            setAwaitingChord({
              success: false,
              chord: null,
            });

            const matchingHandlers = registry.getHandlers(
              activeChordRef.current,
            );

            matchingHandlers.forEach((regs) => {
              if (regs.isEventSubscriber) {
                const customEvent = new CustomEvent(`${regs.alias}-event`);
                document.dispatchEvent(customEvent);
              } else {
                regs.handler();
              }
            });

            activeChordRef.current = [];
          }
        } else {
          // Get the handlers for the shortcut and execute them
          const matchingHandlers = registry.getHandlers(activeChordRef.current);

          if (
            awaitingChord.chord &&
            activeChordRef.current.length === 2 &&
            matchingHandlers.length === 0
          )
            setAwaitingChord({
              success: false,
              chord: activeChordRef.current.join(', '),
            });
          else {
            setAwaitingChord({
              success: false,
              chord: null,
            });

            matchingHandlers.forEach((regs) => {
              if (regs.isEventSubscriber) {
                const customEvent = new CustomEvent(`${regs.alias}-event`);
                document.dispatchEvent(customEvent);
              } else {
                regs.handler();
              }
            });
          }

          activeChordRef.current = [];
        }
      }
    },
    [awaitingChord.chord, isModifyingKeybinds, registry],
  );

  // Add and remove event listeners on mount and unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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

  const resetShortcuts = useCallback(() => {
    registry.resetShortcuts();
    setShortcutUpdater((prevValue) => prevValue + 1);
  }, [registry]);

  const waitingForChord = useMemo(() => awaitingChord, [awaitingChord]);

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
      waitingForChord,
      resetShortcuts,
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
      waitingForChord,
      resetShortcuts,
    ],
  );

  return (
    <ShortcutContext.Provider value={shortcutContextValue}>
      {children}
    </ShortcutContext.Provider>
  );
}
