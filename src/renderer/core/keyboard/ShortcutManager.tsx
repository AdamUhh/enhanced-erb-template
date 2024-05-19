import { capitalizeWordsInString } from 'core/utils/capitalizeWords';
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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // If the user is modifying a keybind, do nothing
      if (isModifyingKeybinds) return;

      // Parse the keyboard event into a shortcut string
      const shortcut = parseShortcut(event);
      if (!shortcut) return;

      // Add the parsed shortcut to the active chord reference
      activeChordRef.current.push(shortcut);

      // Create a string representation of the current chord sequence
      const currentChord = activeChordRef.current.join(', ');

      const handleMatchingHandlers = () => {
        const registrations = registry.getRegistrations(activeChordRef.current);

        // Check if the registration was registered as an event subscriber
        registrations.forEach((regs) => {
          if (regs.isEventSubscriber) {
            // Dispatch a custom event if the handler is an event subscriber
            const customEvent = new CustomEvent(`${regs.alias}-event`);
            document.dispatchEvent(customEvent);
          } else {
            // Otherwise, call the handler function directly
            regs.handler();
          }

          if (registrations.length > 0)
            // Clear the active chord reference after handling
            activeChordRef.current = [];
        });
      };
      // ? check if activeChord has multiple aliases for first keybind chord.
      // ? if there are many possible keybinds, wait for user to finish second chord
      if (activeChordRef.current.length === 1) {
        // Check for duplicate chords starting with the current key
        const duplicateChords = registry.getDuplicateFirstChords(
          activeChordRef.current,
        );

        if (duplicateChords.length > 1) {
          // If there are multiple chords starting with this key, wait for the next key
          setAwaitingChord({
            success: true,
            chord: capitalizeWordsInString(activeChordRef.current[0]),
          });
          return;
        }

        // If no duplicates, handle the current chord immediately
        setAwaitingChord({ success: false, chord: null });
        handleMatchingHandlers();
      } else {
        // If more than one key is pressed in the current chord
        const matchingHandlers = registry.getRegistrations(
          activeChordRef.current,
        );

        // If we were awaiting a second chord, was given it, but no handlers match,
        // update awaiting chord state to show unknown command/chord sequence
        if (
          awaitingChord.chord &&
          matchingHandlers.length === 0 &&
          activeChordRef.current.length === 2
        ) {
          setAwaitingChord({
            success: false,
            chord: capitalizeWordsInString(currentChord),
          });
          return;
        }

        // Otherwise, clear the awaiting chord state and handle the matching handlers
        setAwaitingChord({ success: false, chord: null });
        handleMatchingHandlers();

        if (activeChordRef.current.length === 2) activeChordRef.current = [];
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
