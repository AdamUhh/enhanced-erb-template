import KeyboardRegister from 'components/ShortcutSettings/KeyboardRegister';
import ShortcutManager from 'core/keyboard/shortcutManager';
import { ReactNode, createContext, useContext, useMemo } from 'react';

interface ShortcutContextType {
  shortcutManager: ShortcutManager;
}

const ShortcutContext = createContext<ShortcutContextType | undefined>(
  undefined,
);

export const useShortcutManager = () => {
  const context = useContext(ShortcutContext);
  if (!context) {
    throw new Error(
      'useShortcutManager must be used within a ShortcutProvider',
    );
  }
  return context;
};

export function ShortcutProvider({ children }: { children: ReactNode }) {
  const shortcutManager = useMemo(() => new ShortcutManager(), []);

  const shortcutContextValue = useMemo(
    () => ({ shortcutManager }),
    [shortcutManager],
  );

  return (
    <ShortcutContext.Provider value={shortcutContextValue}>
      <KeyboardRegister shortcutManager={shortcutManager} />
      {children}
    </ShortcutContext.Provider>
  );
}
