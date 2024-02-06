import { useEffect } from 'react';
import { ShortcutKeybindingsAliases } from 'shared/keyboard/keybindingAliases';
import { GenericFunction } from 'shared/types/generic';
import { useShortcutManager } from '../context/shortcutContext';

interface ShortcutRegistration {
  id: ShortcutKeybindingsAliases;
  action: GenericFunction;
}

/**
 * A hook to register shortcuts for components.
 * @param shortcutRegistrations - An array of shortcut registrations.
 */
export const useShortcutRegisterEffect = (
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
