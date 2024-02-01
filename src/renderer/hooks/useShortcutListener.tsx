import { useEffect, useState } from 'react';
import { GenericVoidFunction, Shortcut } from 'shared/types';
import { useShortcutManager } from '../context/shortcutContext';

/**
 * @returns Latest shortcuts and global shortcut context
 */
const useShortcutListener = () => {
  const { shortcutManager } = useShortcutManager();
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    const handleShortcutChange: GenericVoidFunction = () => {
      const sc = shortcutManager.getShortcuts;
      setShortcuts(sc);
    };

    // Subscribe to shortcut changes
    const listenerId = shortcutManager.addListener(handleShortcutChange);

    // Unsubscribe when the component unmounts or when shortcutManager changes
    return () => {
      shortcutManager.removeListener(listenerId);
    };
  }, [shortcutManager]);

  return { shortcuts, shortcutManager };
};

export { useShortcutListener };
