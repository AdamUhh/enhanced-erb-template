import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type KeyAlias = string;

interface Shortcut {
  keys: KeyAlias;
  callback: () => void;
  when?: () => boolean;
}

interface ShortcutContextProps {
  registerShortcut: (shortcut: Shortcut) => void;
  unregisterShortcut: (keys: KeyAlias) => void;
}

const ShortcutContext = createContext<ShortcutContextProps | undefined>(
  undefined,
);

export const useShortcutContext = () => {
  const context = useContext(ShortcutContext);
  if (!context) {
    throw new Error(
      'useShortcutContext must be used within a ShortcutProvider',
    );
  }
  return context;
};

const isEqual = (a: KeyAlias, b: KeyAlias) => {
  console.log(JSON.stringify(a).toLowerCase());
  console.log(JSON.stringify(b).toLowerCase());
  return JSON.stringify(a).toLowerCase() === JSON.stringify(b).toLowerCase();
};

type PubSubCallback = () => void;

let activeChord: KeyAlias[] = [];
const subscribers: PubSubCallback[] = [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const subscribe = (callback: PubSubCallback) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };
};

const publish = () => {
  subscribers.forEach((callback) => callback());
};

function normalizeKey(key: string): string {
  const lowerKey = key.toLowerCase();
  switch (lowerKey) {
    case 'control':
    case 'shift':
    case 'alt':
    case 'meta':
      return '';
    default:
      // Allow function keys (f1-f12) to pass through
      if (/^f\d{1,2}$/i.test(key)) {
        return lowerKey; // Normalize function keys to lowercase (f1, f2, etc.)
      }
      return lowerKey;
  }
}

const getKeyAlias = (
  event: KeyboardEvent,
  _activeChord: string[],
): KeyAlias[] => {
  const keys: KeyAlias[] = [];
  if (event.ctrlKey && _activeChord[_activeChord.length - 1] !== 'ctrl')
    keys.push('ctrl');
  if (event.shiftKey) keys.push('shift');
  if (event.altKey) keys.push('alt');
  const normalizedKey = normalizeKey(event.key);

  if (!normalizedKey) return keys;

  keys.push(normalizedKey);

  return keys;
};

export function ShortcutProvider({ children }: { children: ReactNode }) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const registerShortcut = useCallback((shortcut: Shortcut) => {
    setShortcuts((prevShortcuts) => {
      const updatedShortcuts = [...prevShortcuts, shortcut];
      publish();
      return updatedShortcuts;
    });
  }, []);

  const unregisterShortcut = useCallback((keys: KeyAlias) => {
    setShortcuts((prevShortcuts) => {
      const updatedShortcuts = prevShortcuts.filter(
        (sc) => !isEqual(sc.keys, keys),
      );
      publish();
      return updatedShortcuts;
    });
  }, []);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const keyAlias = getKeyAlias(event, activeChord);
      activeChord.push(...keyAlias);
      shortcuts.forEach((shortcut) => {
        if (
          isEqual(shortcut.keys, activeChord.join('+')) &&
          (!shortcut.when || shortcut.when())
        ) {
          event.preventDefault();
          shortcut.callback();
          activeChord = []; // Reset the chord after execution
        }
      });

      // Reset the active chord if no match is found
      setTimeout(() => {
        activeChord = [];
      }, 300);
    },
    [shortcuts],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const contextValue = useMemo(
    () => ({ registerShortcut, unregisterShortcut }),
    [registerShortcut, unregisterShortcut],
  );

  return (
    <ShortcutContext.Provider value={contextValue}>
      {children}
    </ShortcutContext.Provider>
  );
}

export const useRegisterShortcut = (shortcut: Shortcut) => {
  const { registerShortcut, unregisterShortcut } = useShortcutContext();

  useEffect(() => {
    registerShortcut(shortcut);
    return () => unregisterShortcut(shortcut.keys);
  }, [registerShortcut, unregisterShortcut, shortcut]);
};

const defaultKeyBindings: { [key: string]: KeyAlias } = {
  save: 'Ctrl+S+Ctrl+B',
  open: 'Ctrl+O',
  // Add more default keybindings as needed
};

const userKeyBindings: { [key: string]: KeyAlias } = {
  // User overrides can be stored here
};

export const getEffectiveKeyBindings = (): { [key: string]: KeyAlias } => {
  return { ...defaultKeyBindings, ...userKeyBindings };
};
