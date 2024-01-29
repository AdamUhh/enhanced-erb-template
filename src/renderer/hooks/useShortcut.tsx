import { useEffect } from 'react';
import { ShortcutKeybindingsAliases } from 'shared/types';
import { useShortcutManager } from '../context/shortcutContext';

interface ShortcutRegistration {
  id: ShortcutKeybindingsAliases;
  action: (...args: any[]) => any;
}

const useShortcutRegisterEffect = (
  ...shortcutRegistrations: ShortcutRegistration[]
) => {
  const { shortcutManager } = useShortcutManager();

  useEffect(() => {
    // Register shortcuts
    shortcutRegistrations.forEach(({ id, action }) => {
      shortcutManager.registerShortcut(id, action);
    });

    // Cleanup function
    return () => {
      // Unregister shortcuts
      shortcutRegistrations.forEach(({ id }) => {
        shortcutManager.unregisterShortcut(id);
      });
    };
  }, [shortcutManager, shortcutRegistrations]);
};

export { useShortcutRegisterEffect };