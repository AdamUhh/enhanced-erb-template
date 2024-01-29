/* eslint-disable react/function-component-definition */
// ShortcutContext.tsx

import KeyboardRegister from 'components/KeyboardRegister';
import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import ShortcutManager from '../../shared/keyboard/shortcutManager';

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

export const ShortcutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
};
