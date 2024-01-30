import { useEffect, useState } from 'react';
import { Shortcut, ShortcutEventListener } from 'shared/types';
import { useShortcutManager } from '../context/shortcutContext';

const useShortcutListener = () => {
  const { shortcutManager } = useShortcutManager();
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    const handleShortcutChange: ShortcutEventListener = () => {
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
