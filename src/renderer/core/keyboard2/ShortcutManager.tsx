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
import { useShortcutSubscription } from './useShortcutSubscription';

interface ShortcutManagerProps {
  children: React.ReactNode;
}

export default function ShortcutManager({ children }: ShortcutManagerProps) {
  // Create instances of ShortcutRegistry and ShortcutParser
  const registry = useRef(new ShortcutRegistry()).current;
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);

  // Handle keydown event
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Parse the shortcut from the keyboard event
      const shortcut = parseShortcut(event);

      if (shortcut) {
        // Update the active shortcut
        setActiveShortcut(shortcut);
        // Get the handlers for the shortcut and execute them
        const matchingHandlers = registry.getHandlers(shortcut);
        matchingHandlers.forEach((handler) => handler());
      }
    },
    [registry],
  );

  // Handle keyup event
  const handleKeyUp = useCallback(() => {
    // Reset the active shortcut
    setActiveShortcut(null);
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
    (alias: string, handler: () => void, when?: () => boolean) => {
      registry.registerShortcut(alias.toLowerCase(), handler, when);
    },
    [registry],
  );

  // Deregister a shortcut
  const deregisterShortcut = useCallback(
    (alias: string) => {
      registry.deregisterShortcut(alias);
    },
    [registry],
  );

  // Create the ShortcutContext value
  const shortcutContextValue = useMemo(
    () => ({
      registerShortcut,
      deregisterShortcut,
      activeShortcut,
    }),
    [activeShortcut, deregisterShortcut, registerShortcut],
  );

  // Subscribe to shortcut events
  const shortcutSubscription = useShortcutSubscription();

  return (
    <ShortcutContext.Provider value={shortcutContextValue}>
      {shortcutSubscription}
      {children}
    </ShortcutContext.Provider>
  );
}
